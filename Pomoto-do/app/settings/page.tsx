import { Sidebar } from "@/components/sidebar"
import { SettingsContent } from "@/components/settings-content"

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <SettingsContent />
      </main>
    </div>
  )
}
