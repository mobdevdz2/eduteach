import { seed } from "drizzle-seed";
import { db } from "@/db/";
import * as schema from "@/db/schema";

await seed(db, schema, { count: 1000 }).refine((funcs) => ({
  organizations: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      name: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      domain: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      logo: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      ownerId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      maxUsers: funcs.valuesFromArray({ values: [1, 2, 3, 4, 5], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
users: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      name: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      email: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      emailVerified: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      image: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      firstName: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      lastName: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      passwordHash: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      role: funcs.valuesFromArray({ values: ["teacher", "admin", "department_head", "school_admin"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      stripeCustomerId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      organizationId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      lastLoginAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
accounts: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      userId: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      type: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      provider: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      providerAccountId: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      refresh_token: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      access_token: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      expires_at: funcs.valuesFromArray({ values: [1, 2, 3, 4, 5], isUnique: false }),
      token_type: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      scope: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      id_token: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      session_state: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      oauth_token_secret: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      oauth_token: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
sessions: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      sessionToken: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      userId: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      expires: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
verificationTokens: {
    columns: {
      identifier: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      token: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      expires: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
subscriptions: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      userId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      organizationId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      plan: funcs.valuesFromArray({ values: ["starter", "professional", "school"], isUnique: false }),
      status: funcs.valuesFromArray({ values: ["active", "canceled", "incomplete", "incomplete_expired", "past_due", "trialing", "unpaid"], isUnique: false }),
      currentPeriodStart: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      currentPeriodEnd: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      cancelAtPeriodEnd: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      stripeCustomerId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      stripeSubscriptionId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
featureLimits: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      plan: funcs.valuesFromArray({ values: ["starter", "professional", "school"], isUnique: false }),
      maxClasses: funcs.valuesFromArray({ values: [1, 2, 3, 4, 5], isUnique: false }),
      maxStudentsPerClass: funcs.valuesFromArray({ values: [1, 2, 3, 4, 5], isUnique: false }),
      maxStorageGB: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      advancedGrading: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      lessonPlanning: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      studentAnalytics: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      parentCommunication: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      adminDashboard: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      departmentAnalytics: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      customIntegrations: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      prioritySupport: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
classes: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      name: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      subject: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      gradeLevel: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      academicYear: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      schedule: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      room: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      capacity: funcs.valuesFromArray({ values: [1, 2, 3, 4, 5], isUnique: false }),
      description: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      isActive: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      userId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      organizationId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
students: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      firstName: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      lastName: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      email: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      dateOfBirth: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      gender: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      enrollmentDate: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      previousSchool: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      specialNeeds: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      notes: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      address: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      emergencyContact: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      emergencyPhone: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      relationship: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      userId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      organizationId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
classStudents: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      classId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      studentId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      enrollmentDate: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
assignments: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      title: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      type: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      classId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      dueDate: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      totalPoints: funcs.valuesFromArray({ values: [1, 2, 3, 4, 5], isUnique: false }),
      estimatedTime: funcs.valuesFromArray({ values: [1, 2, 3, 4, 5], isUnique: false }),
      instructions: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      allowLateSubmissions: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      timeLimit: funcs.valuesFromArray({ values: [1, 2, 3, 4, 5], isUnique: false }),
      status: funcs.valuesFromArray({ values: ["draft", "published", "graded", "archived"], isUnique: false }),
      resources: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      userId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
assignmentSubmissions: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      assignmentId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      studentId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      submissionDate: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      score: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      feedback: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      content: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      comments: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      attachments: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      isLate: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      gradedBy: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      gradedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
grades: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      studentId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      classId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      assignmentId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      score: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      maxScore: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      comments: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      userId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
materials: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      name: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      type: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      subject: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      gradeLevel: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      classId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      description: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      fileUrl: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      fileSize: funcs.valuesFromArray({ values: [1, 2, 3, 4, 5], isUnique: false }),
      fileType: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      shareWithStudents: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      shareWithTeachers: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      tags: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      userId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      organizationId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
lessonPlans: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      title: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      subject: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      gradeLevel: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      duration: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      date: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      classId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      status: funcs.valuesFromArray({ values: ["draft", "complete", "archived"], isUnique: false }),
      objectives: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      materials: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      introduction: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      mainActivity: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      conclusion: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      assessment: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      notes: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      userId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      organizationId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      procedure: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
calendarEvents: {
    columns: {
      id: funcs.valuesFromArray({ values: [funcs.uuid(), funcs.uuid()], isUnique: true }),
      title: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      description: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      startDate: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      endDate: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      allDay: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      location: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      type: funcs.valuesFromArray({ values: ["class", "assignment", "exam", "meeting", "personal"], isUnique: false }),
      classId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      assignmentId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      lessonPlanId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      color: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      userId: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      recurrenceRule: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      isRecurring: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      visibility: funcs.valuesFromArray({ values: ["public", "private", "organization"], isUnique: false }),
      reminders: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false }),
      createdAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      updatedAt: funcs.valuesFromArray({ values: [funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31"), funcs.randomDate("2020-01-01", "2025-12-31")], isUnique: false }),
      enableRLS: funcs.valuesFromArray({ values: ["Sample A", "Sample B", "Sample C"], isUnique: false })
    },
  },
}));
