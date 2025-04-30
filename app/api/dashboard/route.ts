import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { auth } from "@/auth"
import { and, count, eq, gte, sql } from "drizzle-orm"
import { users } from "@/db/schema"
import { chats, chatMessages, students } from "@/db/schema/tables"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const searchParams = request.nextUrl.searchParams
    const timeRange = searchParams.get("timeRange") || "week"
    const classId = searchParams.get("classId")

    // Calculate date range based on timeRange
    const now = new Date()
    const startDate = new Date()

    switch (timeRange) {
      case "day":
        startDate.setDate(now.getDate() - 1)
        break
      case "week":
        startDate.setDate(now.getDate() - 7)
        break
      case "month":
        startDate.setMonth(now.getMonth() - 1)
        break
      case "year":
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 7) // Default to week
    }

    // Get total students (placeholder - replace with actual student table)
    const totalStudents = await db.select({ count: count() }).from(students)

    // Get total classes (placeholder - replace with actual class table)
    const totalClasses = 5 // Placeholder

    // Get total assignments (placeholder - replace with actual assignment table)
    const totalAssignments = 12 // Placeholder

    // Get completion rate (placeholder)
    const completionRate = 78 // Placeholder percentage

    // Get upcoming events (placeholder)
    const upcomingEvents = 3 // Placeholder

    // Get recent activity from chat messages
    const recentActivity = await db
      .select({
        id: chatMessages.id,
        threadId: chatMessages.threadId,
        content: chatMessages.content,
        createdAt: chatMessages.createdAt,
        role: chatMessages.role,
      })
      .from(chatMessages)
      .innerJoin(chats, eq(chatMessages.threadId, chats.id))
      .where(and(eq(chats.userId, userId), gte(chatMessages.createdAt, startDate)))
      .orderBy(sql`${chatMessages.createdAt} DESC`)
      .limit(10)

    // Format recent activity
    const formattedActivity = recentActivity.map((item) => ({
      id: item.id,
      type: "message",
      title: item.role === "user" ? "You sent a message" : "Assistant replied",
      description: item.content.substring(0, 100) + (item.content.length > 100 ? "..." : ""),
      date: item.createdAt.toISOString(),
    }))

    // Get class summaries (placeholder)
    const classSummaries = [
      {
        id: "1",
        name: "Mathematics 101",
        studentCount: 24,
        averageGrade: 85,
        nextSession: new Date(now.getTime() + 86400000).toISOString(), // Tomorrow
      },
      {
        id: "2",
        name: "Physics 202",
        studentCount: 18,
        averageGrade: 78,
        nextSession: new Date(now.getTime() + 172800000).toISOString(), // Day after tomorrow
      },
      {
        id: "3",
        name: "Computer Science 303",
        studentCount: 32,
        averageGrade: 92,
        nextSession: new Date(now.getTime() + 259200000).toISOString(), // 3 days from now
      },
    ]

    return NextResponse.json({
      stats: {
        totalStudents: totalStudents[0]?.count || 0,
        totalClasses,
        totalAssignments,
        completionRate,
        upcomingEvents,
        recentActivity: formattedActivity,
      },
      classes: classSummaries,
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 })
  }
}
