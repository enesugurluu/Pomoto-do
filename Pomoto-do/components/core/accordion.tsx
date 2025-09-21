"use client"

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { CSSProperties, ReactNode } from "react"
import { AnimatePresence, MotionConfig, motion, type TargetAndTransition, type Transition } from "framer-motion"

import { cn } from "@/lib/utils"

type AccordionVariants = {
  expanded?: TargetAndTransition
  collapsed?: TargetAndTransition
}

type AccordionContextValue = {
  expandedValue: string | null
  toggleItem: (value: string) => void
  variants?: AccordionVariants
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined)

function useAccordionContext() {
  const context = useContext(AccordionContext)

  if (!context) {
    throw new Error("Accordion components must be used within an Accordion")
  }

  return context
}

interface AccordionProviderProps {
  children: ReactNode
  variants?: AccordionVariants
  expandedValue?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
}

function AccordionProvider({
  children,
  variants,
  expandedValue,
  defaultValue = null,
  onValueChange,
}: AccordionProviderProps) {
  const isControlled = expandedValue !== undefined
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue)

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(defaultValue)
    }
  }, [defaultValue, isControlled])

  const currentValue = isControlled ? expandedValue ?? null : internalValue

  const toggleItem = useCallback(
    (value: string) => {
      const nextValue = currentValue === value ? null : value

      onValueChange?.(nextValue)

      if (!isControlled) {
        setInternalValue(nextValue)
      }
    },
    [currentValue, isControlled, onValueChange],
  )

  const contextValue = useMemo(
    () => ({ expandedValue: currentValue ?? null, toggleItem, variants }),
    [currentValue, toggleItem, variants],
  )

  return <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>
}

interface AccordionProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  transition?: Transition
  variants?: AccordionVariants
  expandedValue?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  children: ReactNode
}

function Accordion({
  children,
  className,
  transition,
  variants,
  expandedValue,
  defaultValue,
  onValueChange,
  ...rest
}: AccordionProps) {
  return (
    <MotionConfig transition={transition}>
      <div className={cn("relative", className)} aria-orientation="vertical" {...rest}>
        <AccordionProvider
          variants={variants}
          expandedValue={expandedValue}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
        >
          {children}
        </AccordionProvider>
      </div>
    </MotionConfig>
  )
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  children: ReactNode
}

function AccordionItem({ value, children, className, ...rest }: AccordionItemProps) {
  const { expandedValue } = useAccordionContext()
  const isExpanded = expandedValue === value

  const dataAttributes = isExpanded ? { "data-expanded": "" } : { "data-closed": "" }

  return (
    <div className={cn(className)} {...dataAttributes} {...rest}>
      {Children.map(children, (child) =>
        isValidElement(child)
          ? cloneElement(child, {
              ...child.props,
              value,
              expanded: isExpanded,
            })
          : child,
      )}
    </div>
  )
}

interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string
  expanded?: boolean
  children: ReactNode
}

function AccordionTrigger({
  children,
  className,
  value,
  expanded,
  onClick,
  type,
  ...rest
}: AccordionTriggerProps) {
  const { toggleItem, expandedValue } = useAccordionContext()
  const isExpanded = expanded ?? (value !== undefined && expandedValue === value)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick?.(event)

    if (event.defaultPrevented) {
      return
    }

    if (typeof value === "string") {
      toggleItem(value)
    }
  }

  return (
    <button
      type={type ?? "button"}
      aria-expanded={isExpanded}
      className={cn("group", className)}
      data-expanded={isExpanded ? "" : undefined}
      data-closed={!isExpanded ? "" : undefined}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  )
}

interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  expanded?: boolean
  children: ReactNode
}

function AccordionContent({
  children,
  className,
  value,
  expanded,
  style,
  ...rest
}: AccordionContentProps) {
  const { expandedValue, variants } = useAccordionContext()
  const isExpanded = expanded ?? (value !== undefined && expandedValue === value)

  const motionVariants = useMemo(
    () => ({
      expanded: {
        height: "auto",
        opacity: 1,
        ...(variants?.expanded ?? {}),
      },
      collapsed: {
        height: 0,
        opacity: 0,
        ...(variants?.collapsed ?? {}),
      },
    }),
    [variants],
  )

  const mergedStyle: CSSProperties = {
    overflow: "hidden",
    ...style,
  }

  return (
    <AnimatePresence initial={false}>
      {isExpanded ? (
        <motion.div
          initial="collapsed"
          animate="expanded"
          exit="collapsed"
          variants={motionVariants}
          className={className}
          style={mergedStyle}
          data-expanded=""
          {...rest}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
