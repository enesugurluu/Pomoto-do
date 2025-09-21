import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { PomodoroSettingsProvider } from "@/components/pomodoro-settings-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "PomoTo-do - Pomodoro Timer & Todo List",
  description: "A modern productivity app combining Pomodoro timer with task management",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/app-icon-192.png",
    shortcut: "/favicon-32.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body suppressHydrationWarning className="font-sans">
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
            <PomodoroSettingsProvider>{children}</PomodoroSettingsProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
