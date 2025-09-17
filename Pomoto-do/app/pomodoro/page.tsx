import { Sidebar } from "@/components/sidebar"
import { PomodoroTimer } from "@/components/pomodoro-timer"

export default function PomodoroPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <PomodoroTimer />
      </main>
    </div>
  )
}
