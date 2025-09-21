"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface CanvasRevealEffectProps {
  animationSpeed?: number
  colors?: [number, number, number][]
  opacities?: number[]
  dotSize?: number
  showGradient?: boolean
  containerClassName?: string
  className?: string
}

export function CanvasRevealEffect({
  animationSpeed = 0.35,
  colors = [
    [59, 130, 246],
    [14, 165, 233],
    [147, 51, 234],
  ],
  opacities = [0.2, 0.25, 0.3, 0.35, 0.3, 0.25],
  dotSize = 3,
  showGradient = true,
  containerClassName,
  className,
}: CanvasRevealEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0
    let dots: Array<{
      x: number
      y: number
      color: [number, number, number]
      opacityBase: number
      phase: number
      speed: number
    }> = []

    const generateDots = () => {
      const totalDotsX = Math.ceil(width / (dotSize * 4))
      const totalDotsY = Math.ceil(height / (dotSize * 4))
      dots = Array.from({ length: totalDotsX * totalDotsY }, (_, index) => {
        const x = (index % totalDotsX) * dotSize * 4 + dotSize * 2
        const y = Math.floor(index / totalDotsX) * dotSize * 4 + dotSize * 2
        const color = colors[index % colors.length]
        const opacityBase = opacities[index % opacities.length]
        const phase = Math.random() * Math.PI * 2
        const speed = 0.6 + Math.random() * 0.8
        return { x, y, color, opacityBase, phase, speed }
      })
    }

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(bounds.width, 1)
      height = Math.max(bounds.height, 1)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      generateDots()
    }

    resize()
    window.addEventListener("resize", resize)

    const draw = (timestamp: number) => {
      ctx.clearRect(0, 0, width, height)

      for (const dot of dots) {
        const alpha = dot.opacityBase + (Math.sin(timestamp * 0.001 * animationSpeed * dot.speed + dot.phase) + 1) * 0.25
        ctx.fillStyle = `rgba(${dot.color[0]}, ${dot.color[1]}, ${dot.color[2]}, ${Math.min(alpha, 0.9)})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [animationSpeed, colors, dotSize, opacities])

  return (
    <div className={cn("relative h-full w-full", containerClassName, className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {showGradient ? <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent" /> : null}
    </div>
  )
}
