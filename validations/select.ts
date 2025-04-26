/* eslint-disable @typescript-eslint/no-explicit-any */
import { organizations, users, accounts, sessions, verificationTokens, subscriptions, featureLimits, classes, students, classStudents, assignments, assignmentSubmissions, grades, materials, lessonPlans, calendarEvents } from '@/db/schema';
import { createSchemaFactory } from 'drizzle-zod';


const { createSelectSchema } = createSchemaFactory({
  // This configuration will only coerce dates. Set `coerce` to `true` to coerce all data types or specify others
  coerce: {
    date: true,
    number: true
  }
  
});



export const organizationSelectSchema = createSelectSchema(organizations)
export const userSelectSchema = createSelectSchema(users)
export const accountSelectSchema = createSelectSchema(accounts)
export const sessionSelectSchema = createSelectSchema(sessions)
export const verificationTokenSelectSchema = createSelectSchema(verificationTokens)
export const subscriptionSelectSchema = createSelectSchema(subscriptions)
export const featureLimitSelectSchema = createSelectSchema(featureLimits)
export const classeSelectSchema = createSelectSchema(classes)
export const studentSelectSchema = createSelectSchema(students)
export const classStudentSelectSchema = createSelectSchema(classStudents)
export const assignmentSelectSchema = createSelectSchema(assignments)
export const assignmentSubmissionSelectSchema = createSelectSchema(assignmentSubmissions)
export const gradeSelectSchema = createSelectSchema(grades)
export const materialSelectSchema = createSelectSchema(materials)
export const lessonPlanSelectSchema = createSelectSchema(lessonPlans)
export const calendarEventSelectSchema = createSelectSchema(calendarEvents)
