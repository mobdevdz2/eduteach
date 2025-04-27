import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"

// Mock database for files
// In a real application, you would use your database
const mockFiles = [
  {
    id: "file-1",
    name: "Lesson Plan - Science.docx",
    url: "/mock-files/lesson-plan.docx",
    createdAt: new Date().toISOString(),
    size: 45000,
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    userId: "user-1",
  },
  {
    id: "file-2",
    name: "Student Assessment.pdf",
    url: "/mock-files/assessment.pdf",
    createdAt: new Date().toISOString(),
    size: 120000,
    type: "application/pdf",
    userId: "user-1",
  },
  {
    id: "file-3",
    name: "Classroom Activities.xlsx",
    url: "/mock-files/activities.xlsx",
    createdAt: new Date().toISOString(),
    size: 35000,
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    userId: "user-1",
  },
]

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = req.nextUrl.searchParams.get("userId")

    // Verify the user is accessing their own files
    if (userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real application, you would query your database
    // const files = await db.query.userFiles.findMany({
    //   where: eq(userFiles.userId, userId)
    // })

    // For now, return mock data
    const userFiles = mockFiles.filter((file) => file.userId === userId || file.userId === "user-1")

    return NextResponse.json(userFiles)
  } catch (error) {
    console.error("Error fetching files:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch files" },
      { status: 500 },
    )
  }
}
