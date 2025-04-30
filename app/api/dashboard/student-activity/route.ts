import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { auth } from "@/auth"
import { and, eq, gte, sql } from "drizzle-orm"
import { chats, chatMessages } from "@/db/schema/tables"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id
    const searchParams = request.nextUrl.searchParams
    const timeRange = searchParams.get("timeRange") || "week"

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

    // Get recent chat activity
    const chatActivity = await db
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
      .limit(20)

    // Format chat activity
    const formattedChatActivity = chatActivity.map((item) => ({
      id: item.id,
      type: "message",
      title: item.role === "user" ? "You sent a message" : "Assistant replied",
      description: item.content.substring(0, 100) + (item.content.length > 100 ? "..." : ""),
      date: item.createdAt.toISOString(),
      threadId: item.threadId,
    }))

    // In a real application, you would query your actual assignment, class, and event tables
    // This is a placeholder implementation with mock data combined with real chat data

    // Mock data for assignments
    const assignmentActivity = [
      {
        id: "a1",
        type: "assignment",
        title: "Submitted Math Assignment",
        description: "You submitted the Linear Algebra homework assignment",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "a2",
        type: "assignment",
        title: "Received Feedback",
        description: "Your Physics lab report received feedback from Dr. Smith",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    // Mock data for class attendance
    const classActivity = [
      {
        id: "c1",
        type: "class",
        title: "Attended Biology 101",
        description: "You attended the Biology 101 lecture on Cell Structure",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "c2",
        type: "class",
        title: "Missed Computer Science 202",
        description: "You were absent from the Computer Science 202 lecture",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    // Combine all activity types and sort by date
    const allActivity = [...formattedChatActivity, ...assignmentActivity, ...classActivity]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 20) // Limit to 20 most recent activities

    // Calculate activity metrics
    const activityMetrics = {
      totalActivities: allActivity.length,
      byType: {
        message: formattedChatActivity.length,
        assignment: assignmentActivity.length,
        class: classActivity.length,
      },
      engagementScore: Math.min(100, Math.round((allActivity.length / 20) * 100)),
      activityTrend: [65, 70, 68, 75, 82, 80, 85], // Last 7 days/weeks/months based on timeRange
    }

    return NextResponse.json({
      activities: allActivity,
      metrics: activityMetrics,
      timeRange,
    })
  } catch (error) {
    console.error("Student activity API error:", error)
    return NextResponse.json({ error: "Failed to fetch student activity data" }, { status: 500 })
  }
}
