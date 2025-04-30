"use client"

import { useState } from "react"
import { useStudentActivity } from "@/services/dashboard-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, BarChart3 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function StudentActivityChart() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("week")
  const { data, isLoading, error } = useStudentActivity(timeRange)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load student activity data.</AlertDescription>
      </Alert>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Student Activity</CardTitle>
            <CardDescription>Recent activity and engagement metrics</CardDescription>
          </div>
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
              <TabsTrigger value="year">Year</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <span className="text-sm text-muted-foreground">Total Activities</span>
            <span className="text-2xl font-bold">{data.metrics.totalActivities}</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <span className="text-sm text-muted-foreground">Engagement Score</span>
            <span className="text-2xl font-bold">{data.metrics.engagementScore}%</span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border p-4">
            <span className="text-sm text-muted-foreground">Activity Types</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline">{data.metrics.byType.message} Messages</Badge>
              <Badge variant="outline">{data.metrics.byType.assignment} Assignments</Badge>
              <Badge variant="outline">{data.metrics.byType.class} Classes</Badge>
            </div>
          </div>
        </div>

        <div className="h-64 w-full flex items-center justify-center border rounded-lg p-4">
          <div className="flex h-full w-full items-end justify-between gap-2">
            {data.metrics.activityTrend.map((value, index) => (
              <div key={index} className="relative flex h-full flex-col justify-end">
                <div className="w-12 rounded-t-md bg-primary" style={{ height: `${value}%` }}></div>
                <span className="mt-2 text-xs text-muted-foreground">
                  {timeRange === "day"
                    ? `${index + 1}h`
                    : timeRange === "week"
                      ? `D${index + 1}`
                      : timeRange === "month"
                        ? `W${index + 1}`
                        : `M${index + 1}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium">Recent Activities</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {data.activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 border-b pb-3">
                <div
                  className={`mt-0.5 rounded-full p-1.5 ${
                    activity.type === "message"
                      ? "bg-blue-100"
                      : activity.type === "assignment"
                        ? "bg-green-100"
                        : activity.type === "class"
                          ? "bg-amber-100"
                          : "bg-purple-100"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(activity.date).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
