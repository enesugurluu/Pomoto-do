"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useCustomTheme } from "@/components/theme-provider"
import {
  Palette,
  User,
  Bell,
  Shield,
  Crown,
  Sun,
  Moon,
  Monitor,
  Shuffle,
  Check,
  Timer,
  Volume2,
  VolumeX,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  LogOut,
  Dices,
} from "lucide-react"

interface UserProfile {
  name: string
  email: string
  phone: string
  location: string
  bio: string
  company: string
  avatar: string
}

type ThemeColorSet = {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
}

interface RandomThemeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onApply: (themeName: string, colors: ThemeColorSet) => void
  onSave: (themeName: string, colors: ThemeColorSet) => void
}

function RandomThemeDialog({ open, onOpenChange, onApply, onSave }: RandomThemeDialogProps) {
  const [themeName, setThemeName] = useState("")
  const [randomColors, setRandomColors] = useState<ThemeColorSet>(() => generateRandomColors())

  function generateRandomColors(): ThemeColorSet {
    const hues = [Math.floor(Math.random() * 360), Math.floor(Math.random() * 360), Math.floor(Math.random() * 360)]

    return {
      primary: `hsl(${hues[0]}, ${60 + Math.random() * 30}%, ${45 + Math.random() * 15}%)`,
      secondary: `hsl(${hues[1]}, ${50 + Math.random() * 40}%, ${40 + Math.random() * 20}%)`,
      accent: `hsl(${hues[2]}, ${70 + Math.random() * 25}%, ${50 + Math.random() * 20}%)`,
      background: `hsl(${hues[0]}, ${20 + Math.random() * 20}%, ${8 + Math.random() * 7}%)`,
      foreground: `hsl(${hues[0]}, ${20 + Math.random() * 20}%, ${90 + Math.random() * 8}%)`,
    }
  }

  const handleRegenerateColors = () => {
    setRandomColors(generateRandomColors())
  }

  const handleApplyAndSave = () => {
    if (themeName.trim()) {
      onApply(themeName, randomColors)
      onOpenChange(false)
      setThemeName("")
      setRandomColors(generateRandomColors())
    }
  }

  const handleSave = () => {
    if (themeName.trim()) {
      onSave(themeName, randomColors)
      onOpenChange(false)
      setThemeName("")
      setRandomColors(generateRandomColors())
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    setThemeName("")
    setRandomColors(generateRandomColors())
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Random Theme Generated
            <Button variant="ghost" size="sm" onClick={handleRegenerateColors} className="ml-auto h-8 w-8 p-0">
              <Dices className="w-4 h-4" />
            </Button>
          </DialogTitle>
          <DialogDescription>
            A beautiful theme has been randomly generated for you. Give it a name and choose how to proceed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="theme-name">Theme Name</Label>
            <Input
              id="theme-name"
              placeholder="Enter a name for this theme..."
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Generated Colors</Label>
            <div className="p-4 rounded-lg border bg-muted/50">
              <div
                className="h-16 rounded-lg mb-3"
                style={{
                  background: `linear-gradient(to right, ${randomColors.primary}, ${randomColors.secondary}, ${randomColors.accent})`,
                }}
              />
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="text-center">
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: randomColors.primary }}
                  />
                  <span className="text-xs text-muted-foreground">Primary</span>
                </div>
                <div className="text-center">
                  <div
                    className="w-8 h-8 rounded-full mx-auto mb-1"
                    style={{ backgroundColor: randomColors.secondary }}
                  />
                  <span className="text-xs text-muted-foreground">Secondary</span>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full mx-auto mb-1" style={{ backgroundColor: randomColors.accent }} />
                  <span className="text-xs text-muted-foreground">Accent</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleSave} disabled={!themeName.trim()}>
            Save
          </Button>
          <Button onClick={handleApplyAndSave} disabled={!themeName.trim()}>
            Apply & Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function SettingsContent() {
  const { theme, setTheme } = useTheme()
  const { customTheme, setCustomTheme, isDevMode, addCustomTheme, customThemes } = useCustomTheme()
  const [isProUser] = useState(isDevMode)
  const [showRandomThemeDialog, setShowRandomThemeDialog] = useState(false)
  const [notifications, setNotifications] = useState({
    pomodoroComplete: true,
    breakReminder: true,
    dailyGoal: false,
    weeklyReport: true,
    taskDeadlines: true,
  })
  const [pomodoroSettings, setPomodoroSettings] = useState({
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    soundEnabled: true,
    volume: 70,
  })
  const [profile, setProfile] = useState<UserProfile>({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Productivity enthusiast and software developer passionate about efficient workflows.",
    company: "Tech Innovations Inc.",
    avatar: "/diverse-user-avatars.png",
  })

  const generateRandomTheme = () => {
    setShowRandomThemeDialog(true)
  }

  const handleRandomThemeApply = (themeName: string, colors: ThemeColorSet) => {
    const themeKey = themeName.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const newTheme = {
      name: themeKey,
      colors,
      isPremium: true,
    }
    console.log("[v0] Applying and saving theme:", themeKey, colors)
    addCustomTheme(newTheme)
    setCustomTheme(themeKey)
  }

  const handleRandomThemeSave = (themeName: string, colors: ThemeColorSet) => {
    const themeKey = themeName.toLowerCase().replace(/[^a-z0-9]/g, "-")
    const newTheme = {
      name: themeKey,
      colors,
      isPremium: true,
    }
    console.log("[v0] Saving theme:", themeKey, colors)
    addCustomTheme(newTheme)
  }

  const handleExitToLogin = () => {
    window.location.href = "/login"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance text-foreground">Settings</h1>
          <p className="text-muted-foreground text-pretty">Customize your PomoTo-do experience</p>
        </div>
        <div className="flex items-center gap-3">
          {!isProUser && (
            <Button className="gap-2">
              <Crown className="w-4 h-4" />
              Upgrade to Pro
            </Button>
          )}
          <Button variant="outline" onClick={handleExitToLogin} className="gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Exit
          </Button>
        </div>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="pomodoro">Pomodoro</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Theme Selection
              </CardTitle>
              <CardDescription>Choose your preferred color scheme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Color Mode</Label>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    onClick={() => setTheme("light")}
                    className="flex flex-col gap-2 h-auto p-4"
                  >
                    <Sun className="w-5 h-5" />
                    <span>Light</span>
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    onClick={() => setTheme("dark")}
                    className="flex flex-col gap-2 h-auto p-4"
                  >
                    <Moon className="w-5 h-5" />
                    <span>Dark</span>
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    onClick={() => setTheme("system")}
                    className="flex flex-col gap-2 h-auto p-4"
                  >
                    <Monitor className="w-5 h-5" />
                    <span>System</span>
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Color Themes</Label>
                  {isProUser ? (
                    <Button variant="outline" size="sm" onClick={generateRandomTheme} className="gap-2 bg-transparent">
                      <Shuffle className="w-4 h-4" />
                      Random Theme
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="gap-1">
                      <Crown className="w-3 h-3" />
                      PRO
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div
                    className={cn(
                      "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                      customTheme === "default" ? "border-primary" : "border-border hover:border-muted-foreground",
                    )}
                    onClick={() => setCustomTheme("default")}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-primary rounded-full" />
                        <div className="w-4 h-4 bg-secondary rounded-full" />
                        <div className="w-4 h-4 bg-accent rounded-full" />
                      </div>
                      <div className="text-sm font-medium">Default</div>
                      <div className="text-xs text-muted-foreground">Classic theme</div>
                    </div>
                    {customTheme === "default" && <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />}
                  </div>

                  {customThemes
                    .filter((theme) => theme.name !== "default")
                    .map((theme) => (
                      <div
                        key={theme.name}
                        className={cn(
                          "relative p-4 rounded-lg border-2 cursor-pointer transition-all",
                          customTheme === theme.name ? "border-primary" : "border-border hover:border-muted-foreground",
                        )}
                        onClick={() => setCustomTheme(theme.name)}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.primary }} />
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.secondary }} />
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.accent }} />
                          </div>
                          <div className="text-sm font-medium capitalize">{theme.name.replace(/-/g, " ")}</div>
                          <div className="text-xs text-muted-foreground">
                            {theme.isPremium && <Crown className="w-3 h-3 inline mr-1" />}
                            {theme.isPremium ? "Premium" : "Custom"}
                          </div>
                        </div>
                        {customTheme === theme.name && (
                          <Check className="absolute top-2 right-2 w-4 h-4 text-primary" />
                        )}
                      </div>
                    ))}
                </div>

                {!isProUser && (
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Unlock premium themes and the random theme generator
                    </p>
                    <Button size="sm" className="gap-2">
                      <Crown className="w-4 h-4" />
                      Upgrade to Pro
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pomodoro" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                Pomodoro Settings
              </CardTitle>
              <CardDescription>Customize your focus sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="work-duration">Work Duration (minutes)</Label>
                  <Input
                    id="work-duration"
                    type="number"
                    min="1"
                    max="60"
                    value={pomodoroSettings.workDuration}
                    onChange={(e) =>
                      setPomodoroSettings((prev) => ({
                        ...prev,
                        workDuration: Number.parseInt(e.target.value) || 25,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="short-break">Short Break (minutes)</Label>
                  <Input
                    id="short-break"
                    type="number"
                    min="1"
                    max="30"
                    value={pomodoroSettings.shortBreak}
                    onChange={(e) =>
                      setPomodoroSettings((prev) => ({
                        ...prev,
                        shortBreak: Number.parseInt(e.target.value) || 5,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="long-break">Long Break (minutes)</Label>
                  <Input
                    id="long-break"
                    type="number"
                    min="1"
                    max="60"
                    value={pomodoroSettings.longBreak}
                    onChange={(e) =>
                      setPomodoroSettings((prev) => ({
                        ...prev,
                        longBreak: Number.parseInt(e.target.value) || 15,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="long-break-interval">Long Break Interval</Label>
                  <Input
                    id="long-break-interval"
                    type="number"
                    min="2"
                    max="10"
                    value={pomodoroSettings.longBreakInterval}
                    onChange={(e) =>
                      setPomodoroSettings((prev) => ({
                        ...prev,
                        longBreakInterval: Number.parseInt(e.target.value) || 4,
                      }))
                    }
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-start breaks</Label>
                    <p className="text-sm text-muted-foreground">Automatically start break timers</p>
                  </div>
                  <Switch
                    checked={pomodoroSettings.autoStartBreaks}
                    onCheckedChange={(checked) =>
                      setPomodoroSettings((prev) => ({
                        ...prev,
                        autoStartBreaks: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-start pomodoros</Label>
                    <p className="text-sm text-muted-foreground">Automatically start work sessions after breaks</p>
                  </div>
                  <Switch
                    checked={pomodoroSettings.autoStartPomodoros}
                    onCheckedChange={(checked) =>
                      setPomodoroSettings((prev) => ({
                        ...prev,
                        autoStartPomodoros: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound notifications</Label>
                    <p className="text-sm text-muted-foreground">Play sound when timer completes</p>
                  </div>
                  <Switch
                    checked={pomodoroSettings.soundEnabled}
                    onCheckedChange={(checked) =>
                      setPomodoroSettings((prev) => ({
                        ...prev,
                        soundEnabled: checked,
                      }))
                    }
                  />
                </div>

                {pomodoroSettings.soundEnabled && (
                  <div className="space-y-2">
                    <Label>Volume</Label>
                    <div className="flex items-center gap-4">
                      <VolumeX className="w-4 h-4 text-muted-foreground" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={pomodoroSettings.volume}
                        onChange={(e) =>
                          setPomodoroSettings((prev) => ({
                            ...prev,
                            volume: Number.parseInt(e.target.value),
                          }))
                        }
                        className="flex-1"
                      />
                      <Volume2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground w-8">{pomodoroSettings.volume}%</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Choose what notifications you&apos;d like to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Pomodoro complete</Label>
                  <p className="text-sm text-muted-foreground">Notify when work session ends</p>
                </div>
                <Switch
                  checked={notifications.pomodoroComplete}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      pomodoroComplete: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Break reminders</Label>
                  <p className="text-sm text-muted-foreground">Remind to take breaks</p>
                </div>
                <Switch
                  checked={notifications.breakReminder}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      breakReminder: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily goal achievements</Label>
                  <p className="text-sm text-muted-foreground">Celebrate when you reach daily goals</p>
                </div>
                <Switch
                  checked={notifications.dailyGoal}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      dailyGoal: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly reports</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly productivity summaries</p>
                </div>
                <Switch
                  checked={notifications.weeklyReport}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      weeklyReport: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Task deadlines</Label>
                  <p className="text-sm text-muted-foreground">Alert for upcoming task due dates</p>
                </div>
                <Switch
                  checked={notifications.taskDeadlines}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      taskDeadlines: checked,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Camera className="w-4 h-4" />
                  Change Photo
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={profile.email}
                      onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      className="pl-10"
                      value={profile.phone}
                      onChange={(e) => setProfile((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="location"
                      className="pl-10"
                      value={profile.location}
                      onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="company"
                      className="pl-10"
                      value={profile.company}
                      onChange={(e) => setProfile((prev) => ({ ...prev, company: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account & Security
              </CardTitle>
              <CardDescription>Manage your account settings and security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Subscription Status</h4>
                    <p className="text-sm text-muted-foreground">
                      {isProUser ? "Pro Plan - All features unlocked" : "Free Plan - Limited features"}
                    </p>
                  </div>
                  <Badge variant={isProUser ? "default" : "secondary"} className="gap-1">
                    <Crown className="w-3 h-3" />
                    {isProUser ? "PRO" : "FREE"}
                  </Badge>
                </div>

                {!isProUser && (
                  <div className="text-center p-6 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg border">
                    <Crown className="w-12 h-12 text-accent mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upgrade to Pro</h3>
                    <p className="text-muted-foreground mb-4">
                      Unlock advanced analytics, premium themes, global rankings, and more
                    </p>
                    <Button size="lg" className="gap-2">
                      <Crown className="w-4 h-4" />
                      Upgrade Now
                    </Button>
                  </div>
                )}

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Security Settings</h4>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Connected Accounts
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Data & Privacy</h4>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Privacy Settings
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <RandomThemeDialog
        open={showRandomThemeDialog}
        onOpenChange={setShowRandomThemeDialog}
        onApply={handleRandomThemeApply}
        onSave={handleRandomThemeSave}
      />
    </div>
  )
}









