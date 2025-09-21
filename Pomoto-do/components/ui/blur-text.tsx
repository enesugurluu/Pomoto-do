"use client"

import { motion } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"
import type { CSSProperties } from "react"

import { cn } from "@/lib/utils"

type AnimationSnapshot = Record<string, string | number | undefined>

interface BlurTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string
  delay?: number
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom"
  threshold?: number
  rootMargin?: string
  animationFrom?: AnimationSnapshot
  animationTo?: AnimationSnapshot[]
  easing?: (value: number) => number
  onAnimationComplete?: () => void
  stepDuration?: number
}

const buildKeyframes = (from: AnimationSnapshot, steps: AnimationSnapshot[]) => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((step) => Object.keys(step)),
  ])

  const keyframes: Record<string, Array<string | number | undefined>> = {}

  keys.forEach((key) => {
    keyframes[key] = [from[key], ...steps.map((step) => step[key])]
  })

  return keyframes
}

export function BlurText({
  text,
  delay = 200,
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (value) => value,
  onAnimationComplete,
  stepDuration = 0.35,
  className,
  style,
  ...rest
}: BlurTextProps) {
  const segments = animateBy === "words" ? text.split(" ") : text.split("")
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const target = containerRef.current
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(target)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(target)

    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo<AnimationSnapshot>(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  )

  const defaultTo = useMemo<AnimationSnapshot[]>(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  )

  const fromSnapshot = animationFrom ?? defaultFrom
  const toSnapshots = animationTo ?? defaultTo

  const stepCount = toSnapshots.length + 1
  const totalDuration = stepDuration * Math.max(stepCount - 1, 1)
  const times = useMemo(() => {
    if (stepCount <= 1) return [0]
    return Array.from({ length: stepCount }, (_, index) => index / (stepCount - 1))
  }, [stepCount])

  const keyframes = useMemo(() => buildKeyframes(fromSnapshot, toSnapshots), [fromSnapshot, toSnapshots])

  const combinedStyle: CSSProperties = {
    display: "inline-flex",
    flexWrap: "wrap",
    ...style,
  }

  return (
    <span ref={containerRef} className={cn("inline-flex flex-wrap", className)} style={combinedStyle} {...rest}>
      {segments.map((segment, index) => {
        const transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        }

        return (
          <motion.span
            key={index}
            className="inline-block will-change-[transform,filter,opacity]"
            initial={fromSnapshot}
            animate={inView ? keyframes : fromSnapshot}
            transition={transition}
            onAnimationComplete={index === segments.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < segments.length - 1 ? "\u00A0" : null}
          </motion.span>
        )
      })}
    </span>
  )
}

