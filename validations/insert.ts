/* eslint-disable @typescript-eslint/no-explicit-any */
import { organizations, users, accounts, sessions, verificationTokens, subscriptions, featureLimits, classes, students, classStudents, assignments, assignmentSubmissions, grades, materials, lessonPlans, calendarEvents } from '@/db/schema';
import { z } from 'zod';
import { createSchemaFactory } from 'drizzle-zod';


const { createInsertSchema } = createSchemaFactory({
  // This configuration will only coerce dates. Set `coerce` to `true` to coerce all data types or specify others
  coerce: {
    date: true,
    number: true
  }
  
});



export const organizationInsertSchema = createInsertSchema(organizations, {
  id: (schema) => schema.optional(),
  createdAt: (schema) => schema.optional(),
  updatedAt: (schema) => schema.optional(),
  name: (schema) => schema.min(2),
  ownerId: (schema) => schema.optional(),
  
})
export const userInsertSchema = createInsertSchema(users)
export const accountInsertSchema = createInsertSchema(accounts)
export const sessionInsertSchema = createInsertSchema(sessions)
export const verificationTokenInsertSchema = createInsertSchema(verificationTokens)
export const subscriptionInsertSchema = createInsertSchema(subscriptions)
export const featureLimitInsertSchema = createInsertSchema(featureLimits)
export const classeInsertSchema = createInsertSchema(classes)
export const studentInsertSchema = createInsertSchema(students)
export const classStudentInsertSchema = createInsertSchema(classStudents)
export const assignmentInsertSchema = createInsertSchema(assignments)
export const assignmentSubmissionInsertSchema = createInsertSchema(assignmentSubmissions)
export const gradeInsertSchema = createInsertSchema(grades)
export const materialInsertSchema = createInsertSchema(materials)
export const lessonPlanInsertSchema = createInsertSchema(lessonPlans)
export const calendarEventInsertSchema = createInsertSchema(calendarEvents, {
  text: (schema) => schema.min(2),
  start: (schema) => schema.describe("Start date"),
  end: (schema) => schema.describe("End date"),
  type: (schema) => schema.optional(),
  location: (schema) => schema.optional(),
  description: (schema) => schema.optional(),
  userId: (schema) => schema.uuid(),
})


export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
