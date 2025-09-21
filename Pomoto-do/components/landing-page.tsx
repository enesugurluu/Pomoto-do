"use client"

import { useEffect, useId, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { BlurText } from "@/components/ui/blur-text"
import { Marquee } from "@/components/ui/marquee"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Switch, SwitchIndicator, SwitchWrapper } from "@/components/ui/switch"
import { CardSpotlight } from "@/components/ui/card-spotlight"
import { GlowEffect } from "@/components/core/glow-effect"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/core/accordion"
import { SlidingNumber } from "@/components/core/sliding-number"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  ClipboardList,
  Clock,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  ChevronRight,
  Palette,
  Play,
  Repeat,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Timer,
  TrendingUp,
  X,
} from "lucide-react"

const navItems = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Personas", href: "#personas" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

const heroStats = [
  {
    label: "Activation rate",
    value: 70,
    suffix: "%",
    precision: 0,
    description: "New accounts start a focus session in week one.",
    icon: Target,
    targetDuration: 1200,
  },
  {
    label: "Daily focus blocks",
    value: 3.5,
    suffix: "",
    precision: 1,
    description: "Average Pomodoros per active day.",
    icon: Clock,
    targetDuration: 1400,
  },
  {
    label: "Week four retention",
    value: 40,
    suffix: "%",
    precision: 0,
    description: "Goal for healthy free tier habits.",
    icon: Repeat,
    targetDuration: 1200,
  },
]

const productJourney = [
  {
    title: "Plan the day",
    description: "Prioritize tasks, projects, and Pomodoro estimates in one view.",
    icon: ClipboardList,
  },
  {
    title: "Run focus sessions",
    description: "Launch an immersive timer with context, streaks, and quick settings.",
    icon: Timer,
  },
  {
    title: "Review progress",
    description: "Track stats, heatmaps, and goals to share wins with your team.",
    icon: BarChart3,
  },
]

const featureHighlights = [
  {
    title: "Strategic planning",
    description: "Group tasks, tag priorities, and roll up progress by project.",
    icon: CalendarCheck,
  },
  {
    title: "Focus rituals",
    description: "Adaptive work and break timers, focus mode, and celebratory streaks.",
    icon: Timer,
  },
  {
    title: "Productivity analytics",
    description: "Dashboards show streaks, peak hours, and export ready summaries.",
    icon: TrendingUp,
  },
  {
    title: "Personalization",
    description: "Theme studio, notification controls, and onboarding nudges.",
    icon: Palette,
  },
]

const featureTaglines = ["Plan smarter", "Stay in flow", "Measure impact", "Make it yours"]

const personas = [
  {
    name: "Alex (Freelance Creator)",
    insight: "Visual backlog keeps client deliverables organized and inspiring.",
  },
  {
    name: "Morgan (Engineering Power User)",
    insight: "Pomodoro estimates and filters surface blockers before stand up.",
  },
  {
    name: "Riley (Academic Achiever)",
    insight: "Guided focus sessions and streaks make study routines stick.",
  },
  {
    name: "Jordan (Team Lead beta)",
    insight: "Shared projects preview upcoming collaboration and reporting.",
  },
]

const pricing = [
  {
    name: "Basic",
    price: "Free",
    description: "Start a deep work habit with the essentials.",
    features: ["Core Pomodoro timer", "Personal task board", "Saved theme preferences"],
    cta: "Get started",
    href: "/signup",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$9",
    description: "Advanced focus and analytics for individuals.",
    features: [
      "Unlimited projects and filters",
      "Premium themes plus randomizer",
      "Streak, goal, and heatmap dashboards",
    ],
    cta: "Start Pro trial",
    href: "/signup",
    highlight: true,
  },
  {
    name: "Premium",
    price: "$19",
    description: "Collaboration layer for studios and teams.",
    features: [
      "Everything in Pro plus shared projects",
      "Team visibility dashboards",
      "Roadmap for calendar sync and SSO",
    ],
    cta: "Talk to us",
    href: "#contact",
    variant: "outline" as const,
  },
]

const faqs = [
  {
    question: "Which sign in options are available?",
    answer: "Email and password at launch, with Google sign in arriving during the Pro beta.",
  },
  {
    question: "Can I customize Pomodoro durations?",
    answer: "Yes. Adjust work and break lengths, auto start, and long break cadence from settings or quick controls.",
  },
  {
    question: "How do upgrades work for teams?",
    answer: "Start individually, then invite teammates into shared projects when Premium unlocks roles and visibility dashboards.",
  },
  {
    question: "Do you offer mobile apps?",
    answer: "Responsive web is available today. Native apps are planned once collaboration workflows ship.",
  },
]

const contactChannels = [
  { label: "Email", detail: "hello@pomoto.do", icon: Mail, href: "mailto:hello@pomoto.do" },
  { label: "Community", detail: "Join the focus crew on Discord", icon: MessageCircle, href: "#" },
]

function PersonaTile({ persona, index }: { persona: (typeof personas)[number]; index: number }) {
  const gradientVariants = [
    "from-primary/20 via-card/60 to-secondary/25",
    "from-secondary/25 via-card/60 to-primary/20",
    "from-primary/15 via-card/60 to-primary/5",
    "from-secondary/20 via-card/60 to-secondary/10",
  ]

  const gradient = gradientVariants[index % gradientVariants.length]
  const initials = persona.name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()

  return (
    <article className="relative flex w-[18rem] min-w-[18rem] max-w-[18rem] flex-col gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-6 shadow-lg shadow-primary/10 backdrop-blur">
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-80", gradient)} />
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-primary/20 bg-background/80">
            <AvatarFallback className="bg-primary/15 text-sm font-semibold uppercase text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-primary/80 dark:text-primary/60">
              Focus persona
            </span>
            <h3 className="text-lg font-semibold text-foreground">{persona.name}</h3>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{persona.insight}</p>
      </div>
    </article>
  )
}


function AnimatedStatValue({
  target,
  suffix = "",
  precision = 0,
  duration = 1200,
}: {
  target: number
  suffix?: string
  precision?: number
  duration?: number
}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = progress < 1 ? 1 - Math.pow(1 - progress, 3) : 1
      const nextValue = target * eased
      setValue(parseFloat(nextValue.toFixed(precision)))
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [target, precision, duration])

  return (
    <div className="inline-flex items-baseline gap-1">
      <SlidingNumber value={value} precision={precision} />
      {suffix}
    </div>
  )
}


function ThemeSwitcher() {
  const { resolvedTheme, setTheme, theme: activeTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const switchId = useId()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const prefersDark =
    activeTheme === "dark" || (activeTheme === "system" && resolvedTheme === "dark")

  const isLight = isMounted ? !prefersDark : true

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? "light" : "dark")
  }

  return (
    <SwitchWrapper>
      <Switch
        id={switchId}
        size="xl"
        checked={isLight}
        onCheckedChange={handleToggle}
        aria-label="Toggle theme"
      />
      <SwitchIndicator state="on">
        <Sun className="size-4 text-primary-foreground" />
      </SwitchIndicator>
      <SwitchIndicator state="off">
        <Moon className="size-4 text-muted-foreground" />
      </SwitchIndicator>
    </SwitchWrapper>
  )
}

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const currentYear = new Date().getFullYear()
  const { resolvedTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const isDarkTheme = isMounted ? resolvedTheme === "dark" : false

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <Link href="/landing" className="flex items-center space-x-2">
            <Image
              src="/app-icon-48.png"
              alt="PomoTo-do icon"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl"
              priority
            />
            <span className="text-xl font-semibold">PomoTo-do</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <ThemeSwitcher />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="hidden md:inline-flex">
                Start free trial
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen((previous) => !previous)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <div className="border-t bg-background/95 backdrop-blur md:hidden">
            <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
              <nav className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Separator />
              <div className="flex flex-col space-y-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">
                    Start free trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="pointer-events-none absolute inset-0">
            <div className="dot-grid-hero" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-secondary/20 opacity-80 mix-blend-screen" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
          <div className="relative mx-auto w-full max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mx-auto mb-6 w-fit text-xs uppercase tracking-wide">
                <Sparkles className="mr-1 inline-block h-3 w-3" />
                Unified deep work workspace
              </Badge>
              <h1 className="text-balance text-4xl font-black tracking-tight md:text-6xl">
                <BlurText
                  text="Plan, focus, and measure in one Pomodoro HQ"
                  className="justify-center"
                  delay={140}
                />
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
                PomoTo-do blends task planning, focus sessions, and upgrade ready analytics so builders, students, and teams can stay in flow.
              </p>
              <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:justify-center">
                <Link href="/signup" className="relative flex justify-center">
                  <GlowEffect
                    colors={isDarkTheme ? ["#6366f1", "#22d3ee", "#a855f7"] : ["#4f46e5", "#38bdf8", "#a855f7"]}
                    blur="soft"
                    duration={6}
                    scale={1.25}
                    className="rounded-full opacity-80"
                  />
                  <Button size="lg" className="group relative z-10 rounded-full px-8">
                    Start for free
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="#product">
                  <Button variant="outline" size="lg" className="bg-transparent">
                    <Play className="mr-2 h-4 w-4" />
                    See how it works
                  </Button>
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => {
                const Icon = stat.icon
                return (
                  <Card key={stat.label} className="border-none bg-card/60 backdrop-blur">
                    <CardHeader className="space-y-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                        <div className="text-2xl font-black">
                          <AnimatedStatValue
                            target={stat.value}
                            suffix={stat.suffix}
                            precision={stat.precision}
                            duration={stat.targetDuration}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{stat.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="product" className="bg-muted/30 py-20">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wide">
                Product journey
              </Badge>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                A repeatable ritual for planning, focus, and review
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
              {productJourney.map((step) => {
                const Icon = step.icon
                return (
                  <Card key={step.title} className="border-none bg-card/60 backdrop-blur">
                    <CardHeader className="space-y-4">
                      <Icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wide">
                Features
              </Badge>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Everything you need to hit the targets in the PRD
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
              {featureHighlights.map((feature, index) => {
                const Icon = feature.icon
                const spotlightColor = "color-mix(in srgb, var(--primary) 60%, transparent)"
                const tagline = featureTaglines[index % featureTaglines.length]

                return (
                  <SpotlightCard
                    key={feature.title}
                    spotlightColor={spotlightColor}
                    className="h-full border border-border/50 bg-gradient-to-br from-primary/5 via-card/85 to-primary/10 p-7"
                  >
                    <div className="flex h-full flex-col justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary shadow-inner shadow-primary/20">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-start text-xs font-medium uppercase tracking-wide text-primary">
                        <span className="inline-flex items-center gap-2">
                          <Sparkles className="h-3 w-3" />
                          {tagline}
                        </span>
                      </div>
                    </div>
                  </SpotlightCard>
                )
              })}
            </div>
          </div>
        </section>

        <section id="personas" className="bg-muted/30 py-20">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wide">
                Personas
              </Badge>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Built for creators, power users, students, and teams
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-6xl space-y-6">
              <Marquee
                pauseOnHover
                repeat={2}
                className="rounded-3xl border border-border/60 bg-card/70 px-6 py-8 shadow-inner shadow-primary/10 backdrop-blur"
              >
                {personas.map((persona, index) => (
                  <PersonaTile key={persona.name} persona={persona} index={index} />
                ))}
              </Marquee>
              <Marquee
                pauseOnHover
                reverse
                repeat={2}
                className="rounded-3xl border border-border/40 bg-primary/5 px-6 py-8 shadow-inner shadow-primary/10 backdrop-blur"
              >
                {[...personas].reverse().map((persona, index) => (
                  <PersonaTile key={`${persona.name}-reverse`} persona={persona} index={index} />
                ))}
              </Marquee>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wide">
                Pricing
              </Badge>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Start free, grow into Pro, invite your team when ready
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              {pricing.map((tier) => {
                const palette = (() => {
                  if (tier.name === "Pro") {
                    return {
                      color: isDarkTheme ? "rgba(124, 58, 237, 0.32)" : "rgba(168, 85, 247, 0.26)",
                      reveal: isDarkTheme
                        ? [[147, 51, 234], [236, 72, 153]]
                        : [[168, 85, 247], [236, 72, 153]],
                    }
                  }
                  if (tier.name === "Premium") {
                    return {
                      color: isDarkTheme ? "rgba(249, 115, 22, 0.28)" : "rgba(245, 158, 11, 0.22)",
                      reveal: isDarkTheme
                        ? [[248, 113, 113], [251, 191, 36]]
                        : [[251, 191, 36], [59, 130, 246]],
                    }
                  }
                  return {
                    color: isDarkTheme ? "rgba(37, 99, 235, 0.3)" : "rgba(59, 130, 246, 0.18)",
                    reveal: isDarkTheme
                      ? [[30, 64, 175], [14, 165, 233]]
                      : [[59, 130, 246], [14, 165, 233]],
                  }
                })()

                return (
                <CardSpotlight
                  key={tier.name}
                  className={cn(
                    "relative h-full overflow-hidden border border-border/60 bg-card/80 p-8 shadow-xl shadow-primary/15 backdrop-blur",
                    tier.highlight && "ring-2 ring-primary",
                  )}
                  color={palette.color}
                  radius={380}
                  revealColors={palette.reveal as [number, number, number][]}
                  dotSize={2}
                  spotlightClassName="rounded-3xl"
                >
                  {tier.highlight ? (
                    <Badge className="pointer-events-none absolute top-3 left-1/2 z-20 -translate-x-1/2 bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                      Most popular
                    </Badge>
                  ) : null}
                  <div className="relative z-10 flex h-full flex-col gap-6 pt-6">
                    <div className="space-y-4 text-center">
                      <CardTitle className="text-xl font-semibold text-foreground">{tier.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {tier.description}
                      </CardDescription>
                      <div className="pt-2 text-4xl font-black text-primary">{tier.price}</div>
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-left">
                          <ShieldCheck className="mt-1 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={tier.href}>
                      {tier.name === "Pro" ? (
                        <div className="relative flex justify-center">
                          <GlowEffect
                            colors={isDarkTheme ? ["#7c3aed", "#f97316", "#22d3ee", "#ec4899"] : ["#8b5cf6", "#facc15", "#38bdf8", "#f472b6"]}
                            mode="colorShift"
                            blur="soft"
                            duration={6}
                            scale={1.3}
                            className="rounded-full opacity-80"
                          />
                          <Button
                            className="relative z-10 w-full gap-2 rounded-full px-6"
                            variant="default"
                          >
                            {tier.cta}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button className="w-full" variant={tier.highlight ? "default" : tier.variant ?? "default"}>
                          {tier.cta}
                        </Button>
                      )}
                    </Link>
                  </div>
                </CardSpotlight>
              )})}
            </div>
          </div>
        </section>

        <section id="faq" className="bg-muted/30 py-20">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wide">
                FAQ
              </Badge>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Answers to the top questions from the roadmap
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              <Accordion
                className="flex w-full flex-col gap-2"
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                variants={{
                  expanded: { opacity: 1, scale: 1 },
                  collapsed: { opacity: 0.85, scale: 0.95 },
                }}
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.question}
                    value={`faq-${index}`}
                    className="rounded-2xl border border-border/60 bg-card/70 px-2 py-1 shadow-sm shadow-primary/5"
                  >
                    <AccordionTrigger className="flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left text-base font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                      <ChevronRight className="h-4 w-4 flex-shrink-0 text-primary transition-transform duration-200 group-data-expanded:rotate-90" />
                      <span className="flex-1 text-left leading-snug">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="origin-top-left">
                      <div className="pl-9 pr-4 pb-4 pt-2 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <Badge variant="outline" className="mb-4 text-xs uppercase tracking-wide">
                Contact
              </Badge>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Ready to join the beta or explore Premium?
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-[1.5fr_1fr]">
              <Card className="border-none bg-card/60 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-xl">Join the waitlist</CardTitle>
                  <CardDescription>Priority invites for Pro analytics and collaboration land here first.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    className="space-y-4"
                    onSubmit={(event) => {
                      event.preventDefault()
                    }}
                  >
                    <div className="grid gap-2">
                      <label htmlFor="waitlist-email" className="text-sm font-medium">
                        Work email
                      </label>
                      <Input id="waitlist-email" type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="waitlist-team" className="text-sm font-medium">
                        Team size (optional)
                      </label>
                      <Input id="waitlist-team" type="text" placeholder="Just me, small team, whole studio..." />
                    </div>
                    <Button type="submit" className="w-full">
                      Request access
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {contactChannels.map((channel) => {
                  const Icon = channel.icon
                  return (
                    <Card key={channel.label} className="border-none bg-card/60 backdrop-blur">
                      <CardHeader className="flex flex-row items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{channel.label}</CardTitle>
                          <CardDescription>{channel.detail}</CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Link href={channel.href} className="text-sm font-medium text-primary hover:underline">
                          Reach out
                        </Link>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <Link href="/landing" className="flex items-center space-x-2">
                <Image
                  src="/app-icon-48.png"
                  alt="PomoTo-do icon"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-xl"
                />
                <span className="text-xl font-semibold">PomoTo-do</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Transform your productivity with focus rituals, progress insights, and upgrade ready workflows.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#product" className="hover:text-foreground">
                    Product journey
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-foreground">
                    Feature tour
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#faq" className="hover:text-foreground">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#personas" className="hover:text-foreground">
                    Personas
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground">
                    Log in
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Stay in the loop</h3>
              <p className="text-sm text-muted-foreground">
                Monthly updates on focus techniques, roadmap progress, and beta programs.
              </p>
              <form
                className="flex space-x-2"
                onSubmit={(event) => {
                  event.preventDefault()
                }}
              >
                <Input placeholder="Your email" type="email" required className="flex-1" />
                <Button size="sm" type="submit">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-muted-foreground">&copy; {currentYear} PomoTo-do. All rights reserved.</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="#contact" className="hover:text-foreground">
                Contact
              </Link>
              <Link href="#" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
