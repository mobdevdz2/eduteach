"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ProfileInfo } from "@/components/custom/profile/profile-info"
import { ProfileSettings } from "@/components/custom/profile/profile-settings"
import { ProfileBilling } from "@/components/custom/profile/profile-billing"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("profile")

  // Get the tab from URL hash if present
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && ["profile", "settings", "billing"].includes(hash)) {
      setActiveTab(hash)
    }
  }, [])

  // Update URL hash when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    window.location.hash = value
  }

  if (status === "loading") {
    return (
      <div className="container py-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="container py-10">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-2">Not Authenticated</h2>
          <p>Please log in to view your profile.</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileInfo user={session.user} />
        </TabsContent>

        <TabsContent value="settings">
          <ProfileSettings user={session.user} />
        </TabsContent>

        <TabsContent value="billing">
          <ProfileBilling user={session.user} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
