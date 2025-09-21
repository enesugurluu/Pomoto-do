"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible" // Added Radix UI Collapsible
import { UpgradeModal } from "./upgrade-modal"
import { ThemeToggle } from "./theme-toggle"
import { useCustomTheme } from "./theme-provider" // Added custom theme hook
import {
  LayoutDashboard,
  CheckSquare,
  FolderOpen,
  Timer,
  Settings,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Crown,
  Code,
  Circle,
  CheckCircle2,
  AlertCircle,
  Archive,
} from "lucide-react"

const mockProjects = [
  { id: "1", name: "Website Redesign", status: "active", color: "bg-blue-500" },
  { id: "2", name: "Mobile App Development", status: "active", color: "bg-green-500" },
  { id: "3", name: "Marketing Campaign Q1", status: "completed", color: "bg-purple-500" },
  { id: "4", name: "API Documentation", status: "on-hold", color: "bg-orange-500" },
]

const navigation = [
  { name: "Pomodoro", href: "/pomodoro", icon: Timer },
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Projects", href: "/projects", icon: FolderOpen, hasTree: true }, // Added hasTree flag
]

const statusIcons = {
  active: { icon: Circle, color: "text-blue-500" },
  completed: { icon: CheckCircle2, color: "text-green-500" },
  "on-hold": { icon: AlertCircle, color: "text-yellow-500" },
  archived: { icon: Archive, color: "text-gray-500" },
}

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [projectsExpanded, setProjectsExpanded] = useState(false) // Added projects tree state
  const { isDevMode, setIsDevMode } = useCustomTheme() // Use custom theme context
  const pathname = usePathname()

  const getStatusIcon = (status: keyof typeof statusIcons) => {
    const config = statusIcons[status]
    const Icon = config.icon
    return <Icon className={cn("w-3 h-3", config.color)} />
  }

  return (
    <>
      <div
        className={cn(
          "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-16" : "w-64",
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Image
                src="/app-icon-48.png"
                alt="PomoTo-do icon"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl"
                priority
              />
              <span className="font-bold text-lg text-sidebar-foreground">PomoTo-do</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href

            if (item.hasTree && item.name === "Projects") {
              return (
                <div key={item.name}>
                  <Collapsible open={projectsExpanded} onOpenChange={setProjectsExpanded}>
                    <div className="flex items-center">
                      <Link href={item.href} className="flex-1">
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
                            collapsed && "px-2",
                            isActive &&
                              "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                          )}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          {!collapsed && <span>{item.name}</span>}
                        </Button>
                      </Link>
                      {!collapsed && (
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-1 p-1 h-8 w-8 text-sidebar-foreground hover:bg-sidebar-accent"
                          >
                            {projectsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </Button>
                        </CollapsibleTrigger>
                      )}
                    </div>
                    {!collapsed && (
                      <CollapsibleContent className="mt-2 ml-4 space-y-1">
                        {mockProjects.map((project) => (
                          <Link key={project.id} href={`/projects/${project.id}`}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent pl-6"
                            >
                              <div className={cn("w-2 h-2 rounded-full", project.color)} />
                              {getStatusIcon(project.status as keyof typeof statusIcons)}
                              <span className="truncate">{project.name}</span>
                            </Button>
                          </Link>
                        ))}
                        <Link href="/projects/new">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-2 text-sm text-muted-foreground hover:bg-sidebar-accent pl-6"
                          >
                            <div className="w-2 h-2 rounded-full border border-dashed border-muted-foreground" />
                            <span>New Project</span>
                          </Button>
                        </Link>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </div>
              )
            }

            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent",
                    collapsed && "px-2",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              </Link>
            )
          })}
        </nav>

        {!collapsed && (
          <div className="p-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-blue-500" />
                  <span className="font-medium text-sm">Developer Mode</span>
                </div>
                <Button
                  variant={isDevMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsDevMode(!isDevMode)}
                  className="h-6 px-2 text-xs"
                >
                  {isDevMode ? "ON" : "OFF"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                {isDevMode ? "All pro features unlocked!" : "Enable to try pro features"}
              </p>
            </div>
          </div>
        )}

        {/* Upgrade CTA - only show when dev mode is off */}
        {!collapsed && !isDevMode && (
          <div className="p-4">
            <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-accent" />
                <span className="font-medium text-sm">Upgrade to Pro</span>
              </div>
              <Button size="sm" className="w-full" onClick={() => setShowUpgradeModal(true)}>
                Upgrade
              </Button>
            </div>
          </div>
        )}

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/diverse-user-avatars.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
                  <Badge variant={isDevMode ? "default" : "secondary"} className="text-xs">
                    <Crown className="w-3 h-3 mr-1" />
                    {isDevMode ? "DEV" : "Free"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">john@example.com</p>
              </div>
            )}
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <Link href="/settings">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-sidebar-foreground hover:bg-sidebar-accent",
                    pathname === "/settings" && "bg-sidebar-primary text-sidebar-primary-foreground",
                  )}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </>
  )
}
