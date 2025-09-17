import { Sidebar } from "@/components/sidebar"
import { ProDashboardContent } from "@/components/pro-dashboard-content"

export default function ProDashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <ProDashboardContent />
      </main>
    </div>
  )
}
