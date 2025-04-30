"use client"

import { useClassPerformance } from "@/services/dashboard-service"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface ClassPerformanceProps {
  classId: string
}

export function ClassPerformance({ classId }: ClassPerformanceProps) {
  const { data, isLoading, error } = useClassPerformance(classId)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load class performance data.</AlertDescription>
      </Alert>
    )
  }

  if (!data) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name} Performance</CardTitle>
        <CardDescription>Key metrics and improvement areas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Grade</span>
              <span className="text-sm font-medium">{data.metrics.averageGrade}%</span>
            </div>
            <Progress value={data.metrics.averageGrade} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Attendance Rate</span>
              <span className="text-sm font-medium">{data.metrics.attendanceRate}%</span>
            </div>
            <Progress value={data.metrics.attendanceRate} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Participation Rate</span>
              <span className="text-sm font-medium">{data.metrics.participationRate}%</span>
            </div>
            <Progress value={data.metrics.participationRate} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-sm font-medium">{data.metrics.completionRate}%</span>
            </div>
            <Progress value={data.metrics.completionRate} />
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium">Top Students</h4>
          <div className="space-y-3">
            {data.topStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                    {student.avatar && <img src={student.avatar || "/placeholder.svg"} alt={student.name} />}
                  </div>
                  <span className="text-sm">{student.name}</span>
                </div>
                <span className="text-sm font-medium">{student.grade}%</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-medium">Improvement Areas</h4>
          <div className="space-y-3">
            {data.improvementAreas.map((area, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{area.area}</span>
                  <span className="text-sm font-medium">
                    {area.score}% / {area.target}%
                  </span>
                </div>
                <Progress value={(area.score / area.target) * 100} />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
