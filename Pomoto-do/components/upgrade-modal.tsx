"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Crown, Check, BarChart3, Users, Palette, Shuffle, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  feature?: string
}

const proFeatures = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Detailed productivity insights, time tracking, and performance metrics",
    highlight: true,
  },
  {
    icon: Users,
    title: "Global Rankings",
    description: "Compete with users worldwide and climb the leaderboard",
    highlight: true,
  },
  {
    icon: Palette,
    title: "Premium Themes",
    description: "Access to 20+ beautiful themes and custom color schemes",
    highlight: false,
  },
  {
    icon: Shuffle,
    title: "Random Theme Generator",
    description: "Generate unique color combinations with one click",
    highlight: false,
  },
  {
    icon: Target,
    title: "Advanced Goal Setting",
    description: "Set custom goals, track streaks, and get personalized recommendations",
    highlight: false,
  },
  {
    icon: TrendingUp,
    title: "Productivity Heatmaps",
    description: "Visualize your most productive hours and optimize your schedule",
    highlight: false,
  },
]

const pricingPlans = [
  {
    name: "Monthly",
    price: "$9.99",
    period: "/month",
    popular: false,
  },
  {
    name: "Yearly",
    price: "$79.99",
    period: "/year",
    popular: true,
    savings: "Save 33%",
  },
]

export function UpgradeModal({ isOpen, onClose, feature }: UpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("yearly")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl">{feature ? `Unlock ${feature}` : "Upgrade to FocusFlow Pro"}</DialogTitle>
          <DialogDescription className="text-base">
            {feature
              ? `Get access to ${feature.toLowerCase()} and all other premium features`
              : "Supercharge your productivity with advanced features and insights"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {proFeatures.map((featureItem, index) => (
              <Card key={index} className={cn("relative", featureItem.highlight && "border-accent/50 bg-accent/5")}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "p-2 rounded-lg",
                        featureItem.highlight ? "bg-accent text-accent-foreground" : "bg-muted",
                      )}
                    >
                      <featureItem.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{featureItem.title}</h4>
                      <p className="text-sm text-muted-foreground">{featureItem.description}</p>
                    </div>
                    <Check className="w-4 h-4 text-green-500 mt-1" />
                  </div>
                </CardContent>
                {featureItem.highlight && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-accent text-accent-foreground">Popular</Badge>
                  </div>
                )}
              </Card>
            ))}
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center">Choose Your Plan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {pricingPlans.map((plan) => (
                <Card
                  key={plan.name.toLowerCase()}
                  className={cn(
                    "cursor-pointer transition-all relative",
                    selectedPlan === plan.name.toLowerCase()
                      ? "border-accent bg-accent/5"
                      : "hover:border-muted-foreground",
                  )}
                  onClick={() => setSelectedPlan(plan.name.toLowerCase())}
                >
                  <CardContent className="p-6 text-center">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{plan.name}</h4>
                        {plan.savings && (
                          <Badge variant="secondary" className="mt-1">
                            {plan.savings}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <span className="text-3xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                      {plan.name === "Yearly" && (
                        <p className="text-sm text-muted-foreground">That's just $6.67/month</p>
                      )}
                    </div>
                  </CardContent>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-accent text-accent-foreground">Most Popular</Badge>
                    </div>
                  )}
                  {selectedPlan === plan.name.toLowerCase() && (
                    <div className="absolute top-4 right-4">
                      <div className="w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-accent-foreground" />
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              size="lg"
              className="flex-1 gap-2 bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90"
            >
              <Crown className="w-4 h-4" />
              Upgrade to Pro - {selectedPlan === "yearly" ? "$79.99/year" : "$9.99/month"}
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Maybe Later
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center space-y-2 pt-4 border-t">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>✓ 30-day money-back guarantee</span>
              <span>✓ Cancel anytime</span>
              <span>✓ Secure payment</span>
            </div>
            <p className="text-xs text-muted-foreground">Join 10,000+ productive users who upgraded to Pro</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
