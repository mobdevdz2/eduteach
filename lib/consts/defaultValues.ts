import {
  organizationInsertSchema,
  userInsertSchema,
  accountInsertSchema,
  sessionInsertSchema,
  verificationTokenInsertSchema,
  subscriptionInsertSchema,
  featureLimitInsertSchema,
  classeInsertSchema,
  studentInsertSchema,
  classStudentInsertSchema,
  assignmentInsertSchema,
  assignmentSubmissionInsertSchema,
  gradeInsertSchema,
  materialInsertSchema,
  lessonPlanInsertSchema,
  calendarEventInsertSchema,
} from "@/validations/insert";

export const defaultValues = {
  organization: {
    insert: organizationInsertSchema._type,
    select: organizationInsertSchema._type,
  },
  user: { insert: userInsertSchema._type, select: userInsertSchema._type },
  account: {
    insert: accountInsertSchema._type,
    select: accountInsertSchema._type,
  },
  session: {
    insert: sessionInsertSchema._type,
    select: sessionInsertSchema._type,
  },
  verificationToken: {
    insert: verificationTokenInsertSchema._type,
    select: verificationTokenInsertSchema._type,
  },
  subscription: {
    insert: subscriptionInsertSchema._type,
    select: subscriptionInsertSchema._type,
  },
  featureLimit: {
    insert: featureLimitInsertSchema._type,
    select: featureLimitInsertSchema._type,
  },
  classe: {
    insert: classeInsertSchema._type,
    select: classeInsertSchema._type,
  },
  student: {
    insert: studentInsertSchema._type,
    select: studentInsertSchema._type,
  },
  classStudent: {
    insert: classStudentInsertSchema._type,
    select: classStudentInsertSchema._type,
  },
  assignment: {
    insert: assignmentInsertSchema._type,
    select: assignmentInsertSchema._type,
  },
  assignmentSubmission: {
    insert: assignmentSubmissionInsertSchema._type,
    select: assignmentSubmissionInsertSchema._type,
  },
  grade: { insert: gradeInsertSchema._type, select: gradeInsertSchema._type },
  material: {
    insert: materialInsertSchema._type,
    select: materialInsertSchema._type,
  },
  lessonPlan: {
    insert: lessonPlanInsertSchema._type,
    select: lessonPlanInsertSchema._type,
  },
  calendarEvent: {
    insert: calendarEventInsertSchema._type,
    select: calendarEventInsertSchema._type,
  },
};
