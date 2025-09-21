"use client"

import { cn } from "@/lib/utils"
import { useRef, useState, type HTMLAttributes, type PointerEvent } from "react"

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  spotlightColor?: string
}

export function SpotlightCard({
  className,
  children,
  spotlightColor = "rgba(59, 130, 246, 0.45)",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const target = cardRef.current
    if (!target) return

    const rect = target.getBoundingClientRect()
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width)
    const y = Math.min(Math.max(event.clientY - rect.top, 0), rect.height)

    setPosition({ x, y })
    setActive(true)
  }

  const handlePointerLeave = () => {
    setActive(false)
  }

  const handleFocus = () => {
    const target = cardRef.current
    if (!target) return
    setPosition({ x: target.offsetWidth / 2, y: target.offsetHeight / 2 })
    setActive(true)
  }

  const handleBlur = () => {
    setActive(false)
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-6 shadow-lg shadow-primary/5 transition-colors duration-300",
        "backdrop-blur supports-[backdrop-filter]:bg-card/70",
        className,
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
        style={{
          opacity: active ? 1 : undefined,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
