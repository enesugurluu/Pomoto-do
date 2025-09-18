import type { Metadata } from "next"
import { AuthPage } from "@/components/auth/AuthPage"

export const metadata: Metadata = {
  title: "Log in - PomoTo-do",
  description: "Sign in to plan tasks, run Pomodoro sessions, and track your progress inside PomoTo-do.",
}

export default function LoginPage() {
  return <AuthPage mode="login" />
}
