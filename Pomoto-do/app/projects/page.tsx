import { Sidebar } from "@/components/sidebar"
import { ProjectsContent } from "@/components/projects-content" // Import ProjectsContent component

export default function ProjectsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <ProjectsContent />
      </main>
    </div>
  )
}
