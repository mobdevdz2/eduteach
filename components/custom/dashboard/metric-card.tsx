import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  change?: number
  trend?: "up" | "down" | "neutral"
  className?: string
}

export function MetricCard({ title, value, description, icon, change, trend, className }: MetricCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || change !== undefined) && (
          <p className="text-xs text-muted-foreground flex items-center mt-1">
            {trend && trend !== "neutral" && (
              <span className={cn("mr-1 flex items-center", trend === "up" ? "text-green-500" : "text-red-500")}>
                {trend === "up" ? <ArrowUpIcon className="h-3 w-3 mr-1" /> : <ArrowDownIcon className="h-3 w-3 mr-1" />}
                {Math.abs(change || 0)}%
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
