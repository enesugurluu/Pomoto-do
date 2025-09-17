"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ProBadge } from "./pro-badge"
import { UpgradeModal } from "./upgrade-modal"
import { useCustomTheme } from "@/components/theme-provider"
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Settings,
  CheckSquare,
  Clock,
  Crown,
  Focus,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { usePomodoroSettings, DEFAULT_POMODORO_SETTINGS } from "@/components/pomodoro-settings-provider"

interface Task {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high" | "urgent"
  estimatedPomodoros: number
  completedPomodoros: number
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    completed: false,
    priority: "high",
    estimatedPomodoros: 4,
    completedPomodoros: 2,
  },
  {
    id: "2",
    title: "Review design mockups",
    completed: false,
    priority: "medium",
    estimatedPomodoros: 2,
    completedPomodoros: 0,
  },
  {
    id: "3",
    title: "Update documentation",
    completed: false,
    priority: "low",
    estimatedPomodoros: 3,
    completedPomodoros: 1,
  },
  {
    id: "4",
    title: "Client meeting preparation",
    completed: false,
    priority: "urgent",
    estimatedPomodoros: 1,
    completedPomodoros: 0,
  },
]

type TimerMode = "work" | "shortBreak" | "longBreak"

export function PomodoroTimer() {
  const { settings: pomodoroSettings, updateSettings: updatePomodoroSettings } = usePomodoroSettings()

  const workDurationSeconds = pomodoroSettings.workDuration * 60
  const shortBreakDurationSeconds = pomodoroSettings.shortBreak * 60
  const longBreakDurationSeconds = pomodoroSettings.longBreak * 60

  const previousDurationsRef = useRef({
    work: workDurationSeconds,
    shortBreak: shortBreakDurationSeconds,
    longBreak: longBreakDurationSeconds,
  })

  const QUICK_LIMITS = {
    workDuration: { min: 1, max: 60 },
    shortBreak: { min: 1, max: 30 },
    longBreak: { min: 1, max: 60 },
    longBreakInterval: { min: 2, max: 10 },
  } as const

  const clampValue = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

  type QuickSettingsKey = keyof typeof QUICK_LIMITS
  type QuickSettingsState = {
    workDuration: number
    shortBreak: number
    longBreak: number
    longBreakInterval: number
  }

  const [mode, setMode] = useState<TimerMode>("work")
  const [timeLeft, setTimeLeft] = useState(workDurationSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [activeTaskId, setActiveTaskId] = useState<string | null>("1")
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [sessionCount, setSessionCount] = useState(0)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isPro] = useState(false)
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [isQuickSettingsOpen, setIsQuickSettingsOpen] = useState(false)
  const [isTaskSidebarCollapsed, setIsTaskSidebarCollapsed] = useState(false)
  const [quickSettings, setQuickSettings] = useState<QuickSettingsState>({
    workDuration: pomodoroSettings.workDuration,
    shortBreak: pomodoroSettings.shortBreak,
    longBreak: pomodoroSettings.longBreak,
    longBreakInterval: pomodoroSettings.longBreakInterval,
  })
  const { customTheme, isDevMode } = useCustomTheme()

  const activeTask = mockTasks.find((task) => task.id === activeTaskId)

  const getDurationForMode = useCallback(
    (timerMode: TimerMode) => {
      switch (timerMode) {
        case "work":
          return workDurationSeconds
        case "shortBreak":
          return shortBreakDurationSeconds
        case "longBreak":
        default:
          return longBreakDurationSeconds
      }
    },
    [workDurationSeconds, shortBreakDurationSeconds, longBreakDurationSeconds],
  )

  const modeDurationSeconds = getDurationForMode(mode)
  const safeDuration = Math.max(1, modeDurationSeconds)
  const progress = Math.min(100, Math.max(0, ((safeDuration - timeLeft) / safeDuration) * 100))

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(getDurationForMode(mode))
  }

  const handleSkip = () => {
    setIsRunning(false)
    completeSession()
  }

  const completeSession = useCallback(() => {
    if (mode === "work") {
      setCompletedPomodoros((prev) => prev + 1)
      setSessionCount((prev) => {
        const newCount = prev + 1
        const isLongBreak = newCount % pomodoroSettings.longBreakInterval === 0
        const nextMode: TimerMode = isLongBreak ? "longBreak" : "shortBreak"
        setMode(nextMode)
        setTimeLeft(getDurationForMode(nextMode))
        setIsRunning(pomodoroSettings.autoStartBreaks)
        return newCount
      })
    } else {
      setMode("work")
      setTimeLeft(getDurationForMode("work"))
      setIsRunning(pomodoroSettings.autoStartPomodoros)
    }
  }, [mode, pomodoroSettings.longBreakInterval, pomodoroSettings.autoStartBreaks, pomodoroSettings.autoStartPomodoros, getDurationForMode])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      completeSession()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, completeSession])

  useEffect(() => {
    const newDuration = getDurationForMode(mode)
    const previousDurationForMode = previousDurationsRef.current[mode]

    setTimeLeft((prev) => {
      const normalizedPrev = Math.max(0, prev)

      if (isRunning) {
        return Math.min(normalizedPrev, newDuration)
      }

      if (newDuration !== previousDurationForMode) {
        return newDuration
      }

      if (normalizedPrev > newDuration) {
        return newDuration
      }

      return normalizedPrev
    })

    previousDurationsRef.current = {
      work: workDurationSeconds,
      shortBreak: shortBreakDurationSeconds,
      longBreak: longBreakDurationSeconds,
    }
  }, [
    getDurationForMode,
    mode,
    isRunning,
    workDurationSeconds,
    shortBreakDurationSeconds,
    longBreakDurationSeconds,
  ])


  const handleQuickSettingChange = (key: QuickSettingsKey, value: number) => {
    if (Number.isNaN(value)) return
    const { min, max } = QUICK_LIMITS[key]
    const clamped = clampValue(value, min, max)
    setQuickSettings((prev) => ({
      ...prev,
      [key]: clamped,
    }))
  }

  const applyQuickSettings = (settingsToApply: QuickSettingsState) => {
    const sanitized = {
      workDuration: clampValue(settingsToApply.workDuration, QUICK_LIMITS.workDuration.min, QUICK_LIMITS.workDuration.max),
      shortBreak: clampValue(settingsToApply.shortBreak, QUICK_LIMITS.shortBreak.min, QUICK_LIMITS.shortBreak.max),
      longBreak: clampValue(settingsToApply.longBreak, QUICK_LIMITS.longBreak.min, QUICK_LIMITS.longBreak.max),
      longBreakInterval: clampValue(
        settingsToApply.longBreakInterval,
        QUICK_LIMITS.longBreakInterval.min,
        QUICK_LIMITS.longBreakInterval.max,
      ),
    }

    setQuickSettings(sanitized)
    updatePomodoroSettings(sanitized)
  }

  const handleQuickApply = () => {
    applyQuickSettings(quickSettings)
    setIsQuickSettingsOpen(false)
  }

  const handleQuickReset = () => {
    applyQuickSettings({
      workDuration: DEFAULT_POMODORO_SETTINGS.workDuration,
      shortBreak: DEFAULT_POMODORO_SETTINGS.shortBreak,
      longBreak: DEFAULT_POMODORO_SETTINGS.longBreak,
      longBreakInterval: DEFAULT_POMODORO_SETTINGS.longBreakInterval,
    })
  }

  useEffect(() => {
    if (!isQuickSettingsOpen) return

    setQuickSettings({
      workDuration: pomodoroSettings.workDuration,
      shortBreak: pomodoroSettings.shortBreak,
      longBreak: pomodoroSettings.longBreak,
      longBreakInterval: pomodoroSettings.longBreakInterval,
    })
  }, [
    isQuickSettingsOpen,
    pomodoroSettings.workDuration,
    pomodoroSettings.shortBreak,
    pomodoroSettings.longBreak,
    pomodoroSettings.longBreakInterval,
  ])

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const isPremiumTheme = customTheme !== "default" && isDevMode

  const getPremiumBackground = () => {
    if (!isPremiumTheme) return ""

    switch (customTheme) {
      case "ocean":
        return "bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-teal-500/25"
      case "sunset":
        return "bg-gradient-to-br from-orange-500/30 via-pink-400/20 to-yellow-500/25"
      case "forest":
        return "bg-gradient-to-br from-green-600/30 via-emerald-400/20 to-lime-500/25"
      case "royal":
        return "bg-gradient-to-br from-purple-600/30 via-violet-400/20 to-fuchsia-500/25"
      case "cherry":
        return "bg-gradient-to-br from-rose-500/30 via-pink-400/20 to-red-500/25"
      case "midnight":
        return "bg-gradient-to-br from-slate-700/30 via-blue-500/20 to-indigo-500/25"
      default:
        return ""
    }
  }

  const getTimerSectionBackground = () => {
    if (!isPremiumTheme) return "bg-card"

    const baseGradient = getPremiumBackground()
    return cn(
      baseGradient,
      "backdrop-blur-xl border border-white/10 shadow-2xl",
      "relative overflow-hidden",
      "before:absolute before:inset-0 before:bg-noise before:opacity-10 before:mix-blend-overlay",
    )
  }

  const getSessionBadge = () => {
    const badgeColors = {
      work: isPremiumTheme ? "bg-gradient-to-r from-red-500 to-orange-500 text-white" : "bg-red-500 text-white",
      shortBreak: isPremiumTheme
        ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
        : "bg-green-500 text-white",
      longBreak: isPremiumTheme ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white" : "bg-blue-500 text-white",
    }

    const sessionLabels = {
      work: "Work Session",
      shortBreak: "Short Break",
      longBreak: "Long Break",
    }

    return <Badge className={cn("text-xs font-medium", badgeColors[mode])}>{sessionLabels[mode]}</Badge>
  }

  const handleManageTasks = () => {
    window.location.href = "/tasks"
  }

  const toggleFocusMode = () => {
    setIsFocusMode(!isFocusMode)
  }

  const toggleTaskSidebar = () => {
    setIsTaskSidebarCollapsed((previous) => !previous)
  }

  return (
    <>
      {isPremiumTheme && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className={cn("absolute inset-0", getPremiumBackground())} />
          <div className="absolute inset-0 backdrop-blur-3xl opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-background/90" />
          <div className="absolute inset-0 bg-noise opacity-5 mix-blend-overlay" />
        </div>
      )}

      {isFocusMode && (
        <div className="fixed inset-0 z-30">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
        </div>
      )}

      <div className={cn("flex h-full relative z-10", isPremiumTheme && "backdrop-blur-sm")}>
        {/* Main Timer Area */}
        <div className="flex-1 p-6 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl space-y-8">
            <div
              className={cn(
                "relative flex items-center justify-center p-8 rounded-3xl",
                getTimerSectionBackground(),
                isFocusMode && "z-40 relative", // Higher z-index for focus mode
              )}
            >
              <Button
                variant={isFocusMode ? "default" : "outline"}
                size="sm"
                onClick={toggleFocusMode}
                className={cn(
                  "absolute top-4 left-4 z-50 gap-2",
                  isFocusMode ? "bg-accent text-accent-foreground" : "bg-background/80 backdrop-blur-sm",
                )}
              >
                <Focus className="w-4 h-4" />
                Focus Mode
              </Button>

              <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-50">
                <Dialog open={isQuickSettingsOpen} onOpenChange={setIsQuickSettingsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 bg-background/80 backdrop-blur-sm"
                      aria-label="Open pomodoro settings"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm space-y-6">
                    <DialogHeader>
                      <DialogTitle className="text-base">Timer settings</DialogTitle>
                      <DialogDescription>Adjust your work and break durations.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="quick-work-duration">Work (minutes)</Label>
                        <Input
                          id="quick-work-duration"
                          type="number"
                          min={1}
                          max={60}
                          value={quickSettings.workDuration}
                          onChange={(event) => {
                            const parsed = Number.parseInt(event.target.value, 10)
                            handleQuickSettingChange("workDuration", parsed)
                          }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="quick-short-break">Short Break (minutes)</Label>
                        <Input
                          id="quick-short-break"
                          type="number"
                          min={1}
                          max={30}
                          value={quickSettings.shortBreak}
                          onChange={(event) => {
                            const parsed = Number.parseInt(event.target.value, 10)
                            handleQuickSettingChange("shortBreak", parsed)
                          }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="quick-long-break">Long Break (minutes)</Label>
                        <Input
                          id="quick-long-break"
                          type="number"
                          min={1}
                          max={60}
                          value={quickSettings.longBreak}
                          onChange={(event) => {
                            const parsed = Number.parseInt(event.target.value, 10)
                            handleQuickSettingChange("longBreak", parsed)
                          }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="quick-long-break-interval">Long Break Interval (sessions)</Label>
                        <Input
                          id="quick-long-break-interval"
                          type="number"
                          min={2}
                          max={10}
                          value={quickSettings.longBreakInterval}
                          onChange={(event) => {
                            const parsed = Number.parseInt(event.target.value, 10)
                            handleQuickSettingChange("longBreakInterval", parsed)
                          }}
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      These quick changes stay in sync with the full settings screen.
                    </p>
                    <div className="flex justify-end gap-2 pt-2 border-t border-border/60">
                      <Button variant="outline" onClick={handleQuickReset}>Reset</Button>
                      <Button onClick={handleQuickApply}>Apply</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                {isPremiumTheme && (
                  <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm border-white/20">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium Theme
                  </Badge>
                )}
              </div>

              {/* Circular Progress Timer */}
              <div className="relative flex items-center justify-center">
                <div className="relative w-80 h-80">
                  {isPremiumTheme && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 blur-3xl animate-pulse" />
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 blur-xl" />
                    </>
                  )}

                  <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-muted/20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                      className={cn(
                        "transition-all duration-1000 ease-in-out",
                        isPremiumTheme ? "text-accent drop-shadow-2xl filter brightness-110" : "text-accent",
                      )}
                      strokeLinecap="round"
                    />
                  </svg>

                  {/* Timer Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <div className="mb-3">{getSessionBadge()}</div>
                    <div
                      className={cn(
                        "text-6xl font-mono font-bold mb-2",
                        isPremiumTheme && "drop-shadow-2xl text-shadow-lg filter brightness-110",
                      )}
                    >
                      {formatTime(timeLeft)}
                    </div>
                    <div className="text-sm text-muted-foreground text-center">
                      {activeTask && (
                        <div className="space-y-1">
                          <div className="font-medium">{activeTask.title}</div>
                          <div className="flex items-center justify-center gap-2">
                            <div className={cn("w-2 h-2 rounded-full", getPriorityColor(activeTask.priority))} />
                            <span className="capitalize">{activeTask.priority} Priority</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className={cn("flex items-center justify-center gap-4", isFocusMode && "z-40 relative")}>
              <Button
                variant="outline"
                size="lg"
                onClick={handleReset}
                className="gap-2 bg-background/80 backdrop-blur-sm"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>

              <Button size="lg" onClick={isRunning ? handlePause : handleStart} className="gap-2 px-8">
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={handleSkip}
                className="gap-2 bg-background/80 backdrop-blur-sm"
              >
                <SkipForward className="w-4 h-4" />
                Skip
              </Button>
            </div>

            {!isFocusMode && (
              <>
                {/* Pro Features Hint */}
                {!isPro && !isPremiumTheme && (
                  <Card className="bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Crown className="w-5 h-5 text-accent" />
                          <div>
                            <p className="font-medium text-sm">Unlock Premium Timer Backgrounds</p>
                            <p className="text-xs text-muted-foreground">
                              Beautiful blurred, noisy backgrounds with premium themes
                            </p>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => setShowUpgradeModal(true)}>
                          <ProBadge />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {isPremiumTheme && (
                  <Card className="bg-gradient-to-r from-accent/10 to-secondary/10 border-accent/20 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        <Crown className="w-5 h-5 text-accent" />
                        <div className="text-center">
                          <p className="font-medium text-sm">Premium Experience Active</p>
                          <p className="text-xs text-muted-foreground">
                            Enjoying enhanced visuals with{" "}
                            {customTheme === "ocean"
                              ? "Ocean Breeze"
                              : customTheme === "sunset"
                                ? "Sunset Glow"
                                : customTheme === "forest"
                                  ? "Forest Green"
                                  : customTheme === "royal"
                                    ? "Royal Purple"
                                    : customTheme === "cherry"
                                      ? "Cherry Blossom"
                                      : customTheme === "midnight"
                                        ? "Midnight Blue"
                                        : "Premium"}{" "}
                            theme
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Session Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-accent">{completedPomodoros}</div>
                    <div className="text-sm text-muted-foreground">Today&apos;s Pomodoros</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{sessionCount}</div>
                    <div className="text-sm text-muted-foreground">Total Sessions</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">
                      {activeTask ? `${activeTask.completedPomodoros}/${activeTask.estimatedPomodoros}` : "0/0"}
                    </div>
                    <div className="text-sm text-muted-foreground">Task Progress</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {!isFocusMode && (
          <div
            className={cn(
              "relative flex h-full items-stretch border-l border-border transition-all duration-300 ease-in-out",
              isPremiumTheme ? "bg-card/95 backdrop-blur-md border-white/20 shadow-2xl" : "bg-card",
            )}
            style={{ width: isTaskSidebarCollapsed ? 56 : 376 }}
          >
            <div className="flex w-14 items-center justify-center">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={toggleTaskSidebar}
                className={cn(
                  "h-10 w-10 rounded-full border border-border bg-background/80 shadow-md transition-colors hover:bg-background",
                  isPremiumTheme && "border-white/30 bg-card/80 text-white hover:bg-card",
                )}
                aria-label={isTaskSidebarCollapsed ? "Expand active tasks panel" : "Collapse active tasks panel"}
                aria-expanded={!isTaskSidebarCollapsed}
                aria-controls="active-tasks-panel"
              >
                {isTaskSidebarCollapsed ? (
                  <ChevronsLeft className="h-4 w-4" />
                ) : (
                  <ChevronsRight className="h-4 w-4" />
                )}
              </Button>
            </div>
            <div
              id="active-tasks-panel"
              className={cn(
                "overflow-hidden border-l border-border transition-all duration-300 ease-in-out",
                isTaskSidebarCollapsed ? "pointer-events-none opacity-0" : "opacity-100",
                isPremiumTheme && "border-white/20",
              )}
              style={{ width: isTaskSidebarCollapsed ? 0 : 320 }}
              aria-hidden={isTaskSidebarCollapsed}
            >
              <div className="flex h-full flex-col space-y-6 p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Active Tasks</h2>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                <ScrollArea className="flex-1 min-h-0 max-h-[calc(100vh-320px)] pr-1">
                  <div className="space-y-3">
                    {mockTasks.map((task) => (
                      <Card
                        key={task.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md",
                          activeTaskId === task.id && "ring-2 ring-accent bg-accent/5",
                          isPremiumTheme && "bg-card/98 backdrop-blur-sm border-white/20 shadow-lg",
                        )}
                        onClick={() => setActiveTaskId(task.id)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <h3 className="text-sm font-medium leading-tight">{task.title}</h3>
                              <div className={cn("mt-1 h-2 w-2 rounded-full", getPriorityColor(task.priority))} />
                            </div>

                            <div className="flex items-center gap-2 text-xs">
                              <Clock className="h-3 w-3" />
                              <span className="font-medium text-foreground">
                                {task.completedPomodoros}/{task.estimatedPomodoros} Pomodoros
                              </span>
                            </div>

                            <Progress value={(task.completedPomodoros / task.estimatedPomodoros) * 100} className="h-1" />

                            <Badge variant="secondary" className="text-xs">
                              {task.priority} priority
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>

                <Separator />

                <div className="space-y-3">
                  <Button variant="outline" className="w-full gap-2 bg-transparent" onClick={handleManageTasks}>
                    <CheckSquare className="h-4 w-4" />
                    Manage Tasks
                  </Button>

                  {!isPro && (
                    <Button
                      variant="outline"
                      className="w-full gap-2 border-accent/50 text-accent hover:bg-accent/10 bg-transparent"
                      onClick={() => setShowUpgradeModal(true)}
                    >
                      <Crown className="h-4 w-4" />
                      Unlock Pro Timer
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        feature="Advanced Timer Features"
      />
    </>
  )
}

