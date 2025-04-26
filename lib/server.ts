import { Server } from "@/types/server";
import { db } from "@/db";
import * as schema from "@/db/schema/tables";
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
  calendarEventInsertSchema
} from "@/validations/insert";
import { ZodSchema } from "zod";
import { PgTable, TableConfig } from "drizzle-orm/pg-core";
import { CreateInputTypes } from "@/types/services";
import { and } from "drizzle-orm";

const checkInsert = (values: any, schema: ZodSchema) => {
  const singleResult = schema.safeParse(values);
  console.log({values})
  if (singleResult.success) return singleResult.data;
  
  const arrayResult = schema.array().safeParse(values);
  if (arrayResult.success) return arrayResult.data;

  const firstError =
    (singleResult.success === false && singleResult.error.errors[0]?.message) ||
    (arrayResult.success === false && arrayResult.error.errors[0]?.message) ||
    "Validation failed";

  throw new Error(firstError);
};

const createHandler = <T extends PgTable<TableConfig>>(table: T, schema: ZodSchema) => (values: any) =>
  db.insert(table).values(checkInsert(values, schema)).returning();

const updateHandler = <T extends PgTable<TableConfig>>(table: T, schema: ZodSchema) => (values: any) =>
  db.update(table).set(checkInsert(values, schema)).returning();

const deleteHandler = <T extends PgTable<TableConfig>>(table: T) => (config: any) =>
  db.delete(table).where(config).returning();


const paramsToWhereContition = (eq: any,table: any, params:  Partial<CreateInputTypes["students"]>) => {
  const conditions = [];
  Object.entries(params).forEach(([key, value]) => {
    conditions.push(eq(table[key], value));
  })
  return conditions.length > 0 ? and(...conditions) : undefined;
}

export const serverService: Server = {
  organizations: {
    findMany: (config) => db.query.organizations.findMany({}),
    findFirst: (config) => db.query.organizations.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.organizations, organizationInsertSchema),
    update: updateHandler(schema.organizations, organizationInsertSchema),
    delete: deleteHandler(schema.organizations),
  },

  users: {
    findMany: (config) => db.query.users.findMany({}),
    findFirst: (config) => db.query.users.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.users, userInsertSchema),
    update: updateHandler(schema.users, userInsertSchema),
    delete: deleteHandler(schema.users),
  },

  accounts: {
    findMany: (config) => db.query.accounts.findMany({}),
    findFirst: (config) => db.query.accounts.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.accounts, accountInsertSchema),
    update: updateHandler(schema.accounts, accountInsertSchema),
    delete: deleteHandler(schema.accounts),
  },

  sessions: {
    findMany: (config) => db.query.sessions.findMany({}),
    findFirst: (config) => db.query.sessions.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.sessions, sessionInsertSchema),
    update: updateHandler(schema.sessions, sessionInsertSchema),
    delete: deleteHandler(schema.sessions),
  },

  verificationTokens: {
    findMany: (config) => db.query.verificationTokens.findMany({}),
    findFirst: (config) => db.query.verificationTokens.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.verificationTokens, verificationTokenInsertSchema),
    update: updateHandler(schema.verificationTokens, verificationTokenInsertSchema),
    delete: deleteHandler(schema.verificationTokens),
  },

  subscriptions: {
    findMany: (config) => db.query.subscriptions.findMany({}),
    findFirst: (config) => db.query.subscriptions.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.subscriptions, subscriptionInsertSchema),
    update: updateHandler(schema.subscriptions, subscriptionInsertSchema),
    delete: deleteHandler(schema.subscriptions),
  },

  featureLimits: {
    findMany: (config) => db.query.featureLimits.findMany({}),
    findFirst: (config) => db.query.featureLimits.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.featureLimits, featureLimitInsertSchema),
    update: updateHandler(schema.featureLimits, featureLimitInsertSchema),
    delete: deleteHandler(schema.featureLimits),
  },

  classes: {
    findMany: (config) => db.query.classes.findMany({}),
    findFirst: (config) => db.query.classes.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.classes, classeInsertSchema),
    update: updateHandler(schema.classes, classeInsertSchema),
    delete: deleteHandler(schema.classes),
  },

  students: {
    findMany: (config: Partial<CreateInputTypes["students"]>) => db.query.students.findMany({
      
    }),
    findFirst: (config) => db.query.students.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.students, studentInsertSchema),
    update: updateHandler(schema.students, studentInsertSchema),
    delete: deleteHandler(schema.students),
  },

  classStudents: {
    findMany: (config) => db.query.classStudents.findMany({}),
    findFirst: (config) => db.query.classStudents.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.classStudents, classStudentInsertSchema),
    update: updateHandler(schema.classStudents, classStudentInsertSchema),
    delete: deleteHandler(schema.classStudents),
  },

  assignments: {
    findMany: (config) => db.query.assignments.findMany({}),
    findFirst: (config) => db.query.assignments.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.assignments, assignmentInsertSchema),
    update: updateHandler(schema.assignments, assignmentInsertSchema),
    delete: deleteHandler(schema.assignments),
  },

  assignmentSubmissions: {
    findMany: (config) => db.query.assignmentSubmissions.findMany({}),
    findFirst: (config) => db.query.assignmentSubmissions.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.assignmentSubmissions, assignmentSubmissionInsertSchema),
    update: updateHandler(schema.assignmentSubmissions, assignmentSubmissionInsertSchema),
    delete: deleteHandler(schema.assignmentSubmissions),
  },

  grades: {
    findMany: (config) => db.query.grades.findMany({}),
    findFirst: (config) => db.query.grades.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.grades, gradeInsertSchema),
    update: updateHandler(schema.grades, gradeInsertSchema),
    delete: deleteHandler(schema.grades),
  },

  materials: {
    findMany: (config) => db.query.materials.findMany({}),
    findFirst: (config) => db.query.materials.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.materials, materialInsertSchema),
    update: updateHandler(schema.materials, materialInsertSchema),
    delete: deleteHandler(schema.materials),
  },

  lessonPlans: {
    findMany: (config) => db.query.lessonPlans.findMany({}),
    findFirst: (config) => db.query.lessonPlans.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.lessonPlans, lessonPlanInsertSchema),
    update: updateHandler(schema.lessonPlans, lessonPlanInsertSchema),
    delete: deleteHandler(schema.lessonPlans),
  },

  calendarEvents: {
    findMany: (config) => db.query.calendarEvents.findMany({}),
    findFirst: (config) => db.query.calendarEvents.findFirst(config),
    findUnique: undefined,
    create: createHandler(schema.calendarEvents, calendarEventInsertSchema),
    update: updateHandler(schema.calendarEvents, calendarEventInsertSchema),
    delete: deleteHandler(schema.calendarEvents),
  },
};
