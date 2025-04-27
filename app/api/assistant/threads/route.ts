import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import OpenAI from "openai"
import { db } from "@/db"
import { chats } from "@/db/schema/tables"
import { and, eq } from "drizzle-orm"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // Query the database for the user's threads
    const threads = await db.query.chats.findMany({
      where: userId ? eq(chats.userId, userId) : undefined,
      orderBy: [
       chats.createdAt,
      ],
    })

    return NextResponse.json(threads)
  } catch (error) {
    console.error("Error fetching threads:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch threads" },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name } = await req.json()
    const userId = session.user.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create a new thread in OpenAI
    const openaiThread = await openai.beta.threads.create({})

    // Create a new thread in our database
    const now = new Date()
    const [newThread] = await db
      .insert(chats)
      .values({
        name: name !== undefined ? name : "New Chat",
        openaiThreadId: openaiThread.id,
        userId,
        createdAt: now,
        updatedAt: now,
        lastMessageAt: now,
      })
      .returning()

    return NextResponse.json(newThread)
  } catch (error) {
    console.error("Error creating thread:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create thread" },
      { status: 500 },
    )
  }
}
export async function PUT(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, name } = await req.json()
    const userId = session.user.id

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate the request
    if (!id || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      )
    }

    // Update the thread in our database
    const [updatedThread] = await db
      .update(chats)
      .set({ name })
      .where(and(eq(chats.id, id), eq(chats.userId, userId)))
      .returning()

    return NextResponse.json(updatedThread)
  } catch (error) {
    console.error("Error updating thread:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update thread" },
      { status: 500 },
    )
  }
}
export async function DELETE(req: NextRequest) {
    try {
        const session = await auth()
    
        if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
    
        const { id } = await req.json()
        const userId = session.user.id
    
        if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
    
        // Validate the request
        if (!id) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 },
        )
        }
    
        // Delete the thread in our database
        const deletedThread = await db
        .delete(chats)
        .where(and(eq(chats.id, id), eq(chats.userId, userId)))
    
        return NextResponse.json(deletedThread)
    } catch (error) {
        console.error("Error deleting thread:", error)
        return NextResponse.json(
        { error: error instanceof Error ? error.message : "Failed to delete thread" },
        { status: 500 },
        )
    }
    }