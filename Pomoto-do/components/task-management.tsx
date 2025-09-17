"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  CalendarIcon,
  Clock,
  Tag,
  CheckSquare,
  SortAsc,
  SortDesc,
  AlertCircle,
  Target,
  Zap,
  Minus,
  Upload,
  ImageIcon,
  X,
} from "lucide-react"
import { format } from "date-fns"

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "low" | "medium" | "high" | "urgent"
  project: string
  tags: string[]
  dueDate: Date | null
  estimatedPomodoros: number
  completedPomodoros: number
  createdAt: Date
  imageUrl?: string
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write comprehensive project proposal including timeline, budget, and deliverables",
    completed: false,
    priority: "high",
    project: "Client Project A",
    tags: ["proposal", "client", "urgent"],
    dueDate: new Date(2024, 11, 25),
    estimatedPomodoros: 4,
    completedPomodoros: 2,
    createdAt: new Date(2024, 11, 20),
    imageUrl: "/project-proposal-mockup.jpg",
  },
  {
    id: "2",
    title: "Review design mockups",
    description: "Review and provide feedback on the latest design mockups from the design team",
    completed: false,
    priority: "medium",
    project: "Design System",
    tags: ["design", "review"],
    dueDate: new Date(2024, 11, 23),
    estimatedPomodoros: 2,
    completedPomodoros: 0,
    createdAt: new Date(2024, 11, 19),
  },
  {
    id: "3",
    title: "Update documentation",
    description: "Update API documentation with latest changes and examples",
    completed: true,
    priority: "low",
    project: "Documentation",
    tags: ["docs", "api"],
    dueDate: null,
    estimatedPomodoros: 3,
    completedPomodoros: 3,
    createdAt: new Date(2024, 11, 18),
  },
  {
    id: "4",
    title: "Client meeting preparation",
    description: "Prepare presentation materials and agenda for client meeting",
    completed: false,
    priority: "urgent",
    project: "Client Project A",
    tags: ["meeting", "client", "presentation"],
    dueDate: new Date(2024, 11, 22),
    estimatedPomodoros: 1,
    completedPomodoros: 0,
    createdAt: new Date(2024, 11, 21),
  },
]

const projects = ["Client Project A", "Design System", "Documentation", "Personal", "Marketing"]

type SortOption = "dueDate" | "priority" | "created" | "title"
type FilterOption = "all" | "pending" | "completed" | "overdue"

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("dueDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filterBy, setFilterBy] = useState<FilterOption>("all")
  const [selectedProject, setSelectedProject] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  // New task form state
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as Task["priority"],
    project: "",
    tags: "",
    dueDate: null as Date | null,
    estimatedPomodoros: 1,
    imageUrl: "", // Added image URL field
  })

  const [tagInput, setTagInput] = useState("")
  const [parsedTags, setParsedTags] = useState<string[]>([])

  const tagColors = [
    "bg-blue-500 text-white",
    "bg-green-500 text-white",
    "bg-purple-500 text-white",
    "bg-orange-500 text-white",
    "bg-pink-500 text-white",
    "bg-teal-500 text-white",
    "bg-red-500 text-white",
    "bg-indigo-500 text-white",
    "bg-yellow-500 text-black",
    "bg-cyan-500 text-white",
  ]

  const getTagColor = (index: number) => {
    return tagColors[index % tagColors.length]
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setNewTask((prev) => ({ ...prev, imageUrl: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getPriorityIcon = (priority: Task["priority"]) => {
    switch (priority) {
      case "urgent":
        return <AlertCircle className="w-3 h-3" />
      case "high":
        return <Zap className="w-3 h-3" />
      case "medium":
        return <Target className="w-3 h-3" />
      case "low":
        return <Minus className="w-3 h-3" />
    }
  }

  const handleTagInputChange = (value: string) => {
    setTagInput(value)
    setNewTask((prev) => ({ ...prev, tags: value }))

    // Parse tags and update preview
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
    setParsedTags(tags)
  }

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      // Search filter
      if (
        searchQuery &&
        !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false
      }

      // Status filter
      if (filterBy === "completed" && !task.completed) return false
      if (filterBy === "pending" && task.completed) return false
      if (filterBy === "overdue" && (!task.dueDate || task.dueDate > new Date() || task.completed)) return false

      // Project filter
      if (selectedProject !== "all" && task.project !== selectedProject) return false

      return true
    })
    .sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "dueDate":
          if (!a.dueDate && !b.dueDate) comparison = 0
          else if (!a.dueDate) comparison = 1
          else if (!b.dueDate) comparison = -1
          else comparison = a.dueDate.getTime() - b.dueDate.getTime()
          break
        case "priority":
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
          comparison = priorityOrder[b.priority] - priorityOrder[a.priority]
          break
        case "created":
          comparison = b.createdAt.getTime() - a.createdAt.getTime()
          break
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

  const toggleTaskComplete = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId))
  }

  const createTask = () => {
    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      project: newTask.project,
      tags: newTask.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      dueDate: newTask.dueDate,
      estimatedPomodoros: newTask.estimatedPomodoros,
      completedPomodoros: 0,
      createdAt: new Date(),
      imageUrl: newTask.imageUrl || undefined, // Include image URL
    }

    setTasks((prev) => [task, ...prev])
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      project: "",
      tags: "",
      dueDate: null,
      estimatedPomodoros: 1,
      imageUrl: "", // Reset image URL
    })
    setIsCreateDialogOpen(false)
    setTagInput("")
    setParsedTags([])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
    setEditingTask(null)
  }

  const handleEditSubmit = () => {
    if (editingTask) {
      const updatedTask: Task = {
        ...editingTask,
        tags: editingTask.tags,
      }
      updateTask(updatedTask)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Task Management</h1>
          <p className="text-muted-foreground text-pretty">Organize and track your tasks efficiently</p>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to your productivity workflow</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter task title..."
                  value={newTask.title}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your task..."
                  value={newTask.description}
                  onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Task Image</Label>
                <div className="space-y-2">
                  {newTask.imageUrl ? (
                    <div className="relative">
                      <img
                        src={newTask.imageUrl || "/placeholder.svg"}
                        alt="Task preview"
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setNewTask((prev) => ({ ...prev, imageUrl: "" }))}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Upload an image for this task</p>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="w-3 h-3 mr-2" />
                            Choose Image
                          </span>
                        </Button>
                      </Label>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value: Task["priority"]) => setNewTask((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Project</Label>
                  <Select
                    value={newTask.project}
                    onValueChange={(value) => setNewTask((prev) => ({ ...prev, project: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project} value={project}>
                          {project}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="Enter tags separated by commas..."
                  value={tagInput}
                  onChange={(e) => handleTagInputChange(e.target.value)}
                />
                {/* Tag preview with colors */}
                {parsedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-2 bg-muted/30 rounded-md">
                    {parsedTags.map((tag, index) => (
                      <Badge key={index} className={cn("text-xs", getTagColor(index))}>
                        <Tag className="w-2 h-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTask.dueDate ? format(newTask.dueDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newTask.dueDate || undefined}
                        onSelect={(date) => setNewTask((prev) => ({ ...prev, dueDate: date || null }))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pomodoros">Estimated Pomodoros</Label>
                  <Input
                    id="pomodoros"
                    type="number"
                    min="1"
                    max="20"
                    value={newTask.estimatedPomodoros}
                    onChange={(e) =>
                      setNewTask((prev) => ({
                        ...prev,
                        estimatedPomodoros: Number.parseInt(e.target.value) || 1,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false)
                    setTagInput("")
                    setParsedTags([])
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={createTask} disabled={!newTask.title.trim()}>
                  Create Task
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Update your task details</DialogDescription>
            </DialogHeader>

            {editingTask && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Task Title *</Label>
                  <Input
                    id="edit-title"
                    placeholder="Enter task title..."
                    value={editingTask.title}
                    onChange={(e) => setEditingTask((prev) => (prev ? { ...prev, title: e.target.value } : null))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Describe your task..."
                    value={editingTask.description}
                    onChange={(e) => setEditingTask((prev) => (prev ? { ...prev, description: e.target.value } : null))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Task Image</Label>
                  <div className="space-y-2">
                    {editingTask.imageUrl ? (
                      <div className="relative">
                        <img
                          src={editingTask.imageUrl || "/placeholder.svg"}
                          alt="Task preview"
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => setEditingTask((prev) => (prev ? { ...prev, imageUrl: "" } : null))}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">Upload an image for this task</p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = (event) => {
                                const result = event.target?.result as string
                                setEditingTask((prev) => (prev ? { ...prev, imageUrl: result } : null))
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                          className="hidden"
                          id="edit-image-upload"
                        />
                        <Label htmlFor="edit-image-upload" className="cursor-pointer">
                          <Button variant="outline" size="sm" asChild>
                            <span>
                              <Upload className="w-3 h-3 mr-2" />
                              Choose Image
                            </span>
                          </Button>
                        </Label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={editingTask.priority}
                      onValueChange={(value: Task["priority"]) =>
                        setEditingTask((prev) => (prev ? { ...prev, priority: value } : null))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Project</Label>
                    <Select
                      value={editingTask.project}
                      onValueChange={(value) => setEditingTask((prev) => (prev ? { ...prev, project: value } : null))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project} value={project}>
                            {project}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-tags">Tags</Label>
                  <Input
                    id="edit-tags"
                    placeholder="Enter tags separated by commas..."
                    value={editingTask.tags.join(", ")}
                    onChange={(e) => {
                      const tags = e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean)
                      setEditingTask((prev) => (prev ? { ...prev, tags } : null))
                    }}
                  />
                  {editingTask.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-2 bg-muted/30 rounded-md">
                      {editingTask.tags.map((tag, index) => (
                        <Badge key={index} className={cn("text-xs", getTagColor(index))}>
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {editingTask.dueDate ? format(editingTask.dueDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={editingTask.dueDate || undefined}
                          onSelect={(date) =>
                            setEditingTask((prev) => (prev ? { ...prev, dueDate: date || null } : null))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-pomodoros">Estimated Pomodoros</Label>
                    <Input
                      id="edit-pomodoros"
                      type="number"
                      min="1"
                      max="20"
                      value={editingTask.estimatedPomodoros}
                      onChange={(e) =>
                        setEditingTask((prev) =>
                          prev
                            ? {
                                ...prev,
                                estimatedPomodoros: Number.parseInt(e.target.value) || 1,
                              }
                            : null,
                        )
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setEditingTask(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEditSubmit} disabled={!editingTask.title.trim()}>
                    Update Task
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project} value={project}>
                      {project}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  {sortOrder === "asc" ? <SortAsc className="w-4 h-4 mr-2" /> : <SortDesc className="w-4 h-4 mr-2" />}
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">Due Date</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
              >
                {sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        {filteredAndSortedTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No tasks found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || filterBy !== "all" || selectedProject !== "all"
                  ? "Try adjusting your filters or search query"
                  : "Create your first task to get started"}
              </p>
              {!searchQuery && filterBy === "all" && selectedProject === "all" && (
                <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Task
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedTasks.map((task) => (
            <Card key={task.id} className={cn("transition-all hover:shadow-md", task.completed && "opacity-60")}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskComplete(task.id)}
                    className="mt-1"
                  />

                  {task.imageUrl && (
                    <div className="flex-shrink-0">
                      <img
                        src={task.imageUrl || "/placeholder.svg"}
                        alt={task.title}
                        className="w-16 h-16 object-cover rounded-lg border"
                      />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                        {task.title}
                      </h3>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingTask(task)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteTask(task.id)} className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {task.description && <p className="text-sm text-muted-foreground">{task.description}</p>}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {task.completedPomodoros}/{task.estimatedPomodoros} Pomodoros
                        </span>
                      </div>

                      {task.dueDate && (
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          <span
                            className={cn(task.dueDate < new Date() && !task.completed && "text-red-500 font-medium")}
                          >
                            {format(task.dueDate, "MMM d")}
                          </span>
                        </div>
                      )}

                      <span>{task.project}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
                        {getPriorityIcon(task.priority)}
                        <span className="ml-1 capitalize">{task.priority}</span>
                      </Badge>

                      {task.tags.map((tag, index) => (
                        <Badge key={tag} variant="secondary" className={cn("text-xs", getTagColor(index))}>
                          <Tag className="w-2 h-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
