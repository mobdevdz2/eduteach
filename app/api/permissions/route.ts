import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { rolePermissions } from "@/lib/permissions/roles"
import type { PermissionContext } from "@/lib/permissions/types"
import { hasFeature } from "@/lib/permissions/subscription"

// API route to get user permissions
export async function GET(req: NextRequest) {
  try {
    // Get the current user from the session
    const session = await getServerSession()

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the user from the database
    const user = await db.query.users.findFirst({
      where: eq(users.email, session.user.email),
    })

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create the permission context
    const context: PermissionContext = {
      user: {
        id: user.id,
        role: user.role,
        organizationId: user.organizationId,
      },
    }

    // Get all permissions for the user's role
    const permissions = Object.entries(rolePermissions)
      .filter(([_, roles]) => roles.includes(user.role))
      .map(([permission]) => permission)

    // Get subscription features
    const features = await Promise.all(
      Object.keys(hasFeature).map(async (feature) => {
        const hasAccess = await hasFeature(context, feature)
        return { feature, hasAccess }
      }),
    )

    return NextResponse.json({
      role: user.role,
      permissions,
      features: features.reduce(
        (acc, { feature, hasAccess }) => {
          acc[feature] = hasAccess
          return acc
        },
        {} as Record<string, boolean>,
      ),
    })
  } catch (error) {
    console.error("Error fetching permissions:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
