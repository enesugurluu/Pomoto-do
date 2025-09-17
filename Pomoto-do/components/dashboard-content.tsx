"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ProFeatureCard } from "./pro-feature-card"
import { UpgradeModal } from "./upgrade-modal"
import {
  Timer,
  CheckSquare,
  TrendingUp,
  Crown,
  Lock,
  BarChart3,
  Target,
  Flame,
  Calendar,
  Clock,
  Trophy,
  Users,
  Zap,
  Activity,
  PieChart,
  Code,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for analytics
const weeklyData = [
  { day: "Mon", pomodoros: 6, tasks: 4 },
  { day: "Tue", pomodoros: 8, tasks: 6 },
  { day: "Wed", pomodoros: 5, tasks: 3 },
  { day: "Thu", pomodoros: 9, tasks: 7 },
  { day: "Fri", pomodoros: 7, tasks: 5 },
  { day: "Sat", pomodoros: 3, tasks: 2 },
  { day: "Sun", pomodoros: 4, tasks: 3 },
]

const generateContributionData = () => {
  const data = []
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - 84) // 12 weeks ago

  for (let i = 0; i < 84; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const pomodoros = Math.floor(Math.random() * 12) // 0-11 pomodoros per day
    data.push({
      date: date.toISOString().split("T")[0],
      pomodoros,
      level: pomodoros === 0 ? 0 : pomodoros <= 2 ? 1 : pomodoros <= 5 ? 2 : pomodoros <= 8 ? 3 : 4,
    })
  }
  return data
}

const contributionData = generateContributionData()

const leaderboardData = [
  { rank: 1, name: "Sarah Chen", avatar: "/diverse-user-avatars.png", pomodoros: 156, streak: 12 },
  { rank: 2, name: "Alex Rodriguez", avatar: "/diverse-user-avatars.png", pomodoros: 142, streak: 8 },
  { rank: 3, name: "John Doe", avatar: "/diverse-user-avatars.png", pomodoros: 138, streak: 7 },
  { rank: 4, name: "Emma Wilson", avatar: "/diverse-user-avatars.png", pomodoros: 134, streak: 15 },
  { rank: 5, name: "Michael Kim", avatar: "/diverse-user-avatars.png", pomodoros: 129, streak: 5 },
]

const projectData = [
  { name: "Client Project A", pomodoros: 45, percentage: 35, color: "bg-blue-500" },
  { name: "Design System", pomodoros: 32, percentage: 25, color: "bg-green-500" },
  { name: "Documentation", pomodoros: 28, percentage: 22, color: "bg-purple-500" },
  { name: "Personal", pomodoros: 23, percentage: 18, color: "bg-orange-500" },
]

interface DashboardContentProps {
  isPro?: boolean
  isDeveloperMode?: boolean
}

export function DashboardContent({ isPro = false, isDeveloperMode = false }: DashboardContentProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [developerMode, setDeveloperMode] = useState(true)

  const hasProAccess = isPro || developerMode

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Good morning, John!</h1>
            <p className="text-muted-foreground text-pretty">Ready to boost your productivity with PomoTo-do today?</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={developerMode ? "default" : "outline"}
              size="sm"
              onClick={() => setDeveloperMode(!developerMode)}
              className="gap-2"
            >
              <Code className="w-4 h-4" />
              {developerMode ? "Dev Mode ON" : "Dev Mode"}
            </Button>
            {!isPro && !developerMode && (
              <Button className="gap-2" onClick={() => setShowUpgradeModal(true)}>
                <Crown className="w-4 h-4" />
                Upgrade to Pro
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className={cn(!hasProAccess && "opacity-50")}>
              Analytics {!hasProAccess && <Lock className="w-3 h-3 ml-1" />}
            </TabsTrigger>
            <TabsTrigger value="social" className={cn(!hasProAccess && "opacity-50")}>
              Social {!hasProAccess && <Lock className="w-3 h-3 ml-1" />}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Today's Pomodoros</CardTitle>
                  <Timer className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4</div>
                  <p className="text-xs text-muted-foreground">+2 from yesterday</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                  <CheckSquare className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">3 pending tasks</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
                  <TrendingUp className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">68%</div>
                  <Progress value={68} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                  <Flame className="w-4 h-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-500">7</div>
                  <p className="text-xs text-muted-foreground">days in a row</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Productivity Activity
                </CardTitle>
                <CardDescription>Your daily Pomodoro sessions over the last 12 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <TooltipProvider>
                    <div className="grid grid-cols-12 gap-1">
                      {contributionData.map((day, index) => (
                        <Tooltip key={day.date}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "w-3 h-3 rounded-sm transition-colors cursor-pointer hover:ring-2 hover:ring-accent hover:ring-offset-1",
                                day.level === 0 && "bg-muted",
                                day.level === 1 && "bg-green-200 dark:bg-green-900",
                                day.level === 2 && "bg-green-300 dark:bg-green-700",
                                day.level === 3 && "bg-green-400 dark:bg-green-600",
                                day.level === 4 && "bg-green-500 dark:bg-green-500",
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-medium">
                              {day.pomodoros === 0
                                ? "No pomodoros"
                                : day.pomodoros === 1
                                  ? "1 pomodoro"
                                  : `${day.pomodoros} pomodoros`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(day.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                  </TooltipProvider>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Less</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-muted rounded-sm" />
                      <div className="w-3 h-3 bg-green-200 dark:bg-green-900 rounded-sm" />
                      <div className="w-3 h-3 bg-green-300 dark:bg-green-700 rounded-sm" />
                      <div className="w-3 h-3 bg-green-400 dark:bg-green-600 rounded-sm" />
                      <div className="w-3 h-3 bg-green-500 dark:bg-green-500 rounded-sm" />
                    </div>
                    <span>More</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{contributionData.reduce((sum, day) => sum + day.pomodoros, 0)}</span>{" "}
                    pomodoros in the last 12 weeks
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Completed "Update documentation" task</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Finished 25-minute work session</span>
                    <span className="text-xs text-muted-foreground ml-auto">3 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-sm">Created new task "Client meeting preparation"</span>
                    <span className="text-xs text-muted-foreground ml-auto">5 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <span className="text-sm">Started 7-day productivity streak</span>
                    <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pro Features Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProFeatureCard
                title="Detailed Analytics"
                description="Get insights into your productivity patterns and optimize your workflow"
                featureName="Advanced Analytics"
                isLocked={!hasProAccess}
              >
                <div className="flex items-center justify-center h-32 bg-muted/50 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-muted-foreground" />
                </div>
              </ProFeatureCard>

              <ProFeatureCard
                title="Global Rankings"
                description="Compete with users worldwide and climb the productivity leaderboard"
                featureName="Global Rankings"
                isLocked={!hasProAccess}
              >
                <div className="flex items-center justify-center h-32 bg-muted/50 rounded-lg">
                  <Trophy className="w-8 h-8 text-muted-foreground" />
                </div>
              </ProFeatureCard>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {!hasProAccess ? (
              <ProFeatureCard
                title="Advanced Analytics"
                description="Unlock detailed productivity insights, time tracking, and performance metrics"
                featureName="Advanced Analytics"
                className="min-h-[400px]"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Total Pomodoros</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,247</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Completion Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Best Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">23 days</div>
                    </CardContent>
                  </Card>
                </div>
              </ProFeatureCard>
            ) : (
              <div className="space-y-6">
                {/* Detailed Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Pomodoros</CardTitle>
                      <Timer className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,247</div>
                      <p className="text-xs text-muted-foreground">+23 this week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                      <Target className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">87%</div>
                      <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Best Streak</CardTitle>
                      <Flame className="w-4 h-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-orange-500">23</div>
                      <p className="text-xs text-muted-foreground">days in a row</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Avg. Daily Focus</CardTitle>
                      <Zap className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3.2h</div>
                      <p className="text-xs text-muted-foreground">7.8 pomodoros/day</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Project Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="w-5 h-5" />
                      Time Distribution by Project
                    </CardTitle>
                    <CardDescription>Where you spend your focused time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {projectData.map((project) => (
                        <div key={project.name} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{project.name}</span>
                            <span className="text-muted-foreground">{project.pomodoros} pomodoros</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-muted rounded-full h-2">
                              <div
                                className={cn("h-2 rounded-full transition-all duration-500", project.color)}
                                style={{ width: `${project.percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-muted-foreground w-8">{project.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Productivity Heatmap */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Most Productive Hours
                    </CardTitle>
                    <CardDescription>Your peak performance times throughout the day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-12 gap-1">
                      {Array.from({ length: 24 }, (_, hour) => {
                        const intensity = Math.random() * 100
                        return (
                          <div
                            key={hour}
                            className={cn(
                              "aspect-square rounded text-xs flex items-center justify-center text-white font-medium",
                              intensity > 75
                                ? "bg-green-600"
                                : intensity > 50
                                  ? "bg-green-500"
                                  : intensity > 25
                                    ? "bg-green-400"
                                    : "bg-muted",
                            )}
                          >
                            {hour}
                          </div>
                        )
                      })}
                    </div>
                    <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                      <span>Less productive</span>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-muted rounded" />
                        <div className="w-3 h-3 bg-green-400 rounded" />
                        <div className="w-3 h-3 bg-green-500 rounded" />
                        <div className="w-3 h-3 bg-green-600 rounded" />
                      </div>
                      <span>More productive</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            {!hasProAccess ? (
              <ProFeatureCard
                title="Global Rankings"
                description="Compete with users worldwide and climb the productivity leaderboard"
                featureName="Global Rankings"
                className="min-h-[400px]"
              >
                <div className="space-y-4">
                  {[1, 2, 3].map((rank) => (
                    <div key={rank} className="flex items-center gap-4">
                      <div className="text-lg font-bold">#{rank}</div>
                      <Avatar>
                        <AvatarFallback>U{rank}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">User {rank}</div>
                        <div className="text-sm text-muted-foreground">150+ pomodoros</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ProFeatureCard>
            ) : (
              <div className="space-y-6">
                {/* Your Ranking */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-500" />
                      Your Global Ranking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-yellow-500">#3</div>
                      <div className="flex-1">
                        <div className="text-lg font-semibold">John Doe</div>
                        <div className="text-muted-foreground">138 pomodoros this month</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-sm">7-day streak</span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +2 positions
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Leaderboard */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Global Leaderboard
                    </CardTitle>
                    <CardDescription>Top performers this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboardData.map((user) => (
                        <div
                          key={user.rank}
                          className={cn(
                            "flex items-center gap-4 p-3 rounded-lg transition-colors",
                            user.name === "John Doe" && "bg-accent/10 border border-accent/20",
                          )}
                        >
                          <div
                            className={cn(
                              "text-lg font-bold w-8 text-center",
                              user.rank === 1 && "text-yellow-500",
                              user.rank === 2 && "text-gray-400",
                              user.rank === 3 && "text-amber-600",
                            )}
                          >
                            #{user.rank}
                          </div>
                          <Avatar>
                            <AvatarImage src={user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground">{user.pomodoros} pomodoros</div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-sm">
                              <Flame className="w-3 h-3 text-orange-500" />
                              <span>{user.streak} days</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} />
    </>
  )
}
