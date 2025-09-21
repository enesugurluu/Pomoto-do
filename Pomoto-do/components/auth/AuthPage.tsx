"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CalendarCheck, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { BubbleBackground } from "@/components/backgrounds/BubbleBackground"
import { BorderBeam } from "@/components/ui/border-beam"

const loginHighlights = [
  "Resume your last Pomodoro session instantly across devices.",
  "Review streaks, goals, and progress without breaking focus.",
  "Jump between workspaces and developer mode in seconds.",
]

const signupHighlights = [
  "Plan projects, tasks, and estimates within one dashboard.",
  "Preview Pro analytics, premium themes, and collaboration beta.",
  "Capture new tasks quickly with autosave and keyboard shortcuts.",
]

export interface AuthPageProps {
  mode: "login" | "signup"
}

export function AuthPage({ mode }: AuthPageProps) {
  const isLogin = mode === "login"
  const title = isLogin ? "Welcome back" : "Create your workspace"
  const description = isLogin
    ? "Pick up your next focus block and stay aligned with your Pomodoro routine."
    : "Set up your productivity HQ and unlock a guided preview of Pro features."
  const highlights = isLogin ? loginHighlights : signupHighlights
  const ctaLabel = isLogin ? "Log in" : "Create account"
  const switchHref = isLogin ? "/signup" : "/login"
  const switchText = isLogin ? "Need an account? Start for free." : "Already using PomoTo-do? Log in."

  return (
    <BubbleBackground
      interactive
      className="flex min-h-screen flex-col overflow-hidden"
      colors={{
        first: "21,128,61",
        second: "132,204,22",
        third: "56,189,248",
        fourth: "14,165,233",
        fifth: "34,197,94",
        sixth: "125,211,252",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)] dark:bg-[radial-gradient(circle_at_bottom,_rgba(14,165,233,0.28),_transparent_60%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-[linear-gradient(120deg,rgba(34,197,94,0.12),rgba(14,165,233,0.12),rgba(168,85,247,0.1))] opacity-80 animate-gradient-slow"
          style={{ backgroundSize: "180% 180%" }}
        />
        <div className="absolute left-[-18%] top-[-12%] h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-emerald-400/35 via-sky-400/28 to-transparent blur-3xl mix-blend-screen animate-drift-slow dark:from-emerald-500/28 dark:via-cyan-500/24" />
        <div className="absolute right-[-12%] top-[18%] h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-sky-400/28 via-purple-400/22 to-transparent blur-3xl mix-blend-screen animate-float-medium dark:from-sky-500/24 dark:via-indigo-500/20" />
        <div className="absolute left-1/2 bottom-[-14%] h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-emerald-300/25 via-sky-300/20 to-fuchsia-300/12 blur-[160px] mix-blend-screen animate-pulse-soft dark:from-emerald-400/20 dark:via-sky-500/18 dark:to-purple-500/15" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <Link href="/landing" className="flex items-center space-x-2">
          <Image
            src="/app-icon-48.png"
            alt="PomoTo-do icon"
            width={44}
            height={44}
            className="h-11 w-11 rounded-xl shadow-lg shadow-primary/20"
            priority
          />
          <span className="text-lg font-semibold text-foreground">PomoTo-do</span>
        </Link>
        <Link href="/" className="text-sm font-medium text-primary hover:underline">
          Back to dashboard preview
        </Link>
      </header>

      <div className="relative z-10 flex flex-1 flex-col justify-center gap-12 px-6 pb-12 md:flex-row md:px-12 md:pb-16">
        <aside className="flex flex-1 flex-col justify-center gap-8">
          <div className="max-w-lg space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary">
              <Sparkles className="h-3 w-3" />
              Deep work companion
            </span>
            <h1 className="text-balance text-4xl font-black tracking-tight text-foreground drop-shadow-sm md:text-5xl">
              {isLogin ? "Focus without friction" : "Design your ideal focus ritual"}
            </h1>
            <p className="text-pretty text-base text-muted-foreground md:text-lg">
              {isLogin
                ? "Jump back into planned tasks, track streaks, and stay connected to the bigger goals behind your Pomodoros."
                : "Plan tasks, run Pomodoros, and measure progress without juggling multiple tools."}
            </p>
          </div>

          <div className="grid max-w-md grid-cols-1 gap-4">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 rounded-xl border border-primary/15 bg-card/60 p-4 shadow-sm shadow-primary/10 backdrop-blur"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">{highlight}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <CalendarCheck className="h-4 w-4" />
            <span>Pro trials unlock premium analytics, the theme studio, and collaboration previews.</span>
          </div>
        </aside>

        <section className="flex w-full max-w-md flex-col justify-center">
          <Card className="relative overflow-hidden border border-border/50 bg-background/85 shadow-2xl shadow-primary/10 backdrop-blur-xl">
            <CardHeader className="space-y-3">
              <CardTitle className="text-2xl font-semibold text-foreground">{title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between bg-background/40">
                  <span className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Continue with Google (coming soon)
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <div className="relative py-4">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background/90 px-3 text-xs uppercase tracking-wide text-muted-foreground">
                    or continue with email
                  </span>
                </div>
              </div>

              <form
                className="space-y-5"
                onSubmit={(event) => {
                  event.preventDefault()
                }}
              >
                {!isLogin ? (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" type="text" placeholder="Alex Parker" required />
                  </div>
                ) : null}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="********"
                    required
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                </div>

                {isLogin ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                        Remember me
                      </Label>
                    </div>
                    <Link href="#" className="text-sm font-medium text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                      I agree to the <Link href="#" className="text-primary hover:underline">Terms</Link> and
                      <span> Privacy Policy.</span>
                    </Label>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  {ctaLabel}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                <Link href={switchHref} className="font-medium text-primary hover:underline">
                  {switchText}
                </Link>
              </p>
            </CardContent>
            <BorderBeam size={180} duration={7} delay={2.4} borderWidth={2} className="opacity-80 mix-blend-screen" />
          </Card>
        </section>
      </div>
    </BubbleBackground>
  )
}
