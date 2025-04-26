import { organizations, users, accounts, sessions, verificationTokens, subscriptions, featureLimits, classes, students, classStudents, assignments, assignmentSubmissions, grades, materials, lessonPlans, calendarEvents } from "@/db/schema";

export type Organizations = typeof organizations.$inferSelect;
export type OrganizationsCreateInput = typeof organizations.$inferInsert;
export type OrganizationsUpdateInput = typeof organizations.$inferSelect;

export type Users = typeof users.$inferSelect;
export type UsersCreateInput = typeof users.$inferInsert;
export type UsersUpdateInput = typeof users.$inferSelect;

export type Accounts = typeof accounts.$inferSelect;
export type AccountsCreateInput = typeof accounts.$inferInsert;
export type AccountsUpdateInput = typeof accounts.$inferSelect;

export type Sessions = typeof sessions.$inferSelect;
export type SessionsCreateInput = typeof sessions.$inferInsert;
export type SessionsUpdateInput = typeof sessions.$inferSelect;

export type VerificationTokens = typeof verificationTokens.$inferSelect;
export type VerificationTokensCreateInput = typeof verificationTokens.$inferInsert;
export type VerificationTokensUpdateInput = typeof verificationTokens.$inferSelect;

export type Subscriptions = typeof subscriptions.$inferSelect;
export type SubscriptionsCreateInput = typeof subscriptions.$inferInsert;
export type SubscriptionsUpdateInput = typeof subscriptions.$inferSelect;

export type FeatureLimits = typeof featureLimits.$inferSelect;
export type FeatureLimitsCreateInput = typeof featureLimits.$inferInsert;
export type FeatureLimitsUpdateInput = typeof featureLimits.$inferSelect;

export type Classes = typeof classes.$inferSelect;
export type ClassesCreateInput = typeof classes.$inferInsert;
export type ClassesUpdateInput = typeof classes.$inferSelect;

export type Students = typeof students.$inferSelect;
export type StudentsCreateInput = typeof students.$inferInsert;
export type StudentsUpdateInput = typeof students.$inferSelect;

export type ClassStudents = typeof classStudents.$inferSelect;
export type ClassStudentsCreateInput = typeof classStudents.$inferInsert;
export type ClassStudentsUpdateInput = typeof classStudents.$inferSelect;

export type Assignments = typeof assignments.$inferSelect;
export type AssignmentsCreateInput = typeof assignments.$inferInsert;
export type AssignmentsUpdateInput = typeof assignments.$inferSelect;

export type AssignmentSubmissions = typeof assignmentSubmissions.$inferSelect;
export type AssignmentSubmissionsCreateInput = typeof assignmentSubmissions.$inferInsert;
export type AssignmentSubmissionsUpdateInput = typeof assignmentSubmissions.$inferSelect;

export type Grades = typeof grades.$inferSelect;
export type GradesCreateInput = typeof grades.$inferInsert;
export type GradesUpdateInput = typeof grades.$inferSelect;

export type Materials = typeof materials.$inferSelect;
export type MaterialsCreateInput = typeof materials.$inferInsert;
export type MaterialsUpdateInput = typeof materials.$inferSelect;

export type LessonPlans = typeof lessonPlans.$inferSelect;
export type LessonPlansCreateInput = typeof lessonPlans.$inferInsert;
export type LessonPlansUpdateInput = typeof lessonPlans.$inferSelect;

export type CalendarEvents = typeof calendarEvents.$inferSelect;
export type CalendarEventsCreateInput = typeof calendarEvents.$inferInsert;
export type CalendarEventsUpdateInput = typeof calendarEvents.$inferSelect;