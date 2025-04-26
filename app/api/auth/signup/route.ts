/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, firstName, lastName } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({ where: (users, { eq }) => eq(users.email, email) });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password
    const passwordHash = await hash(password, 10);

    // Create new user
    const newUser = await db.insert(users).values({
      name,
      firstName,
      lastName,
      email,
      passwordHash
    }).returning();

    if (newUser.length === 0) {
      throw new Error("Failed to create user");
    }

    // Return success response (excluding password hash)
    const { passwordHash: hashedPassword, ...userWithoutPassword } = newUser[0];
    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error) {
    console.error("[AUTH_SIGNUP]", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
