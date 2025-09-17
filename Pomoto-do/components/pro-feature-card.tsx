"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProBadge } from "./pro-badge"
import { UpgradeModal } from "./upgrade-modal"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProFeatureCardProps {
  title: string
  description: string
  children: React.ReactNode
  featureName?: string
  className?: string
  isLocked?: boolean
}

export function ProFeatureCard({
  title,
  description,
  children,
  featureName,
  className,
  isLocked = true,
}: ProFeatureCardProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  return (
    <>
      <Card className={cn("relative overflow-hidden", className)}>
        <div className="absolute top-4 right-4">
          <ProBadge />
        </div>

        <CardHeader>
          <CardTitle className="flex items-center gap-2">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {isLocked && (
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Lock className="w-8 h-8 text-muted-foreground mx-auto" />
                <Button onClick={() => setShowUpgradeModal(true)} className="gap-2">
                  <ProBadge variant="badge" />
                  Unlock {featureName || "Feature"}
                </Button>
              </div>
            </div>
          )}

          <div className={cn(isLocked && "opacity-30")}>{children}</div>
        </CardContent>
      </Card>

      <UpgradeModal isOpen={showUpgradeModal} onClose={() => setShowUpgradeModal(false)} feature={featureName} />
    </>
  )
}
