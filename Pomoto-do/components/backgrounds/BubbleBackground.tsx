"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, type SpringOptions } from "motion/react"

import { cn } from "@/lib/utils"

type BubbleColors = {
  first: string
  second: string
  third: string
  fourth: string
  fifth: string
  sixth: string
}

export interface BubbleBackgroundProps extends React.ComponentProps<"div"> {
  interactive?: boolean
  transition?: SpringOptions
  colors?: Partial<BubbleColors>
}

const DEFAULT_COLORS: BubbleColors = {
  first: "21,128,61", // primary
  second: "132,204,22", // accent
  third: "56,189,248", // sky highlight
  fourth: "14,165,233", // vivid cyan
  fifth: "34,197,94", // emerald glow
  sixth: "125,211,252", // frost overlay
}

export const BubbleBackground = React.forwardRef<HTMLDivElement, BubbleBackgroundProps>(
  (
    {
      className,
      children,
      interactive = false,
      transition = { stiffness: 100, damping: 20 },
      colors,
      style,
      ...props
    },
    ref,
  ) => {
    const mergedColors = React.useMemo(() => ({
      ...DEFAULT_COLORS,
      ...colors,
    }), [colors])

    const containerRef = React.useRef<HTMLDivElement>(null)
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, transition)
    const springY = useSpring(mouseY, transition)

    React.useEffect(() => {
      if (!interactive) return
      const node = containerRef.current
      if (!node) return

      const handleMouseMove = (event: MouseEvent) => {
        const rect = node.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(event.clientX - centerX)
        mouseY.set(event.clientY - centerY)
      }

      const resetPointer = () => {
        mouseX.set(0)
        mouseY.set(0)
      }

      node.addEventListener("mousemove", handleMouseMove)
      node.addEventListener("mouseleave", resetPointer)

      return () => {
        node.removeEventListener("mousemove", handleMouseMove)
        node.removeEventListener("mouseleave", resetPointer)
      }
    }, [interactive, mouseX, mouseY])

    const filterId = React.useId()

    const colorVariables = React.useMemo(
      () => ({
        ["--bubble-color-first" as const]: mergedColors.first,
        ["--bubble-color-second" as const]: mergedColors.second,
        ["--bubble-color-third" as const]: mergedColors.third,
        ["--bubble-color-fourth" as const]: mergedColors.fourth,
        ["--bubble-color-fifth" as const]: mergedColors.fifth,
        ["--bubble-color-sixth" as const]: mergedColors.sixth,
      }),
      [mergedColors],
    )

    return (
      <div
        ref={containerRef}
        data-slot="bubble-background"
        className={cn(
          "relative isolate overflow-hidden bg-gradient-to-br from-primary/20 via-background to-background",
          className,
        )}
        style={{
          ...colorVariables,
          ...style,
        }}
        {...props}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-0 top-0 h-0 w-0">
          <defs>
            <filter id={filterId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <div className="absolute inset-0" style={{ filter: `url(#${filterId}) blur(40px)` }}>
          <motion.div
            className="absolute left-[10%] top-[10%] size-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--bubble-color-first),0.8)_0%,rgba(var(--bubble-color-first),0)_55%)] mix-blend-hard-light"
            animate={{ y: [-50, 60, -50] }}
            transition={{ duration: 30, ease: "easeInOut", repeat: Infinity }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center origin-[calc(50%-320px)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 26, ease: "linear", repeat: Infinity }}
          >
            <div className="size-[75%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--bubble-color-second),0.75)_0%,rgba(var(--bubble-color-second),0)_52%)] mix-blend-hard-light" />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center origin-[calc(50%+360px)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 42, ease: "linear", repeat: Infinity }}
          >
            <div className="absolute left-[calc(50%-420px)] top-[calc(50%+160px)] size-[78%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--bubble-color-third),0.7)_0%,rgba(var(--bubble-color-third),0)_52%)] mix-blend-hard-light" />
          </motion.div>

          <motion.div
            className="absolute left-[8%] top-[8%] size-[82%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--bubble-color-fourth),0.65)_0%,rgba(var(--bubble-color-fourth),0)_55%)] mix-blend-hard-light opacity-70"
            animate={{ x: [-60, 40, -60] }}
            transition={{ duration: 36, ease: "easeInOut", repeat: Infinity }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center origin-[calc(50%_-_640px)_calc(50%_+_180px)]"
            animate={{ rotate: -360 }}
            transition={{ duration: 28, ease: "linear", repeat: Infinity }}
          >
            <div className="absolute left-[calc(50%-70%)] top-[calc(50%-70%)] size-[150%] rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--bubble-color-fifth),0.6)_0%,rgba(var(--bubble-color-fifth),0)_60%)] mix-blend-hard-light" />
          </motion.div>

          {interactive && (
            <motion.div
              className="absolute size-full rounded-full bg-[radial-gradient(circle_at_center,rgba(var(--bubble-color-sixth),0.55)_0%,rgba(var(--bubble-color-sixth),0)_55%)] mix-blend-hard-light"
              style={{ x: springX, y: springY }}
            />
          )}
        </div>

        {children}
      </div>
    )
  },
)

BubbleBackground.displayName = "BubbleBackground"

