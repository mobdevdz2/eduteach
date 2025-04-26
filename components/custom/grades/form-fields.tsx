import React from "react";
import {
  BaseInputProps,
  StringInput,
  NumberInput,
  CheckboxInput,
  SelectInput,
  DateInput,
  TextInput,
} from "@/components/shared/form-inputs";
import { StudentsSelectorField } from "@/components/shared/entity-selector";
import { Students } from "@/types/entities";
import { ClassesSelectorField } from "@/components/shared/entity-selector";
import { Classes } from "@/types/entities";
import { AssignmentsSelectorField } from "@/components/shared/entity-selector";
import { Assignments } from "@/types/entities";
import { UsersSelectorField } from "@/components/shared/entity-selector";
import { Users } from "@/types/entities";

interface GradesFormProps extends BaseInputProps {
  data?: {
    students?: Students[];
    classes?: Classes[];
    assignments?: Assignments[];
    users?: Users[];
  };
}

const GradesForm = () => {
  return;
};

const IdField = ({
  form,
  data,
  name = "id",
  label = "Id",
}: GradesFormProps) => {
  return (
    <StringInput form={form} name={name} label={label} placeholder="Enter id" />
  );
};
IdField.displayName = "GradesForm.IdField";
GradesForm.IdField = IdField;

const StudentIdField = ({
  form,
  data,
  name = "studentId",
  label = "StudentId",
}: GradesFormProps) => {
  return (
    <StudentsSelectorField
      form={form}
      name={name}
      label={label}
      placeholder="Select students"
      options={data?.students || []}
    />
  );
};
StudentIdField.displayName = "GradesForm.StudentIdField";
GradesForm.StudentIdField = StudentIdField;

const ClassIdField = ({
  form,
  data,
  name = "classId",
  label = "ClassId",
}: GradesFormProps) => {
  return (
    <ClassesSelectorField
      form={form}
      name={name}
      label={label}
      placeholder="Select classes"
      options={data?.classes || []}
    />
  );
};
ClassIdField.displayName = "GradesForm.ClassIdField";
GradesForm.ClassIdField = ClassIdField;

const AssignmentIdField = ({
  form,
  data,
  name = "assignmentId",
  label = "AssignmentId",
}: GradesFormProps) => {
  return (
    <AssignmentsSelectorField
      form={form}
      name={name}
      label={label}
      placeholder="Select assignments"
      options={data?.assignments || []}
    />
  );
};
AssignmentIdField.displayName = "GradesForm.AssignmentIdField";
GradesForm.AssignmentIdField = AssignmentIdField;

const ScoreField = ({
  form,
  data,
  name = "score",
  label = "Score",
}: GradesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter score"
    />
  );
};
ScoreField.displayName = "GradesForm.ScoreField";
GradesForm.ScoreField = ScoreField;

const MaxScoreField = ({
  form,
  data,
  name = "maxScore",
  label = "MaxScore",
}: GradesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter maxScore"
    />
  );
};
MaxScoreField.displayName = "GradesForm.MaxScoreField";
GradesForm.MaxScoreField = MaxScoreField;

const CommentsField = ({
  form,
  data,
  name = "comments",
  label = "Comments",
}: GradesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter comments"
    />
  );
};
CommentsField.displayName = "GradesForm.CommentsField";
GradesForm.CommentsField = CommentsField;

const UserIdField = ({
  form,
  data,
  name = "userId",
  label = "UserId",
}: GradesFormProps) => {
  return (
    <UsersSelectorField
      form={form}
      name={name}
      label={label}
      placeholder="Select users"
      options={data?.users || []}
    />
  );
};
UserIdField.displayName = "GradesForm.UserIdField";
GradesForm.UserIdField = UserIdField;

const CreatedAtField = ({
  form,
  data,
  name = "createdAt",
  label = "CreatedAt",
}: GradesFormProps) => {
  return <DateInput form={form} name={name} label={label} />;
};
CreatedAtField.displayName = "GradesForm.CreatedAtField";
GradesForm.CreatedAtField = CreatedAtField;

const UpdatedAtField = ({
  form,
  data,
  name = "updatedAt",
  label = "UpdatedAt",
}: GradesFormProps) => {
  return <DateInput form={form} name={name} label={label} />;
};
UpdatedAtField.displayName = "GradesForm.UpdatedAtField";
GradesForm.UpdatedAtField = UpdatedAtField;

const EnableRLSField = ({
  form,
  data,
  name = "enableRLS",
  label = "EnableRLS",
}: GradesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter enableRLS"
    />
  );
};
EnableRLSField.displayName = "GradesForm.EnableRLSField";
GradesForm.EnableRLSField = EnableRLSField;

export default GradesForm;
