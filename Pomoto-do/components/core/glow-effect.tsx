"use client"

import { cn } from "@/lib/utils"
import type { CSSProperties, HTMLAttributes } from "react"

const blurVariants: Record<GlowEffectProps["blur"], string> = {
  soft: "blur-2xl",
  strong: "blur-[60px]",
  none: "",
}

export interface GlowEffectProps extends HTMLAttributes<HTMLDivElement> {
  colors?: string[]
  mode?: "colorShift" | "pulse"
  blur?: "soft" | "strong" | "none"
  duration?: number
  scale?: number
}

export function GlowEffect({
  colors = ["#6366f1", "#8b5cf6", "#22d3ee", "#f472b6"],
  mode = "colorShift",
  blur = "soft",
  duration = 4,
  scale = 1,
  className,
  style,
  ...props
}: GlowEffectProps) {
  const gradient = `conic-gradient(from 0deg, ${colors.join(", ")})`
  const animationClass = mode === "pulse" ? "animate-glow-pulse" : "animate-glow-rotate"

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 flex items-center justify-center",
        blurVariants[blur],
        animationClass,
        className,
      )}
      style={{
        "--glow-duration": `${duration}s`,
        "--glow-scale": scale,
        background: gradient,
        ...style,
      } as CSSProperties}
      {...props}
    />
  )
}
