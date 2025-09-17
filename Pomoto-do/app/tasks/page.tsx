import { Sidebar } from "@/components/sidebar"
import { TaskManagement } from "@/components/task-management"

export default function TasksPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <TaskManagement />
      </main>
    </div>
  )
}
