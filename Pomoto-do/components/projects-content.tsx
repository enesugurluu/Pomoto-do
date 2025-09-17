"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  Circle,
  AlertCircle,
  Archive,
  FolderOpen,
  Target,
  TrendingUp,
} from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "on-hold" | "archived"
  priority: "low" | "medium" | "high"
  progress: number
  dueDate: string
  createdAt: string
  teamMembers: Array<{
    id: string
    name: string
    avatar: string
  }>
  tasksCount: {
    total: number
    completed: number
  }
  pomodorosSpent: number
  color: string
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved UX",
    status: "active",
    priority: "high",
    progress: 65,
    dueDate: "2024-02-15",
    createdAt: "2024-01-01",
    teamMembers: [
      { id: "1", name: "Alice Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "2", name: "Bob Smith", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "3", name: "Carol Davis", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tasksCount: { total: 24, completed: 16 },
    pomodorosSpent: 89,
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native iOS and Android app for our productivity platform",
    status: "active",
    priority: "high",
    progress: 40,
    dueDate: "2024-03-30",
    createdAt: "2024-01-15",
    teamMembers: [
      { id: "4", name: "David Wilson", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "5", name: "Eva Brown", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tasksCount: { total: 45, completed: 18 },
    pomodorosSpent: 156,
    color: "bg-green-500",
  },
  {
    id: "3",
    name: "Marketing Campaign Q1",
    description: "Launch comprehensive marketing campaign for Q1 2024",
    status: "completed",
    priority: "medium",
    progress: 100,
    dueDate: "2024-01-31",
    createdAt: "2023-12-01",
    teamMembers: [
      { id: "6", name: "Frank Miller", avatar: "/placeholder.svg?height=32&width=32" },
      { id: "7", name: "Grace Lee", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tasksCount: { total: 18, completed: 18 },
    pomodorosSpent: 72,
    color: "bg-purple-500",
  },
  {
    id: "4",
    name: "API Documentation",
    description: "Comprehensive documentation for our REST API endpoints",
    status: "on-hold",
    priority: "low",
    progress: 25,
    dueDate: "2024-04-15",
    createdAt: "2024-01-20",
    teamMembers: [{ id: "8", name: "Henry Taylor", avatar: "/placeholder.svg?height=32&width=32" }],
    tasksCount: { total: 12, completed: 3 },
    pomodorosSpent: 18,
    color: "bg-orange-500",
  },
]

const statusConfig = {
  active: { label: "Active", icon: Circle, color: "text-blue-500" },
  completed: { label: "Completed", icon: CheckCircle2, color: "text-green-500" },
  "on-hold": { label: "On Hold", icon: AlertCircle, color: "text-yellow-500" },
  archived: { label: "Archived", icon: Archive, color: "text-gray-500" },
}

const priorityConfig = {
  low: { label: "Low", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" },
  medium: { label: "Medium", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  high: { label: "High", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
}

export function ProjectsContent() {
  const [projects, setProjects] = useState<Project[]>(mockProjects)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    priority: "medium" as const,
    dueDate: "",
    color: "bg-blue-500",
  })

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    const matchesPriority = priorityFilter === "all" || project.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleCreateProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      status: "active",
      priority: newProject.priority,
      progress: 0,
      dueDate: newProject.dueDate,
      createdAt: new Date().toISOString().split("T")[0],
      teamMembers: [],
      tasksCount: { total: 0, completed: 0 },
      pomodorosSpent: 0,
      color: newProject.color,
    }

    setProjects([project, ...projects])
    setNewProject({
      name: "",
      description: "",
      priority: "medium",
      dueDate: "",
      color: "bg-blue-500",
    })
    setIsCreateDialogOpen(false)
  }

  const getStatusIcon = (status: Project["status"]) => {
    const config = statusConfig[status]
    const Icon = config.icon
    return <Icon className={cn("w-4 h-4", config.color)} />
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Projects</h1>
          <p className="text-muted-foreground text-pretty">Manage and track your project progress</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Set up a new project to organize your tasks and track progress.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="Enter project name"
                  value={newProject.name}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  placeholder="Describe your project"
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-priority">Priority</Label>
                  <Select
                    value={newProject.priority}
                    onValueChange={(value: any) => setNewProject((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-due-date">Due Date</Label>
                  <Input
                    id="project-due-date"
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject((prev) => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Project Color</Label>
                <div className="flex gap-2">
                  {["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-red-500", "bg-pink-500"].map(
                    (color) => (
                      <button
                        key={color}
                        className={cn(
                          "w-8 h-8 rounded-full border-2 transition-all",
                          color,
                          newProject.color === color
                            ? "border-foreground scale-110"
                            : "border-transparent hover:scale-105",
                        )}
                        onClick={() => setNewProject((prev) => ({ ...prev, color }))}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject} disabled={!newProject.name.trim()}>
                Create Project
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <FolderOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{projects.filter((p) => p.status === "completed").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Target className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">{projects.filter((p) => p.status === "active").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-2xl font-bold">
                  {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const daysUntilDue = getDaysUntilDue(project.dueDate)
          const isOverdue = daysUntilDue < 0
          const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0

          return (
            <Card key={project.id} className="group hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-3 h-3 rounded-full", project.color)} />
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        {getStatusIcon(project.status)}
                        <span className="text-sm text-muted-foreground">{statusConfig[project.status].label}</span>
                        <Badge className={priorityConfig[project.priority].color} variant="secondary">
                          {priorityConfig[project.priority].label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-2">{project.description}</CardDescription>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                    <span>
                      {project.tasksCount.completed}/{project.tasksCount.total} tasks
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{project.pomodorosSpent} pomodoros</span>
                  </div>
                </div>

                {/* Due Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span
                      className={cn(
                        isOverdue ? "text-red-500" : isDueSoon ? "text-yellow-500" : "text-muted-foreground",
                      )}
                    >
                      Due {formatDate(project.dueDate)}
                    </span>
                  </div>
                  {isOverdue && (
                    <Badge variant="destructive" className="text-xs">
                      Overdue
                    </Badge>
                  )}
                  {isDueSoon && !isOverdue && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    >
                      Due Soon
                    </Badge>
                  )}
                </div>

                {/* Team Members */}
                {project.teamMembers.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <div className="flex -space-x-2">
                      {project.teamMembers.slice(0, 3).map((member) => (
                        <Avatar key={member.id} className="w-6 h-6 border-2 border-background">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {project.teamMembers.length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                          <span className="text-xs text-muted-foreground">+{project.teamMembers.length - 3}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
              ? "Try adjusting your search or filters"
              : "Create your first project to get started"}
          </p>
          {!searchQuery && statusFilter === "all" && priorityFilter === "all" && (
            <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Project
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
