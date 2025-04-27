import { relations } from "drizzle-orm";
import { users, organizations, subscriptions, classes, students, classStudents, assignments, assignmentSubmissions, grades, materials, lessonPlans, calendarEvents, chats } from "./tables";
  

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
    organization: one(organizations, {
      fields: [users.organizationId],
      references: [organizations.id],
    }),
    subscription: one(subscriptions, {
      fields: [users.id],
      references: [subscriptions.userId],
    }),
    classes: many(classes),
    students: many(students),
    materials: many(materials),
    lessonPlans: many(lessonPlans),
    calendarEvents: many(calendarEvents),
    assignments: many(assignments),
    grades: many(grades),
    chats: many(chats),}));
  
  export const organizationsRelations = relations(organizations, ({ many }) => ({
    users: many(users),
    subscriptions: many(subscriptions),
    classes: many(classes),
    students: many(students),
    materials: many(materials),
    lessonPlans: many(lessonPlans),
  }));
  
  export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
    user: one(users, {
      fields: [subscriptions.userId],
      references: [users.id],
    }),
    organization: one(organizations, {
      fields: [subscriptions.organizationId],
      references: [organizations.id],
    }),
  }));
  
  export const classesRelations = relations(classes, ({ one, many }) => ({
    teacher: one(users, {
      fields: [classes.userId],
      references: [users.id],
    }),
    organization: one(organizations, {
      fields: [classes.organizationId],
      references: [organizations.id],
    }),
    classStudents: many(classStudents),
    assignments: many(assignments),
    materials: many(materials),
    calendarEvents: many(calendarEvents),
  }));
  
  export const studentsRelations = relations(students, ({ one, many }) => ({
    teacher: one(users, {
      fields: [students.userId],
      references: [users.id],
    }),
    organization: one(organizations, {
      fields: [students.organizationId],
      references: [organizations.id],
    }),
    classStudents: many(classStudents),
    assignmentSubmissions: many(assignmentSubmissions),
    grades: many(grades),
  }));
  
  export const classStudentsRelations = relations(classStudents, ({ one }) => ({
    class: one(classes, {
      fields: [classStudents.classId],
      references: [classes.id],
    }),
    student: one(students, {
      fields: [classStudents.studentId],
      references: [students.id],
    }),
  }));
  
  export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
    class: one(classes, {
      fields: [assignments.classId],
      references: [classes.id],
    }),
    teacher: one(users, {
      fields: [assignments.userId],
      references: [users.id],
    }),
    submissions: many(assignmentSubmissions),
    grades: many(grades),
    calendarEvents: many(calendarEvents),
  }));
  
  export const assignmentSubmissionsRelations = relations(
    assignmentSubmissions,
    ({ one }) => ({
      assignment: one(assignments, {
        fields: [assignmentSubmissions.assignmentId],
        references: [assignments.id],
      }),
      student: one(students, {
        fields: [assignmentSubmissions.studentId],
        references: [students.id],
      }),
      gradedByUser: one(users, {
        fields: [assignmentSubmissions.gradedBy],
        references: [users.id],
      }),
    })
  );
  
  export const gradesRelations = relations(grades, ({ one }) => ({
    student: one(students, {
      fields: [grades.studentId],
      references: [students.id],
    }),
    class: one(classes, {
      fields: [grades.classId],
      references: [classes.id],
    }),
    assignment: one(assignments, {
      fields: [grades.assignmentId],
      references: [assignments.id],
    }),
    teacher: one(users, {
      fields: [grades.userId],
      references: [users.id],
    }),
  }));
  
  export const materialsRelations = relations(materials, ({ one }) => ({
    teacher: one(users, {
      fields: [materials.userId],
      references: [users.id],
    }),
    class: one(classes, {
      fields: [materials.classId],
      references: [classes.id],
    }),
    organization: one(organizations, {
      fields: [materials.organizationId],
      references: [organizations.id],
    }),
  }));
  
  export const lessonPlansRelations = relations(lessonPlans, ({ one }) => ({
    teacher: one(users, {
      fields: [lessonPlans.userId],
      references: [users.id],
    }),
    organization: one(organizations, {
      fields: [lessonPlans.organizationId],
      references: [organizations.id],
    }),
    class: one(classes, {
      fields: [lessonPlans.classId],
      references: [classes.id]
    })
  }));
  
  export const calendarEventsRelations = relations(calendarEvents, ({ one }) => ({
    teacher: one(users, {
      fields: [calendarEvents.userId],
      references: [users.id],
    }),
    class: one(classes, {
      fields: [calendarEvents.classId],
      references: [classes.id],
    }),
    assignment: one(assignments, {
      fields: [calendarEvents.assignmentId],
      references: [assignments.id],
    }),
  }));
  