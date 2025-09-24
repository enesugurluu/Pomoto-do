# Environment & Firebase Project Setup
1. Create a Firebase project for production and link separate dev/staging projects via `.firebaserc`; enable Firestore (native mode), Authentication, Cloud Functions, Cloud Storage, and Cloud Scheduler.
2. Configure the Firebase CLI and Emulator Suite; document `firebase.json` targets so local development uses emulators for Auth, Firestore, Functions, and Storage.
3. Install `firebase-admin` and modular web SDKs in the Next.js app; add environment variables for project IDs, API keys, and service-account credentials using Vercel/Next runtime secrets.
4. Build a shared config module (`lib/firebase/server.ts` and `lib/firebase/client.ts`) with lazy initialization and environment selection logic.
5. Document deployment commands (`firebase deploy --only functions,firestore:rules,storage`) and add them to the project README for reproducibility.
**Cost-saving:** Default developers to the Emulator Suite to avoid chargeable reads/writes during development and isolate staging data from production.

# Authentication
1. Decide on initial sign-in methods (email magic link + Google OAuth) and configure them in Firebase Auth, including branded email templates and multi-factor policy.
2. Implement server-side session verification: use Next.js middleware to validate Firebase ID tokens via `firebase-admin`, attach the user context to `Request` objects, and redirect anonymous visitors to `/login`.
3. Create Auth-aware hooks (`useCurrentUser`, `useRequireAuth`) that read from Firebase Auth on the client but fall back to server-rendered session data for SEO-sensitive routes.
4. Define custom claims (`tier`, `devMode`, `teamId`) and build an Admin Cloud Function callable only by internal staff to update those claims when subscription or team membership changes.
5. Implement account deletion and data-export flows by invoking Cloud Functions that scrub Firestore/Storage artifacts before deleting the Auth user.
**Cost-saving:** Use passwordless email links first to avoid third-party auth costs and rely on custom claims instead of a separate entitlements service.

# Firestore Data Model & Access Layer
1. Model collections:
   - `users/{userId}`: profile, settings defaults, current tier, notification preferences.
   - `users/{userId}/tasks/{taskId}`: task metadata (title, status, priority, tags, dueDate, pomodoroEstimate, attachmentRefs).
   - `users/{userId}/projects/{projectId}`: project attributes, progress metrics, default task filters.
   - `users/{userId}/pomodoroSessions/{sessionId}`: start/end timestamps, mode, linked taskId, interruptions.
   - `users/{userId}/dailySummaries/{yyyyMMdd}`: aggregated stats (completedPomodoros, tasksCompleted, streak data).
   - `global/leaderboards/{period}`: precomputed rankings by completed sessions (Pro feature).
   - `billing/customers/{stripeCustomerId}`: mirror Stripe state (plan, trialEnd, status).
2. Write Firestore security rules enforcing user isolation, validating document schemas with `request.resource.data.keys()` guards, and restricting Pro-only docs to users with `tier == 'pro'`.
3. Create typed data-access services (`lib/repositories/*.ts`) that encapsulate Firestore reads/writes using batched writes and cursors for pagination.
4. Define composite indexes for the planned queries (e.g., tasks ordered by dueDate+status, sessions filtered by date range, projects by priority) and commit `firestore.indexes.json`.
5. Implement server actions / API routes that wrap repository methods for creating, updating, and deleting tasks, projects, sessions, and summaries with optimistic concurrency checks.
**Cost-saving:** Store per-user data in subcollections to keep queries scoped, reuse aggregated `dailySummaries` for dashboard views instead of scanning raw session logs, and avoid real-time listeners on large collections by using on-demand fetches.

# Cloud Functions & Backend Logic
1. Deploy HTTPS Cloud Functions for CRUD APIs needed by the Next.js client where direct Firestore access is insufficient (e.g., Stripe webhooks, signed Storage URLs, admin utilities).
2. Add Firestore triggers:
   - `onWrite` for `tasks` to recompute project progress (completed vs total, Pomodoros spent) and update related project docs atomically.
   - `onCreate` for `pomodoroSessions` to increment counters in `dailySummaries` and maintain rolling streak metadata.
3. Schedule a daily Cloud Function (via Cloud Scheduler + Pub/Sub) to backfill analytics: compute week-to-date stats, leaderboard snapshots, and consolidate session logs older than 30 days into summaries.
4. Implement a lightweight rate-limiting layer using Firestore counters or Redis-compatible Upstash (free tier) to prevent abuse of focus session logging.
5. Provide admin-only callable functions to toggle developer mode, seed demo data, and run maintenance (e.g., orphaned file cleanup).
**Cost-saving:** Prefer event-driven triggers and scheduled consolidations so the dashboard can read from small summary docs rather than scanning raw data, minimizing Firestore read charges.

# Storage & Media Handling
1. Enable Firebase Storage and create folders scoped per user (`/users/{uid}/tasks/{taskId}/attachments`); enforce a 5 MB limit per file through upload rules.
2. Expose signed upload URLs via an HTTPS Cloud Function so the Next.js client avoids bundling admin credentials.
3. Add a background Cloud Function that listens for new image uploads, generates 800px and 200px variants, and replaces the original if the resize is smaller to save storage.
4. Build a scheduled cleanup job that deletes Storage objects whose task references no longer exist (compare Firestore attachmentRefs against bucket contents).
5. Update the Next.js app to reference Storage download tokens stored alongside task records.
**Cost-saving:** Resize images immediately and enforce extension/size validation in rules to reduce Storage egress and retention costs.

# Analytics & Reporting
1. Instrument client events (session start/finish, task create/complete, upgrade modal views) and write them to a `users/{uid}/events/{eventId}` collection via buffered API calls.
2. Extend the daily summarizer to roll up key PRD metrics (activation, Pomodoros per day, completion ratios) into a `analytics/daily/{yyyyMMdd}` document per user and into aggregated Pro-tier leaderboards.
3. Expose a read-optimized endpoint that returns dashboard metrics by combining cached summaries, streak data, and last-session timestamps.
4. Integrate a low-cost product analytics stack (PostHog Cloud free tier or self-hosted) for cohort analysis; send events from Cloud Functions to avoid duplicating client instrumentation.
5. Add error tracking with Firebase Crashlytics for web (or Sentry free tier) by logging Cloud Function failures and surfacing alerts in Slack/Email.
**Cost-saving:** Use aggregated analytics docs for in-app dashboards and leverage PostHog’s free tier instead of building a bespoke analytics warehouse.

# Monetization & Entitlements
1. Model Stripe products/plans for Basic, Pro, and Premium; create corresponding Prices with trial metadata.
2. Build a checkout Cloud Function that creates Stripe Checkout sessions and returns the URL to the Next.js frontend, persisting the pending checkout ID in Firestore.
3. Implement a secure Stripe webhook handler (HTTPS Cloud Function) that validates signatures and updates `billing/customers` + Auth custom claims on subscription events (created, renewed, canceled, trial-ending).
4. Add billing status checks to server actions so Pro-only API calls validate `tier === 'pro'` or `tier === 'premium'` before executing.
5. Provide automated emails (via Resend) for trial reminders and failed payment notices by triggering Cloud Functions on Stripe events.
**Cost-saving:** Stripe only charges on successful payments; batching entitlement writes through triggers prevents redundant reads and keeps Firestore operations low.

# Notifications & Reminders
1. Collect user notification preferences (email, browser push, focus nudges) in Firestore settings and expose them through the settings API.
2. Configure Firebase Cloud Messaging for web push notifications and register service workers in the Next.js app for break/start reminders.
3. Schedule Cloud Functions that, based on upcoming tasks or planned focus blocks, enqueue reminders (email via Resend free tier or push via FCM) respecting quiet hours.
4. Implement digest emails summarizing daily progress using Cloud Scheduler to trigger a single batched function per region.
5. Log notification deliveries and failures in Firestore for auditing and to support opt-out flows.
**Cost-saving:** Start with email digests using Resend’s generous free tier and only enable push notifications for opted-in users to avoid unnecessary messaging costs.

# Deployment, CI/CD & Operations
1. Create a GitHub Actions workflow that runs unit tests, lints, and deploys Firebase Rules/Functions to staging on pull requests and to production on tagged releases.
2. Configure `firebase deploy --only functions` to use region `us-central1` (cheapest) and memory/timeouts tuned to each function’s workload.
3. Integrate automated schema validation by deploying Firestore rules in dry-run mode before production pushes.
4. Enable Cloud Monitoring dashboards and alerts for function error rates, latency, and Firestore usage, sending notifications to Slack/Email.
5. Document runbooks covering rollback procedures, quota exhaustion responses, and data restoration from Firestore backups.
**Cost-saving:** Use staged deployments and regional settings to keep Cloud Functions within the free tier for low traffic; monitor quotas to tune indexes before they grow expensive.

# Security & Compliance
1. Implement App Check (reCAPTCHA Enterprise or DeviceCheck) for the web app to ensure only trusted clients access Firebase resources.
2. Enforce strict Firestore/Storage rules with schema validation, ownership checks, and limit read operations per request using `getAfter()` patterns.
3. Build data export and deletion Cloud Functions to satisfy GDPR/CCPA requests, packaging user data from Firestore, Storage, and Stripe.
4. Configure Cloud Audit Logs for Admin SDK usage and review them monthly for anomalous access.
5. Maintain a secrets rotation schedule by storing credentials in Firebase Functions’ environment config (`firebase functions:config:set`) and documenting rotation steps.
**Cost-saving:** Leveraging Firebase’s built-in security controls avoids the need for third-party WAF or IAM tooling in early stages.

# Cost Monitoring & Governance
1. Set Firebase budget alerts (Firestore, Functions, Storage, Auth) with email + Slack notifications before hitting free tier limits.
2. Automate a weekly Cloud Function that snapshots usage metrics (read/write counts, egress) into `ops/costReports/{week}` for trend analysis in the dashboard.
3. Review composite indexes quarterly and prune unused ones to keep storage and write amplification low.
4. Implement feature flags so experiments (e.g., heatmaps) can be disabled if they spike read/write volume unexpectedly.
5. Periodically run Firestore export to Cloud Storage (monthly) and delete backups older than 90 days to control storage spend.
**Cost-saving:** Continuous monitoring plus pruning unused indexes and backups keeps Firebase comfortably within the always-free tier during MVP.
