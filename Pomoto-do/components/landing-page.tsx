"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import * as NavigationMenu from "@radix-ui/react-navigation-menu"
import * as Accordion from "@radix-ui/react-accordion"
import { Timer, CheckSquare, FolderOpen, Star, ArrowRight, Play, Users, Zap, ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Timer className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PomoTo-do</span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu.Root className="hidden md:flex">
            <NavigationMenu.List className="flex space-x-8">
              <NavigationMenu.Item>
                <NavigationMenu.Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Testimonials
                </NavigationMenu.Link>
              </NavigationMenu.Item>
              <NavigationMenu.Item>
                <NavigationMenu.Link className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>

          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="hidden md:inline-flex bg-transparent">
                Open App
              </Button>
            </Link>
            <Button size="sm" className="hidden md:inline-flex">
              Get Started
            </Button>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="container px-4 py-4 space-y-4">
              <Link href="#features" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="#pricing" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="block text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Testimonials
              </Link>
              <Link href="#contact" className="block text-sm font-medium text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Separator />
              <div className="flex flex-col space-y-2">
                <Link href="/">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Open App
                  </Button>
                </Link>
                <Button size="sm" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="container relative px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 text-sm">
              <Zap className="mr-1 h-3 w-3" />
              Boost Your Productivity
            </Badge>
            <h1 className="text-balance text-4xl font-black tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Maximize Your Productivity with{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">PomoTo-do</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              Harness the power of the Pomodoro Technique combined with intelligent task management. Transform your
              workflow with premium themes, project organization, and focus-driven productivity.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/">
                <Button size="lg" className="group">
                  Open App Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="group bg-transparent">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Everything you need to stay focused
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Powerful features designed to enhance your productivity and help you achieve your goals.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur transition-all hover:bg-card/80 hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Timer className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Pomodoro Timer</CardTitle>
                <CardDescription>
                  Focus in 25-minute intervals with customizable break periods. Track your productivity patterns.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur transition-all hover:bg-card/80 hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <CheckSquare className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Task Management</CardTitle>
                <CardDescription>
                  Organize tasks with priorities, tags, and due dates. Edit and track progress seamlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur transition-all hover:bg-card/80 hover:shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                  <FolderOpen className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Project Organization</CardTitle>
                <CardDescription>
                  Group tasks into projects with tree navigation. Collaborate with team members effectively.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Premium Themes</CardTitle>
                </div>
                <CardDescription>
                  Six beautiful premium themes with blurry backgrounds and elegant designs for enhanced focus.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-accent/5 to-secondary/5 backdrop-blur">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg">Team Collaboration</CardTitle>
                </div>
                <CardDescription>
                  Share projects, assign tasks, and track team progress with built-in collaboration tools.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Loved by productivity enthusiasts
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              See what our users say about their productivity transformation.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent" />
                  <div>
                    <CardTitle className="text-sm">Sarah Chen</CardTitle>
                    <CardDescription className="text-xs">Product Manager</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  &quot;PomoTo-do transformed my workflow. The premium themes and project organization features help me stay
                  focused and productive throughout the day.&quot;
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-accent to-secondary" />
                  <div>
                    <CardTitle className="text-sm">Marcus Rodriguez</CardTitle>
                    <CardDescription className="text-xs">Software Developer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  &quot;The Pomodoro timer with task integration is perfect. I can track my coding sessions and manage my
                  projects all in one elegant interface.&quot;
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-secondary to-primary" />
                  <div>
                    <CardTitle className="text-sm">Emily Watson</CardTitle>
                    <CardDescription className="text-xs">Graduate Student</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  &quot;As a student, PomoTo-do helps me break down large projects into manageable tasks. The premium themes
                  make studying more enjoyable.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Choose your productivity plan
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Start free and upgrade as your productivity needs grow.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Basic</CardTitle>
                <CardDescription>Perfect for getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-black">Free</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Basic Pomodoro Timer
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Simple Task Management
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Default Theme
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-2 border-primary bg-card/50 backdrop-blur">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Pro</CardTitle>
                <CardDescription>For serious productivity enthusiasts</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-black">$9</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Advanced Timer Features
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Full Task Management
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Premium Themes
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Project Organization
                  </li>
                </ul>
                <Button className="w-full">Start Pro Trial</Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Premium</CardTitle>
                <CardDescription>For teams and power users</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-black">$19</span>
                  <span className="text-sm text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Team Collaboration
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Advanced Analytics
                  </li>
                  <li className="flex items-center">
                    <CheckSquare className="mr-2 h-4 w-4 text-primary" />
                    Priority Support
                  </li>
                </ul>
                <Button className="w-full bg-transparent" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Everything you need to know about PomoTo-do.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Accordion.Root type="single" collapsible className="space-y-4">
              <Accordion.Item value="item-1" className="rounded-lg border bg-card/50 backdrop-blur px-6">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium hover:underline [&[data-state=open]>svg]:rotate-180">
                    What is the Pomodoro Technique?
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-4 text-sm text-muted-foreground">
                  The Pomodoro Technique is a time management method that uses 25-minute focused work intervals followed
                  by short breaks. It helps improve concentration and productivity by breaking work into manageable
                  chunks.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="item-2" className="rounded-lg border bg-card/50 backdrop-blur px-6">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium hover:underline [&[data-state=open]>svg]:rotate-180">
                    Can I customize the timer intervals?
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-4 text-sm text-muted-foreground">
                  Yes! PomoTo-do allows you to customize work intervals, short breaks, and long breaks to fit your
                  workflow. You can adjust these settings in the app preferences.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="item-3" className="rounded-lg border bg-card/50 backdrop-blur px-6">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium hover:underline [&[data-state=open]>svg]:rotate-180">
                    What premium themes are available?
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-4 text-sm text-muted-foreground">
                  We offer six premium themes: Ocean Breeze, Sunset Glow, Forest Green, Royal Purple, Cherry Blossom,
                  and Midnight Blue. Each theme includes elegant blurry backgrounds and carefully crafted color schemes.
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="item-4" className="rounded-lg border bg-card/50 backdrop-blur px-6">
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between py-4 text-left text-sm font-medium hover:underline [&[data-state=open]>svg]:rotate-180">
                    Is there a mobile app available?
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-4 text-sm text-muted-foreground">
                  PomoTo-do is a web-based application that works seamlessly across all devices. You can access it from
                  any browser on desktop, tablet, or mobile devices.
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10">
        <div className="container px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-foreground md:text-4xl">
              Ready to boost your productivity?
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Join thousands of users who have transformed their workflow with PomoTo-do.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/">
                <Button size="lg" className="group">
                  Start Using PomoTo-do
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Timer className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">PomoTo-do</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transform your productivity with the power of focused work sessions and intelligent task management.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Open App
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">Get the latest productivity tips and updates.</p>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-muted-foreground">© 2024 PomoTo-do. All rights reserved.</p>
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

