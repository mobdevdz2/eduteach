import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import OpenAI from "openai"
import { db } from "@/db"
import { chats } from "@/db/schema/tables"
import { and, eq } from "drizzle-orm"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const threadId = params.id
    const { name, category, isArchived } = await req.json()
    const userId = session.user.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Update the thread in the database
    const [updatedThread] = await db
      .update(chats)
      .set({
        name: name !== undefined ? name : undefined,
        category: category !== undefined ? category : undefined,
        isArchived: isArchived !== undefined ? isArchived : undefined,
        updatedAt: new Date(),
      })
      .where(and(eq(chats.id, threadId), eq(chats.userId, userId)))
      .returning()

    if (!updatedThread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    return NextResponse.json(updatedThread)
  } catch (error) {
    console.error("Error updating thread:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update thread" },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const threadId = params.id
    const userId = session.user.id
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    // Find the thread
    const thread = await db.query.chats.findFirst({
      where: and(eq(chats.id, threadId), eq(chats.userId, userId)),
    })

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    // Delete the thread from OpenAI
    await openai.beta.threads.del(thread.openaiThreadId)

    // Delete the thread from our database
    await db.delete(chats).where(and(eq(chats.id, threadId), eq(chats.userId, userId)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting thread:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete thread" },
      { status: 500 },
    )
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const threadId = params.id
    const userId = session.user.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    // Find the thread
    const thread = await db.query.chats.findFirst({
      where: and(eq(chats.id, threadId), eq(chats.userId, userId)),
    })

    if (!thread) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 })
    }

    return NextResponse.json(thread)
  } catch (error) {
    console.error("Error fetching thread:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch thread" },
      { status: 500 },
    )
  }
}
