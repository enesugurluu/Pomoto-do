"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type PomodoroSettings = {
  workDuration: number
  shortBreak: number
  longBreak: number
  longBreakInterval: number
  autoStartBreaks: boolean
  autoStartPomodoros: boolean
  soundEnabled: boolean
  volume: number
}

type PomodoroSettingsContextValue = {
  settings: PomodoroSettings
  updateSettings: (updates: Partial<PomodoroSettings>) => void
}

const DEFAULT_POMODORO_SETTINGS: PomodoroSettings = {
  workDuration: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  soundEnabled: true,
  volume: 70,
}

const STORAGE_KEY = "pomodoro-settings"

const PomodoroSettingsContext = createContext<PomodoroSettingsContextValue | null>(null)

export function PomodoroSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    if (typeof window === "undefined") {
      return DEFAULT_POMODORO_SETTINGS
    }

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (!stored) return DEFAULT_POMODORO_SETTINGS
      const parsed = JSON.parse(stored) as Partial<PomodoroSettings>
      return { ...DEFAULT_POMODORO_SETTINGS, ...parsed }
    } catch (error) {
      console.error("Failed to parse pomodoro settings from storage", error)
      return DEFAULT_POMODORO_SETTINGS
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch (error) {
      console.error("Failed to persist pomodoro settings", error)
    }
  }, [settings])

  const value = useMemo(
    () => ({
      settings,
      updateSettings: (updates: Partial<PomodoroSettings>) => {
        setSettings((prev) => ({ ...prev, ...updates }))
      },
    }),
    [settings],
  )

  return <PomodoroSettingsContext.Provider value={value}>{children}</PomodoroSettingsContext.Provider>
}

export function usePomodoroSettings() {
  const context = useContext(PomodoroSettingsContext)
  if (!context) {
    throw new Error("usePomodoroSettings must be used within a PomodoroSettingsProvider")
  }
  return context
}

export { DEFAULT_POMODORO_SETTINGS }
