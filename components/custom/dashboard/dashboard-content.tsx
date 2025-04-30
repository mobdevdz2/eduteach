"use client"

import { useState } from "react"
import { useDashboard, useRefreshDashboard } from "@/services/dashboard-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, BarChart3, Calendar, GraduationCap, RefreshCcw, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActivityList } from "./activity-list"
import { ClassList } from "./class-list"
import { ClassPerformance } from "./class-performance"
import { StudentActivityChart } from "./student-activity-chart"

export function DashboardContent() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month" | "year">("week")
  const [selectedClassId, setSelectedClassId] = useState<string>("")

  const { data, isLoading, error } = useDashboard({ timeRange })
  const { mutate: refreshDashboard, isPending: isRefreshing } = useRefreshDashboard()

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load dashboard data. Please try again later.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          {data?.classes && data.classes.length > 0 && (
            <Select value={selectedClassId} onValueChange={setSelectedClassId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                {data.classes.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <Button variant="outline" size="sm" onClick={() => refreshDashboard()} disabled={isRefreshing}>
          <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : data?.stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Active learners on the platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : data?.stats.totalClasses}</div>
            <p className="text-xs text-muted-foreground">Currently running courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : data?.stats.totalAssignments}</div>
            <p className="text-xs text-muted-foreground">Total active assignments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? "..." : data?.stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">Events in the next 7 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid gap-4 md:grid-cols-2 ">
        <StudentActivityChart />

        <Card className="">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-muted" />
                    <div className="space-y-2">
                      <div className="h-4 w-[250px] rounded bg-muted" />
                      <div className="h-4 w-[200px] rounded bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ActivityList activities={data?.stats.recentActivity || []} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Class Performance and Class List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {selectedClassId && <ClassPerformance classId={selectedClassId} />}

        <Card className={selectedClassId ? "lg:col-span-2" : "lg:col-span-3"}>
          <CardHeader>
            <CardTitle>Classes</CardTitle>
            <CardDescription>Overview of your active classes</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2">
                    <div className="space-y-1">
                      <div className="h-4 w-[200px] rounded bg-muted" />
                      <div className="h-3 w-[150px] rounded bg-muted" />
                    </div>
                    <div className="h-8 w-8 rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : (
              <ClassList classes={data?.classes || []}  />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
