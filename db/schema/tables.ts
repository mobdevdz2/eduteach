/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
    bigint,
    boolean,
    date,
    decimal,
    index,
    integer,
    json,
    jsonb,
    pgSchema,
    pgTable,
    primaryKey,
    text,
    timestamp,
    unique,
    uuid,
  } from "drizzle-orm/pg-core";
import { assignmentStatusEnum, eventTypeEnum, eventVisibilityEnum, lessonPlanStatusEnum, subscriptionPlanEnum, subscriptionStatusEnum, userRoleEnum } from "./enums";
  


const nextAuthSchema = pgSchema("next_auth");


  // Organizations (for School plan)
  export const organizations = nextAuthSchema.table(
    "organizations",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      name: text("name").notNull(),
      domain: text("domain"),
      logo: text("logo"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
      ownerId: uuid("owner_id"),
      maxUsers: integer("max_users").default(50),
    },
    // @ts-ignore
    (table) => {
      return [index("domain_idx").on(table.domain)];
    }
  );
  
  export const users = nextAuthSchema.table(
    "users",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      name: text("name"),
      assistantId: text("assistant_id"),
      email: text("email").notNull().unique(),
      emailVerified: timestamp("emailVerified", { withTimezone: true }),
      image: text("image"),
      firstName: text("first_name").notNull(),
      lastName: text("last_name").notNull(),
      passwordHash: text("password_hash").notNull(),
      role: userRoleEnum("role").notNull().default("teacher"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
      stripeCustomerId: uuid("stripe_customer_id"),
      organizationId: uuid("organization_id").references(() => organizations.id, {
        onDelete: "set null",
      }),
      lastLoginAt: timestamp("last_login_at"),
    },
    // @ts-ignore
    // @ts-ignore
    (table) => {
      return [
        index("email_idx").on(table.email),
        index("organization_idx").on(table.organizationId),
      ];
    }
  );
  
  export const accounts = nextAuthSchema.table(
    "accounts",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      userId: uuid("userId")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      provider: text("provider").notNull(),
      providerAccountId: text("providerAccountId").notNull(),
      refresh_token: text("refresh_token"),
      access_token: text("access_token"),
      expires_at: bigint("expires_at", { mode: "number" }),
      token_type: text("token_type"),
      scope: text("scope"),
      id_token: text("id_token"),
      session_state: text("session_state"),
      oauth_token_secret: text("oauth_token_secret"),
      oauth_token: text("oauth_token"),
    },
     // @ts-ignore
    (table) => [
      unique("provider_unique").on(table.provider, table.providerAccountId),
    ]
  );



  
  export const sessions = nextAuthSchema.table("sessions", {
    id: uuid("id").defaultRandom().primaryKey(),
    sessionToken: text("sessionToken").notNull().unique(),
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
  });
  
  export const verificationTokens = nextAuthSchema.table(
    "verification_tokens",
    {
      identifier: text("identifier").notNull(),
      token: text("token").notNull(),
      expires: timestamp("expires", { withTimezone: true }).notNull(),
    },
     // @ts-ignore
    (table) => [
      primaryKey({ columns: [table.identifier, table.token] }),
      unique("token_unique").on(table.token),
    ]
  );
  
  // Helper for creating unique constraints
  // function unique(name: string) {
  //   return {
  //     name,
  //     columns: [] as ColumnBaseConfig<ColumnDataType, string>[],
  //     on: function (...columns: ColumnBaseConfig<ColumnDataType, string>[]) {
  //       this.columns = columns;
  //       return this;
  //     },
  //   };
  // }
  

// Subscriptions
export const subscriptions = pgTable(
    "subscriptions",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      organizationId: uuid("organization_id").references(() => organizations.id, {
        onDelete: "cascade",
      }),
      plan: subscriptionPlanEnum("plan").notNull(),
      status: subscriptionStatusEnum("status").notNull(),
      currentPeriodStart: timestamp("current_period_start").notNull(),
      currentPeriodEnd: timestamp("current_period_end").notNull(),
      cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
      stripeCustomerId: text("stripe_customer_id"),
      stripeSubscriptionId: text("stripe_subscription_id"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    // @ts-ignore
    (table) => {
      return [
        index("user_idx").on(table.userId),
        index("subscription_organization_idx").on(
          table.organizationId
        ),
      ];
    }
  );
  
  // Feature Limits (based on subscription plan)
  export const featureLimits = pgTable("feature_limits", {
    id: uuid("id").defaultRandom().primaryKey(),
    plan: subscriptionPlanEnum("plan").notNull(),
    maxClasses: integer("max_classes").notNull(),
    maxStudentsPerClass: integer("max_students_per_class").notNull(),
    maxStorageGB: decimal("max_storage_gb").notNull(),
    advancedGrading: boolean("advanced_grading").notNull(),
    lessonPlanning: boolean("lesson_planning").notNull(),
    studentAnalytics: boolean("student_analytics").notNull(),
    parentCommunication: boolean("parent_communication").notNull(),
    adminDashboard: boolean("admin_dashboard").notNull(),
    departmentAnalytics: boolean("department_analytics").notNull(),
    customIntegrations: boolean("custom_integrations").notNull(),
    prioritySupport: boolean("priority_support").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });
  
  // Classes
  export const classes = pgTable(
    "classes",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      name: text("name").notNull(),
      subject: text("subject").notNull(),
      gradeLevel: text("grade_level").notNull(),
      academicYear: text("academic_year").notNull(),
      schedule: text("schedule"),
      room: text("room"),
      capacity: integer("capacity"),
      description: text("description"),
      isActive: boolean("is_active").default(true),
      userId: uuid("teacher_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      organizationId: uuid("organization_id").references(() => organizations.id),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    // @ts-ignore
    (table) => {
      return [
        index("teacher_idx").on(table.userId),
        index("class_organization_idx").on(table.organizationId),
      ];
    }
  );
  
  // Students
  export const students = pgTable(
    "students",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      firstName: text("first_name").notNull(),
      lastName: text("last_name").notNull(),
      email: text("email"),
      dateOfBirth: date("date_of_birth"),
      gender: text("gender"),
      enrollmentDate: date("enrollment_date"),
      previousSchool: text("previous_school"),
      specialNeeds: boolean("special_needs").default(false),
      notes: text("notes"),
      address: text("address"),
      emergencyContact: text("emergency_contact"),
      emergencyPhone: text("emergency_phone"),
      relationship: text("relationship"),
      userId: uuid("teacher_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      organizationId: uuid("organization_id").references(() => organizations.id),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    // @ts-ignore
    (table) => {
      return [
        index("student_id_idx").on(table.id),
        index("student_teacher_idx").on(table.userId),
        index("student_organization_idx").on(table.organizationId),
      ];
    }
  );
  
  // Class-Student relationship (many-to-many)
  export const classStudents = pgTable(
    "class_students",
    {
      id: uuid("id"),
      classId: uuid("class_id")
        .notNull()
        .references(() => classes.id, { onDelete: "cascade" }),
      studentId: uuid("student_id")
        .notNull()
        .references(() => students.id, { onDelete: "cascade" }),
      enrollmentDate: date("enrollment_date").defaultNow().notNull(),
    },
    // @ts-ignore
    (table) => {
      return [
        primaryKey({ columns: [table.classId, table.studentId] }),
        index("class_student_class_idx").on(table.classId),
        index("class_student_student_idx").on(table.studentId),
      ];
    }
  );
  
  // Assignments
  export const assignments = pgTable(
    "assignments",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      title: text("title").notNull(),
      type: text("type").notNull(), // homework, quiz, test, project
      classId: uuid("class_id")
        .notNull()
        .references(() => classes.id, { onDelete: "cascade" }),
      dueDate: timestamp("due_date").notNull(),
      totalPoints: integer("total_points").notNull(),
      estimatedTime: integer("estimated_time"),
      instructions: text("instructions").notNull(),
      allowLateSubmissions: boolean("allow_late_submissions").default(false),
      timeLimit: integer("time_limit"),
      status: assignmentStatusEnum("status").default("draft").notNull(),
      resources: json("resources"),
      userId: uuid("teacher_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      createdAt: timestamp("created_at").notNull().defaultNow(),
      updatedAt: timestamp("updated_at").notNull().defaultNow(),
    },
    // @ts-ignore
    (table) => {
      return [
        index("assignment_class_idx").on(table.classId),
        index("assignment_teacher_idx").on(table.userId),
      ];
    }
  );
  
  // Assignment Submissions
  export const assignmentSubmissions = pgTable(
    "assignment_submissions",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      assignmentId: uuid("assignment_id")
        .notNull()
        .references(() => assignments.id, { onDelete: "cascade" }),
      studentId: uuid("student_id")
        .notNull()
        .references(() => students.id, { onDelete: "cascade" }),
      submissionDate: timestamp("submission_date").defaultNow().notNull(),
      score: decimal("score"),
      feedback: text("feedback"),
      content: text("content"),
      comments: json("comments"), // Array of comment objects with author, text, timestamp
      attachments: json("attachments"),
      isLate: boolean("is_late").default(false),
      gradedBy: uuid("graded_by").references(() => users.id),
      gradedAt: timestamp("graded_at"),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    // @ts-ignore
    (table) => {
      return [
        index("submission_assignment_idx").on(table.assignmentId),
        index("submission_student_idx").on(table.studentId),
      ];
    }
  );
  
  // Grades
  export const grades = pgTable(
    "grades",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      studentId: uuid("student_id")
        .notNull()
        .references(() => students.id, { onDelete: "cascade" }),
      classId: uuid("class_id")
        .notNull()
        .references(() => classes.id, { onDelete: "cascade" }),
      assignmentId: uuid("assignment_id").references(() => assignments.id, {
        onDelete: "set null",
      }),
      score: decimal("score").notNull(),
      maxScore: decimal("max_score").notNull(),
      comments: text("comments"),
      userId: uuid("teacher_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    // @ts-ignore
    (table) => ([
      index("grade_student_idx").on(table.studentId),
      index("grade_class_idx").on(table.classId),
      index("grade_assignment_idx").on(table.assignmentId),
      index("grade_teacher_idx").on(table.userId),
    ]))
  
  // Teaching Materials
  export const materials = pgTable(
    "materials",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      name: text("name").notNull(),
      type: text("type").notNull(), // lesson-plan, worksheet, presentation, document, image, video, audio
      subject: text("subject").notNull(),
      gradeLevel: text("grade_level").notNull(),
      classId: uuid("class_id").references(() => classes.id, {
        onDelete: "set null",
      }),
      description: text("description"),
      fileUrl: text("file_url").notNull(),
      fileSize: integer("file_size").notNull(),
      fileType: text("file_type").notNull(),
      shareWithStudents: boolean("share_with_students").default(false),
      shareWithTeachers: boolean("share_with_teachers").default(false),
      tags: json("tags"),
      userId: uuid("teacher_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      organizationId: uuid("organization_id").references(() => organizations.id),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    // @ts-ignore
    (table) => {
      return [
        index("material_teacher_idx").on(table.userId),
        index("material_class_idx").on(table.classId),
        index("material_organization_idx").on(table.organizationId),
      ];
    }
  );
  
  // Lesson Plans
  export const lessonPlans = pgTable(
    "lesson_plans",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      title: text("title").notNull(),
      subject: text("subject").notNull(),
      gradeLevel: text("grade_level").notNull(),
      duration: text("duration").notNull(),
      date: date("date").defaultNow().notNull(),
      classId: uuid("class").references(() => classes.id),
      status: lessonPlanStatusEnum("status").default("draft"),
      objectives: json("objectives").$type<string[]>().notNull(),
      materials: json("materials").$type<string[]>().notNull(),
      introduction: text("introduction").notNull(),
      mainActivity: text("main_activity").notNull(),
      conclusion: text("conclusion").notNull(),
      assessment: text("assessment").notNull(),
      notes: text("notes"),
      userId: uuid("teacher_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      organizationId: uuid("organization_id").references(() => organizations.id),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
      procedure: jsonb("procedure").$type<{
        introduction?: string,
        mainActivity?: string,
        conclusion?: string,
      }>().notNull().default({})
    },
    // @ts-ignore
    (table) => {
      return [
        index("lesson_plan_teacher_idx").on(table.userId),
        index("lesson_plan_class_idx").on(table.classId),
  
        index("lesson_plan_organization_idx").on(table.organizationId),
      ];
    }
  );
  
  export const chats = pgTable(
    "chats",
    {
      id: uuid("id").defaultRandom().primaryKey(),
      name: text("name").notNull(),
      openaiThreadId: text("openai_thread_id").notNull(),
      userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
      createdAt: timestamp("created_at").defaultNow().notNull(),
      updatedAt: timestamp("updated_at").defaultNow().notNull(),
      lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
      isArchived: boolean("is_archived").default(false),
      category: text("category"),
    })
  
  // Calendar Events
  export const calendarEvents = pgTable("calendar_events", {
    id: uuid("id").defaultRandom().primaryKey(),
    text: text("title").notNull(),
    description: text("description"),
    start: timestamp("start_date").notNull(),
    end: timestamp("end_date").notNull(),
    allDay: boolean("all_day").default(false).notNull(),
    location: text("location"),
    type: eventTypeEnum("type").notNull().default("class"),
    classId: uuid("class_id").references(() => classes.id, { onDelete: "set null" }),
    assignmentId: uuid("assignment_id").references(() => assignments.id, { onDelete: "set null" }),
    lessonPlanId: uuid("lesson_plan_id").references(() => lessonPlans.id, { onDelete: "set null" }),
    color: text("color"),
    userId: uuid("teacher_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    recurrenceRule: text("recurrence_rule"), // For recurring events
    isRecurring: boolean("is_recurring").default(false),
    visibility: eventVisibilityEnum("event_visibility").default("private").notNull(),
    reminders: json("reminders").default([]).$type<Reminder[]>(), // Array of reminder settings
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  })


  export interface Reminder {
    time: number;
    unit: "minutes" | "hours" | "days";
    method: "email" | "notification";
  }

