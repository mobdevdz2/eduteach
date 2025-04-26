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
import { UsersSelectorField } from "@/components/shared/entity-selector";
import { Users } from "@/types/entities";

interface ClassesFormProps extends BaseInputProps {
  data?: {
    users?: Users[];
  };
}

const ClassesForm = () => {
  return;
};

const IdField = ({
  form,
  data,
  name = "id",
  label = "Id",
}: ClassesFormProps) => {
  return (
    <StringInput form={form} name={name} label={label} placeholder="Enter id" />
  );
};
IdField.displayName = "ClassesForm.IdField";
ClassesForm.IdField = IdField;

const NameField = ({
  form,
  data,
  name = "name",
  label = "Name",
}: ClassesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter name"
    />
  );
};
NameField.displayName = "ClassesForm.NameField";
ClassesForm.NameField = NameField;

const SubjectField = ({
  form,
  data,
  name = "subject",
  label = "Subject",
}: ClassesFormProps) => {
  return (
    <SelectInput
      form={form}
      name={name}
      label={label}
      options={[
        { value: "mathematics", label: "Mathematics" },
        { value: "science", label: "Science" },
        { value: "english", label: "English" },
        { value: "history", label: "History" },
        { value: "geography", label: "Geography" },
        { value: "art", label: "Art" },
        { value: "music", label: "Music" },
        { value: "physical_education", label: "Physical Education" },
      ]}
      placeholder="Select subject"
    />
  );
};
SubjectField.displayName = "ClassesForm.SubjectField";
ClassesForm.SubjectField = SubjectField;

const GradeLevelField = ({
  form,
  data,
  name = "gradeLevel",
  label = "GradeLevel",
}: ClassesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter gradeLevel"
    />
  );
};
GradeLevelField.displayName = "ClassesForm.GradeLevelField";
ClassesForm.GradeLevelField = GradeLevelField;

const AcademicYearField = ({
  form,
  data,
  name = "academicYear",
  label = "AcademicYear",
}: ClassesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter academicYear"
    />
  );
};
AcademicYearField.displayName = "ClassesForm.AcademicYearField";
ClassesForm.AcademicYearField = AcademicYearField;

const ScheduleField = ({
  form,
  data,
  name = "schedule",
  label = "Schedule",
}: ClassesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter schedule"
    />
  );
};
ScheduleField.displayName = "ClassesForm.ScheduleField";
ClassesForm.ScheduleField = ScheduleField;

const RoomField = ({
  form,
  data,
  name = "room",
  label = "Room",
}: ClassesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter room"
    />
  );
};
RoomField.displayName = "ClassesForm.RoomField";
ClassesForm.RoomField = RoomField;

const CapacityField = ({
  form,
  data,
  name = "capacity",
  label = "Capacity",
}: ClassesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter capacity"
    />
  );
};
CapacityField.displayName = "ClassesForm.CapacityField";
ClassesForm.CapacityField = CapacityField;

const DescriptionField = ({
  form,
  data,
  name = "description",
  label = "Description",
}: ClassesFormProps) => {
  return (
    <TextInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter description"
      rows={3}
    />
  );
};
DescriptionField.displayName = "ClassesForm.DescriptionField";
ClassesForm.DescriptionField = DescriptionField;

const IsActiveField = ({
  form,
  data,
  name = "isActive",
  label = "IsActive",
}: ClassesFormProps) => {
  return <CheckboxInput form={form} name={name} label={label} />;
};
IsActiveField.displayName = "ClassesForm.IsActiveField";
ClassesForm.IsActiveField = IsActiveField;

const UserIdField = ({
  form,
  data,
  name = "userId",
  label = "UserId",
}: ClassesFormProps) => {
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
UserIdField.displayName = "ClassesForm.UserIdField";
ClassesForm.UserIdField = UserIdField;

const OrganizationIdField = ({
  form,
  data,
  name = "organizationId",
  label = "OrganizationId",
}: ClassesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter organizationId"
    />
  );
};
OrganizationIdField.displayName = "ClassesForm.OrganizationIdField";
ClassesForm.OrganizationIdField = OrganizationIdField;

const CreatedAtField = ({
  form,
  data,
  name = "createdAt",
  label = "CreatedAt",
}: ClassesFormProps) => {
  return <DateInput form={form} name={name} label={label} />;
};
CreatedAtField.displayName = "ClassesForm.CreatedAtField";
ClassesForm.CreatedAtField = CreatedAtField;

const UpdatedAtField = ({
  form,
  data,
  name = "updatedAt",
  label = "UpdatedAt",
}: ClassesFormProps) => {
  return <DateInput form={form} name={name} label={label} />;
};
UpdatedAtField.displayName = "ClassesForm.UpdatedAtField";
ClassesForm.UpdatedAtField = UpdatedAtField;

const EnableRLSField = ({
  form,
  data,
  name = "enableRLS",
  label = "EnableRLS",
}: ClassesFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter enableRLS"
    />
  );
};
EnableRLSField.displayName = "ClassesForm.EnableRLSField";
ClassesForm.EnableRLSField = EnableRLSField;

export default ClassesForm;
