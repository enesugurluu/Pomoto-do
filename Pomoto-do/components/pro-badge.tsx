import { Badge } from "@/components/ui/badge"
import { Crown, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProBadgeProps {
  variant?: "badge" | "lock"
  className?: string
  size?: "sm" | "md"
}

export function ProBadge({ variant = "badge", className, size = "sm" }: ProBadgeProps) {
  if (variant === "lock") {
    return <Lock className={cn("text-muted-foreground", size === "sm" ? "w-3 h-3" : "w-4 h-4", className)} />
  }

  return (
    <Badge variant="secondary" className={cn("gap-1", size === "sm" ? "text-xs" : "text-sm", className)}>
      <Crown className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      PRO
    </Badge>
  )
}
