"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  ArrowRight,
  BarChart3,
  Check,
  CalendarCheck,
  ClipboardList,
  Clock,
  Mail,
  Menu,
  MessageCircle,
  Monitor,
  Moon,
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
    value: "70%",
    description: "New accounts start a focus session in week one.",
    icon: Target,
  },
  {
    label: "Daily focus blocks",
    value: "3.5",
    description: "Average Pomodoros per active day.",
    icon: Clock,
  },
  {
    label: "Week four retention",
    value: "40%",
    description: "Goal for healthy free tier habits.",
    icon: Repeat,
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

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const


function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const theme = isMounted ? resolvedTheme ?? "system" : "system"
  const label = theme === "dark" ? "Dark" : theme === "light" ? "Light" : "System"

  const handleSelect = (value: (typeof themeOptions)[number]["value"]) => {
    setTheme(value)
    setMenuOpen(false)
  }

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="relative flex items-center gap-2"
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          {menuOpen ? <span className="text-sm font-medium">{label} mode</span> : null}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themeOptions.map((option) => {
          const OptionIcon = option.icon
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="flex items-center gap-2"
            >
              <OptionIcon className="h-4 w-4" />
              <span>{option.label}</span>
              {theme === option.value ? <Check className="ml-auto h-4 w-4 text-primary" /> : null}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const currentYear = new Date().getFullYear()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <Link href="/landing" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Timer className="h-5 w-5 text-primary-foreground" />
            </div>
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
                Plan, focus, and measure in one Pomodoro HQ
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
                PomoTo-do blends task planning, focus sessions, and upgrade ready analytics so builders, students, and teams can stay in flow.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/signup">
                  <Button size="lg" className="group">
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
                        <h3 className="text-2xl font-black">{stat.value}</h3>
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
              {featureHighlights.map((feature) => {
                const Icon = feature.icon
                return (
                  <Card key={feature.title} className="border-none bg-card/60 backdrop-blur">
                    <CardHeader className="space-y-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
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
            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
              {personas.map((persona) => (
                <Card key={persona.name} className="border-none bg-card/60 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="text-lg">{persona.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{persona.insight}</p>
                  </CardContent>
                </Card>
              ))}
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
              {pricing.map((tier) => (
                <Card
                  key={tier.name}
                  className={`border-none bg-card/60 backdrop-blur ${tier.highlight ? "ring-2 ring-primary" : ""}`}
                >
                  {tier.highlight ? (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                      Most popular
                    </Badge>
                  ) : null}
                  <CardHeader className="space-y-3 text-center">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="pt-2">
                      <span className="text-3xl font-black">{tier.price}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex h-full flex-col justify-between space-y-4">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <ShieldCheck className="mt-1 h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={tier.href}>
                      <Button className="w-full" variant={tier.highlight ? "default" : tier.variant ?? "default"}>
                        {tier.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
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
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq.question} value={`faq-${index}`} className="overflow-hidden rounded-xl border">
                    <AccordionTrigger className="px-6 py-4 text-left text-sm font-medium hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 text-sm text-muted-foreground">{faq.answer}</AccordionContent>
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
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Timer className="h-5 w-5 text-primary-foreground" />
                </div>
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

