"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import type { DashboardStats, DashboardFilters, ClassSummary } from "@/types/entities"

// Types for the dashboard service
export interface DashboardDataResponse {
  stats: DashboardStats
  classes: ClassSummary[]
}

export interface ClassPerformanceResponse {
  id: string
  name: string
  metrics: {
    averageGrade: number
    attendanceRate: number
    participationRate: number
    completionRate: number
  }
  trends: {
    grades: number[]
    attendance: number[]
    participation: number[]
    completion: number[]
  }
  topStudents: {
    id: string
    name: string
    grade: number
    avatar?: string
  }[]
  improvementAreas: {
    area: string
    score: number
    target: number
  }[]
  recentAssignments: {
    id: string
    title: string
    averageScore: number
    dueDate: string
    submissionRate: number
  }[]
}

export interface StudentActivityResponse {
  activities: {
    id: string
    type: "message" | "assignment" | "class" | "event"
    title: string
    description: string
    date: string
    threadId?: string
  }[]
  metrics: {
    totalActivities: number
    byType: {
      message: number
      assignment: number
      class: number
      event?: number
    }
    engagementScore: number
    activityTrend: number[]
  }
  timeRange: string
}

// Function to fetch dashboard data
async function fetchDashboardData(filters?: DashboardFilters): Promise<DashboardDataResponse> {
  const queryParams = new URLSearchParams()

  if (filters?.timeRange) {
    queryParams.append("timeRange", filters.timeRange)
  }

  if (filters?.classId) {
    queryParams.append("classId", filters.classId)
  }

  const queryString = queryParams.toString()
  const url = `/api/dashboard${queryString ? `?${queryString}` : ""}`

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data")
  }

  return response.json()
}

// Hook to use dashboard data
export function useDashboard(filters?: DashboardFilters) {
  return useQuery({
    queryKey: ["dashboard", filters],
    queryFn: () => fetchDashboardData(filters),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// Function to refresh dashboard data
export function useRefreshDashboard() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      return await fetchDashboardData()
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["dashboard"], data)
    },
  })
}

// Function to fetch class performance data
export function useClassPerformance(classId: string) {
  return useQuery<ClassPerformanceResponse>({
    queryKey: ["classPerformance", classId],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/class/${classId}/performance`)
      if (!response.ok) {
        throw new Error("Failed to fetch class performance data")
      }
      return response.json()
    },
    enabled: !!classId,
  })
}

// Function to fetch student activity data
export function useStudentActivity(timeRange = "week") {
  return useQuery<StudentActivityResponse>({
    queryKey: ["studentActivity", timeRange],
    queryFn: async () => {
      const response = await fetch(`/api/dashboard/student-activity?timeRange=${timeRange}`)
      if (!response.ok) {
        throw new Error("Failed to fetch student activity data")
      }
      return response.json()
    },
  })
}
