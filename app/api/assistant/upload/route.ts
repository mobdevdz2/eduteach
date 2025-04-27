import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import OpenAI from "openai"
import { writeFile } from "fs/promises"
import { join } from "path"
import fs from "fs"
import os from "os"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get form data with the file
    const formData = await req.formData()
    const file = formData.get("file") as File
    const threadId = formData.get("threadId") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Create a temporary file
    const tempDir = os.tmpdir()
    const tempFilePath = join(tempDir, file.name)

    // Convert the File object to a Buffer and write to the temp file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(tempFilePath, buffer)

    // Upload the file to OpenAI
    const uploadedFile = await openai.files.create({
      file: fs.createReadStream(tempFilePath),
      purpose: "assistant",
    })

    // If a threadId is provided, attach the file to the thread
    if (threadId) {
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: `I've uploaded a file named "${file.name}". Please analyze it.`,
        file_ids: [uploadedFile.id],
      })
    }

    // Clean up the temp file
    fs.unlinkSync(tempFilePath)

    return NextResponse.json({
      id: uploadedFile.id,
      filename: file.name,
      size: file.size,
      type: file.type,
      created_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 },
    )
  }
}
