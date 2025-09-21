"use client"

import { cn } from "@/lib/utils"
import { motion, type MotionStyle, type Transition } from "motion/react"
import type { CSSProperties } from "react"

interface BorderBeamProps {
  /** Size of the beam path in pixels. */
  size?: number
  /** Animation duration in seconds. */
  duration?: number
  /** Animation delay in seconds. */
  delay?: number
  /** Gradient start color. */
  colorFrom?: string
  /** Gradient end color. */
  colorTo?: string
  /** Additional transition overrides. */
  transition?: Transition
  /** Additional class names for the beam element. */
  className?: string
  /** Inline styles for the beam element. */
  style?: CSSProperties
  /** Reverse the animation direction. */
  reverse?: boolean
  /** Initial offset position (0-100). */
  initialOffset?: number
  /** Border width in pixels. */
  borderWidth?: number
}

export function BorderBeam({
  className,
  size = 64,
  delay = 0,
  duration = 6,
  colorFrom = "#22d3ee",
  colorTo = "#a855f7",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}: BorderBeamProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] border-(length:--border-beam-width)"
      style={{ "--border-beam-width": `${borderWidth}px` } as CSSProperties}
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className,
        )}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          ...style,
        } as MotionStyle}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  )
}

