# Firebase Project Setup

## Project Creation
1. Sign in to the [Firebase console](https://console.firebase.google.com/) and create three projects for the Pomoto-do stack (production, staging, development). Use predictable IDs (for example `pomotodo-prod`, `pomotodo-staging`, `pomotodo-dev`) so the CLI mapping matches `.firebaserc`.
2. During creation, disable Google Analytics unless you plan to wire it through later; it can be linked afterward without cost.
3. After creating each project, open the project settings page and capture the **Project ID** and **Web API key** for later use in the Next.js environment variables.

## CLI Linking
1. Install the Firebase CLI (`npm install -g firebase-tools`) and authenticate with the team Google account using `firebase login`.
2. From the repository root, link the local workspace to each Firebase project:
   ```bash
   firebase use --add
   ```
   Choose the matching project IDs for the `production`, `staging`, and `development` aliases so they align with `.firebaserc`.
3. Confirm the active project with `firebase use` before running deploy commands.

## Service Enablement
1. Enable **Firestore** in native mode for each project via the console (Build → Firestore Database → Create database → Start in production mode).
2. Enable **Authentication** and configure the planned providers (passwordless email link, Google OAuth) under Build → Authentication.
3. Enable **Cloud Functions** (Build → Functions) by acknowledging the billing prompt; staying within the Blaze plan free tier is typically cost-neutral at low volume.
4. Enable **Cloud Storage** (Build → Storage) to back task attachments and user avatars.
5. Enable **Cloud Scheduler** (Build → Scheduler) so scheduled maintenance and summary jobs can run once Cloud Functions are deployed.

## Next Steps
- Populate environment files (`.env.local`, Vercel project settings) with the project-specific API keys and Auth domain values.
- Use `firebase deploy --only firestore:rules,storage:rules` to push the placeholder security rules once you are ready to enforce access.
- Coordinate with the team before creating additional resources to keep the Firebase free-tier budget in check.
