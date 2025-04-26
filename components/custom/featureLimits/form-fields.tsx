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

interface FeatureLimitsFormProps extends BaseInputProps {
  data?: {};
}

const FeatureLimitsForm = () => {
  return;
};

const IdField = ({
  form,
  data,
  name = "id",
  label = "Id",
}: FeatureLimitsFormProps) => {
  return (
    <StringInput form={form} name={name} label={label} placeholder="Enter id" />
  );
};
IdField.displayName = "FeatureLimitsForm.IdField";
FeatureLimitsForm.IdField = IdField;

const PlanField = ({
  form,
  data,
  name = "plan",
  label = "Plan",
}: FeatureLimitsFormProps) => {
  return (
    <SelectInput
      form={form}
      name={name}
      label={label}
      options={[
        { value: "starter", label: "Starter" },
        { value: "professional", label: "Professional" },
        { value: "school", label: "School" },
      ]}
      placeholder="Select plan"
    />
  );
};
PlanField.displayName = "FeatureLimitsForm.PlanField";
FeatureLimitsForm.PlanField = PlanField;

const MaxClassesField = ({
  form,
  data,
  name = "maxClasses",
  label = "MaxClasses",
}: FeatureLimitsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter maxClasses"
    />
  );
};
MaxClassesField.displayName = "FeatureLimitsForm.MaxClassesField";
FeatureLimitsForm.MaxClassesField = MaxClassesField;

const MaxStudentsPerClassField = ({
  form,
  data,
  name = "maxStudentsPerClass",
  label = "MaxStudentsPerClass",
}: FeatureLimitsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter maxStudentsPerClass"
    />
  );
};
MaxStudentsPerClassField.displayName =
  "FeatureLimitsForm.MaxStudentsPerClassField";
FeatureLimitsForm.MaxStudentsPerClassField = MaxStudentsPerClassField;

const MaxStorageGBField = ({
  form,
  data,
  name = "maxStorageGB",
  label = "MaxStorageGB",
}: FeatureLimitsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter maxStorageGB"
    />
  );
};
MaxStorageGBField.displayName = "FeatureLimitsForm.MaxStorageGBField";
FeatureLimitsForm.MaxStorageGBField = MaxStorageGBField;

const AdvancedGradingField = ({
  form,
  data,
  name = "advancedGrading",
  label = "AdvancedGrading",
}: FeatureLimitsFormProps) => {
  return <CheckboxInput form={form} name={name} label={label} />;
};
AdvancedGradingField.displayName = "FeatureLimitsForm.AdvancedGradingField";
FeatureLimitsForm.AdvancedGradingField = AdvancedGradingField;

const LessonPlanningField = ({
  form,
  data,
  name = "lessonPlanning",
  label = "LessonPlanning",
}: FeatureLimitsFormProps) => {
  return <CheckboxInput form={form} name={name} label={label} />;
};
LessonPlanningField.displayName = "FeatureLimitsForm.LessonPlanningField";
FeatureLimitsForm.LessonPlanningField = LessonPlanningField;

const StudentAnalyticsField = ({
  form,
  data,
  name = "studentAnalytics",
  label = "StudentAnalytics",
}: FeatureLimitsFormProps) => {
  return <CheckboxInput form={form} name={name} label={label} />;
};
StudentAnalyticsField.displayName = "FeatureLimitsForm.StudentAnalyticsField";
FeatureLimitsForm.StudentAnalyticsField = StudentAnalyticsField;

const ParentCommunicationField = ({
  form,
  data,
  name = "parentCommunication",
  label = "ParentCommunication",
}: FeatureLimitsFormProps) => {
  return <CheckboxInput form={form} name={name} label={label} />;
};
ParentCommunicationField.displayName =
  "FeatureLimitsForm.ParentCommunicationField";
FeatureLimitsForm.ParentCommunicationField = ParentCommunicationField;

const AdminDashboardField = ({
  form,
  data,
  name = "adminDashboard",
  label = "AdminDashboard",
}: FeatureLimitsFormProps) => {
  return <CheckboxInput form={form} name={name} label={label} />;
};
AdminDashboardField.displayName = "FeatureLimitsForm.AdminDashboardField";
FeatureLimitsForm.AdminDashboardField = AdminDashboardField;

const DepartmentAnalyticsField = ({
  form,
  data,
  name = "departmentAnalytics",
  label = "DepartmentAnalytics",
}: FeatureLimitsFormProps) => {
  return <CheckboxInput form={form} name={name} label={label} />;
};
DepartmentAnalyticsField.displayName =
  "FeatureLimitsForm.DepartmentAnalyticsField";
FeatureLimitsForm.DepartmentAnalyticsField = DepartmentAnalyticsField;

const CustomIntegrationsField = ({
  form,
  data,
  name = "customIntegrations",
  label = "CustomIntegrations",
}: FeatureLimitsFormProps) => {
  return <CheckboxInput form={form} name={name} label={label} />;
};
CustomIntegrationsField.displayName =
  "FeatureLimitsForm.CustomIntegrationsField";
FeatureLimitsForm.CustomIntegrationsField = CustomIntegrationsField;

const PrioritySupportField = ({
  form,
  data,
  name = "prioritySupport",
  label = "PrioritySupport",
}: FeatureLimitsFormProps) => {
  return <CheckboxInput form={form} name={name} label={label} />;
};
PrioritySupportField.displayName = "FeatureLimitsForm.PrioritySupportField";
FeatureLimitsForm.PrioritySupportField = PrioritySupportField;

const CreatedAtField = ({
  form,
  data,
  name = "createdAt",
  label = "CreatedAt",
}: FeatureLimitsFormProps) => {
  return <DateInput form={form} name={name} label={label} />;
};
CreatedAtField.displayName = "FeatureLimitsForm.CreatedAtField";
FeatureLimitsForm.CreatedAtField = CreatedAtField;

const UpdatedAtField = ({
  form,
  data,
  name = "updatedAt",
  label = "UpdatedAt",
}: FeatureLimitsFormProps) => {
  return <DateInput form={form} name={name} label={label} />;
};
UpdatedAtField.displayName = "FeatureLimitsForm.UpdatedAtField";
FeatureLimitsForm.UpdatedAtField = UpdatedAtField;

const EnableRLSField = ({
  form,
  data,
  name = "enableRLS",
  label = "EnableRLS",
}: FeatureLimitsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter enableRLS"
    />
  );
};
EnableRLSField.displayName = "FeatureLimitsForm.EnableRLSField";
FeatureLimitsForm.EnableRLSField = EnableRLSField;

export default FeatureLimitsForm;
