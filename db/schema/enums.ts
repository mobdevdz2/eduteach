import { pgEnum } from "drizzle-orm/pg-core";


// Enums
export const userRoleEnum = pgEnum("user_role", [
  "teacher",
  "admin",
  "department_head",
  "school_admin",
]);
export const subscriptionPlanEnum = pgEnum("subscription_plan", [
  "starter",
  "professional",
  "school",
]);
export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "trialing",
  "unpaid",
]);
export const eventTypeEnum = pgEnum("event_type", [
  "class",
  "assignment",
  "exam",
  "meeting",
  "personal",
]);
export const assignmentStatusEnum = pgEnum("assignment_status", [
  "draft",
  "published",
  "graded",
  "archived",
]);
export const lessonPlanStatusEnum = pgEnum("lesson_plan_status", [
  "draft",
  "complete",
  "archived",
]);
export const eventVisibilityEnum = pgEnum("event_visibility", [
    "public",
    "private",
    "organization",
  ]);