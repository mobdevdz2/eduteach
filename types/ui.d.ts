import { UseFormReturn } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { organizations, users, accounts, sessions, verificationTokens, subscriptions, featureLimits, classes, students, classStudents, assignments, assignmentSubmissions, grades, materials, lessonPlans, calendarEvents } from "@/db/schema";


// Schema definition
const schema = {
  organizations,
  users,
  accounts,
  sessions,
  verificationTokens,
  subscriptions,
  featureLimits,
  classes,
  students,
  classStudents,
  assignments,
  assignmentSubmissions,
  grades,
  materials,
  lessonPlans,
  calendarEvents,
};

type Schema = typeof schema;
type WritableSchemaData = {
  [Key in keyof Schema]?: Array<
    Schema[Key] extends { $inferSelect: infer U } ? U : never
  >;
};

// Form Fields
export type FormFields<T extends FieldValues> = {
  [K in keyof T as K extends string
    ? `${Capitalize<K>}Field`
    : never]: (props: {
    form: UseFormReturn<T>;
    data?: WritableSchemaData;
  }) => React.ReactNode;
};

// Selectors




export type SelectorField<T extends FieldValues> = (props: {
  form: UseFormReturn<T>;
  data?: WritableSchemaData;
}) => React.ReactNode;

export type MultiSelectorField<T extends FieldValues> = (props: {
  form: UseFormReturn<T>;
  data?: WritableSchemaData;
}) => React.ReactNode;

// Select Entities
export type SelectEntities = {
  Organizations: Organizations;
  Teacher: User;
  Accounts: Accounts;
  Sessions: Sessions;
  VerificationTokens: VerificationTokens;
  Subscriptions: Subscriptions;
  FeatureLimits: FeatureLimits;
  Classes: Classes;
  Students: Students;
  ClassStudents: ClassStudents;
  Assignments: Assignments;
  AssignmentSubmissions: AssignmentSubmissions;
  Grades: Grades;
  Materials: Materials;
  LessonPlans: LessonPlans;
  CalendarEvents: CalendarEvents;
};

export type SelectorFields<T extends FieldValues> = {
  [K in keyof T as K extends string
    ? `${Capitalize<K>}SelectorField`
    : never]: (props: {
    form: UseFormReturn<T>;
    data?: T[K];
  }) => React.ReactNode;
};

export type MultiSelectorFields<T extends FieldValues> = {
  [K in keyof T as K extends string
    ? `${Capitalize<K>}MultiSelectorField`
    : never]: (props: {
    form: UseFormReturn<T>;
    data?: WritableSchemaData;
  }) => React.ReactNode;
};