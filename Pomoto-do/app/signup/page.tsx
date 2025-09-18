import type { Metadata } from "next"
import { AuthPage } from "@/components/auth/AuthPage"

export const metadata: Metadata = {
  title: "Sign up - PomoTo-do",
  description: "Create your PomoTo-do workspace to focus, plan, and measure your progress.",
}

export default function SignupPage() {
  return <AuthPage mode="signup" />
}
