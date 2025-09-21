"use client"

import { motion, type Transition } from "motion/react"
import { useMemo } from "react"

interface SlidingNumberProps {
  value: number | string
  className?: string
  transition?: Transition
  precision?: number
}

export function SlidingNumber({ value, className, transition, precision = 0 }: SlidingNumberProps) {
  const formattedValue = useMemo(() => {
    if (typeof value === "number") {
      return precision ? value.toFixed(precision) : value.toString()
    }
    return value
  }, [value, precision])

  const digits = useMemo(() => formattedValue.split(""), [formattedValue])

  return (
    <span className={className}>
      {digits.map((digit, index) => (
        <motion.span
          key={`${digit}-${index}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 24,
            ...transition,
          }}
          className="inline-block"
        >
          {digit}
        </motion.span>
      ))}
    </span>
  )
}
