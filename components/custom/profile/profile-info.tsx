"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Loader2, Mail, Building, MapPin } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSelectSchema } from "@/validations/select"
import { StringInput } from "@/components/shared/form-inputs"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"

interface ProfileInfoProps {
  user: any
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm({
    resolver: zodResolver(userSelectSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      bio: user.bio || "",
      jobTitle: user.jobTitle || "",
      school: user.school || "",
      location: user.location || "",
      phone: user.phone || ""
    }
  })

  const handleSubmit = async (data) => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would update the user profile via API
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      toast.success("Profile updated successfully")
      setIsEditing(false)
    } catch (error) {
      toast.error("Failed to update profile")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const formData = form.getValues()
  const fullName = `${formData?.firstName} ${formData?.lastName}`
  const initials = `${formData?.firstName?.[0] || ""}${formData?.lastName?.[0] || ""}`.toUpperCase()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>View and update your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Form {...form} className="space-y-4">
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <StringInput
                    label="First Name"
                    placeholder="Enter your first name"
                    form={form}
                    name="firstName"
                  />
                </div>
                <div className="flex-1">
                  <StringInput
                    label="Last Name"
                    placeholder="Enter your last name"
                    form={form}
                    name="lastName"
                  />
                </div>
              </div>

              <StringInput
                label="Email"
                description="Your email cannot be changed as it is used for login."
                placeholder="your.email@example.com"
                form={form}
                type="email"
                name="email"
                disabled
              />

              <StringInput
                label="Bio"
                placeholder="Tell us about yourself"
                form={form}
                name="bio"
                multiline
                className="min-h-[100px]"
              />

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <StringInput
                    label="Job Title"
                    placeholder="Enter your job title"
                    form={form}
                    name="jobTitle"
                  />
                </div>
                <div className="flex-1">
                  <StringInput
                    label="School/Institution"
                    placeholder="Enter your school or institution"
                    form={form}
                    name="school"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <StringInput
                    label="Location"
                    placeholder="City, Country"
                    form={form}
                    name="location"
                  />
                </div>
                <div className="flex-1">
                  <StringInput
                    label="Phone Number"
                    placeholder="(123) 456-7890"
                    form={form}
                    name="phone"
                  />
                </div>
              </div>
            </form>
            </Form>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.image || ""} alt={fullName} />
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{fullName}</h2>
                  <p className="text-muted-foreground">{formData?.jobTitle}</p>
                </div>
              </div>

              <div className="grid gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{formData?.email}</span>
                </div>

                {formData?.school && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{formData?.school}</span>
                  </div>
                )}

                {formData?.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{formData?.location}</span>
                  </div>
                )}
              </div>

              {formData?.bio && (
                <div className="pt-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">About</h3>
                  <p>{formData?.bio}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={form.handleSubmit(handleSubmit)} disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Details about your EduTeach account</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">Account Type</dt>
              <dd>{user.role || "Teacher"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Member Since</dt>
              <dd>{new Date().toLocaleDateString()}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Subscription Plan</dt>
              <dd>Professional</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">Next Billing Date</dt>
              <dd>{new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}