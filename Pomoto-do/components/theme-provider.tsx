"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { createContext, useContext, useEffect, useState } from "react"

interface CustomTheme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
  isPremium?: boolean
}

interface CustomThemeContextType {
  customTheme: string
  setCustomTheme: (theme: string) => void
  isDevMode: boolean
  setIsDevMode: (mode: boolean) => void
  customThemes: CustomTheme[]
  addCustomTheme: (theme: CustomTheme) => void
  getThemeColors: (themeName: string) => CustomTheme["colors"] | null
}

const CustomThemeContext = createContext<CustomThemeContextType | undefined>(undefined)

const predefinedThemes: CustomTheme[] = [
  {
    name: "ocean",
    colors: {
      primary: "hsl(200, 100%, 50%)",
      secondary: "hsl(180, 100%, 40%)",
      accent: "hsl(220, 100%, 60%)",
      background: "hsl(210, 100%, 5%)",
      foreground: "hsl(210, 100%, 95%)",
    },
    isPremium: true,
  },
  {
    name: "sunset",
    colors: {
      primary: "hsl(15, 100%, 60%)",
      secondary: "hsl(35, 100%, 50%)",
      accent: "hsl(350, 100%, 65%)",
      background: "hsl(20, 50%, 8%)",
      foreground: "hsl(20, 50%, 95%)",
    },
    isPremium: true,
  },
  {
    name: "forest",
    colors: {
      primary: "hsl(120, 60%, 45%)",
      secondary: "hsl(90, 50%, 40%)",
      accent: "hsl(140, 70%, 50%)",
      background: "hsl(120, 30%, 8%)",
      foreground: "hsl(120, 30%, 95%)",
    },
    isPremium: true,
  },
  {
    name: "royal",
    colors: {
      primary: "hsl(260, 80%, 60%)",
      secondary: "hsl(280, 70%, 55%)",
      accent: "hsl(300, 85%, 65%)",
      background: "hsl(270, 40%, 8%)",
      foreground: "hsl(270, 40%, 95%)",
    },
    isPremium: true,
  },
  {
    name: "cherry",
    colors: {
      primary: "hsl(350, 85%, 60%)",
      secondary: "hsl(10, 80%, 55%)",
      accent: "hsl(330, 90%, 65%)",
      background: "hsl(350, 30%, 8%)",
      foreground: "hsl(350, 30%, 95%)",
    },
    isPremium: true,
  },
  {
    name: "midnight",
    colors: {
      primary: "hsl(220, 70%, 55%)",
      secondary: "hsl(240, 60%, 50%)",
      accent: "hsl(200, 80%, 60%)",
      background: "hsl(230, 50%, 5%)",
      foreground: "hsl(230, 50%, 95%)",
    },
    isPremium: true,
  },
]

export function useCustomTheme() {
  const context = useContext(CustomThemeContext)
  if (!context) {
    throw new Error("useCustomTheme must be used within a CustomThemeProvider")
  }
  return context
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [customTheme, setCustomTheme] = useState("default")
  const [isDevMode, setIsDevMode] = useState(true)
  const [customThemes, setCustomThemes] = useState<CustomTheme[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("custom-themes")
      const userThemes = saved ? JSON.parse(saved) : []
      return [...predefinedThemes, ...userThemes]
    }
    return predefinedThemes
  })

  const addCustomTheme = (theme: CustomTheme) => {
    const existingThemeIndex = customThemes.findIndex((t) => t.name === theme.name)
    let newThemes: CustomTheme[]

    if (existingThemeIndex >= 0) {
      newThemes = [...customThemes]
      newThemes[existingThemeIndex] = theme
    } else {
      newThemes = [...customThemes, theme]
    }

    setCustomThemes(newThemes)

    const userThemes = newThemes.filter((t) => !predefinedThemes.find((p) => p.name === t.name))
    localStorage.setItem("custom-themes", JSON.stringify(userThemes))

    console.log("[v0] Theme saved:", theme.name, "Total themes:", newThemes.length)
  }

  const getThemeColors = (themeName: string): CustomTheme["colors"] | null => {
    const theme = customThemes.find((t) => t.name === themeName)
    return theme ? theme.colors : null
  }

  useEffect(() => {
    const root = document.documentElement

    customThemes.forEach((theme) => {
      root.classList.remove(`theme-${theme.name}`)
    })

    if (customTheme !== "default") {
      root.classList.add(`theme-${customTheme}`)

      const colors = getThemeColors(customTheme)
      if (colors) {
        root.style.setProperty("--theme-primary", colors.primary)
        root.style.setProperty("--theme-secondary", colors.secondary)
        root.style.setProperty("--theme-accent", colors.accent)
        root.style.setProperty("--theme-background", colors.background)
        root.style.setProperty("--theme-foreground", colors.foreground)
      }
    } else {
      root.style.removeProperty("--theme-primary")
      root.style.removeProperty("--theme-secondary")
      root.style.removeProperty("--theme-accent")
      root.style.removeProperty("--theme-background")
      root.style.removeProperty("--theme-foreground")
    }
  }, [customTheme, customThemes])

  return (
    <CustomThemeContext.Provider
      value={{
        customTheme,
        setCustomTheme,
        isDevMode,
        setIsDevMode,
        customThemes,
        addCustomTheme,
        getThemeColors,
      }}
    >
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </CustomThemeContext.Provider>
  )
}
