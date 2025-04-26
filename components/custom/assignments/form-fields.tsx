import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";
import { ClassesSelectorField } from "@/components/shared/entity-selector";
import { Classes } from "@/types/entities";
import { UsersSelectorField } from "@/components/shared/entity-selector";
import { Users } from "@/types/entities";

interface AssignmentsFormProps extends BaseInputProps {
  data?: {
    classes?: Classes[];
    users?: Users[]
  };
}

const AssignmentsForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: AssignmentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter id"
            
            />
        );
        };
        IdField.displayName = "AssignmentsForm.IdField";
        AssignmentsForm.IdField = IdField;
    

        const TitleField = ({ form, data, name="title", label="Title" }: AssignmentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter title"
            
            />
        );
        };
        TitleField.displayName = "AssignmentsForm.TitleField";
        AssignmentsForm.TitleField = TitleField;
    

        const TypeField = ({ form, data, name="type", label="Type" }: AssignmentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter type"
            
            />
        );
        };
        TypeField.displayName = "AssignmentsForm.TypeField";
        AssignmentsForm.TypeField = TypeField;
    

        const ClassIdField = ({ form, data, name="classId", label="ClassId" }: AssignmentsFormProps) => {
        return (
            <
          ClassesSelectorField
            form={form}
            name={name}
            label={label}
            placeholder="Select classes"
            options={data?.classes || []}
          />
        );
        };
        ClassIdField.displayName = "AssignmentsForm.ClassIdField";
        AssignmentsForm.ClassIdField = ClassIdField;
    

        const DueDateField = ({ form, data, name="dueDate", label="DueDate" }: AssignmentsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        DueDateField.displayName = "AssignmentsForm.DueDateField";
        AssignmentsForm.DueDateField = DueDateField;
    

        const TotalPointsField = ({ form, data, name="totalPoints", label="TotalPoints" }: AssignmentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter totalPoints"
            
            />
        );
        };
        TotalPointsField.displayName = "AssignmentsForm.TotalPointsField";
        AssignmentsForm.TotalPointsField = TotalPointsField;
    

        const EstimatedTimeField = ({ form, data, name="estimatedTime", label="EstimatedTime" }: AssignmentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter estimatedTime"
            
            />
        );
        };
        EstimatedTimeField.displayName = "AssignmentsForm.EstimatedTimeField";
        AssignmentsForm.EstimatedTimeField = EstimatedTimeField;
    

        const InstructionsField = ({ form, data, name="instructions", label="Instructions" }: AssignmentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter instructions"
            
            />
        );
        };
        InstructionsField.displayName = "AssignmentsForm.InstructionsField";
        AssignmentsForm.InstructionsField = InstructionsField;
    

        const AllowLateSubmissionsField = ({ form, data, name="allowLateSubmissions", label="AllowLateSubmissions" }: AssignmentsFormProps) => {
        return (
            <
          CheckboxInput 
            form={form} 
            name={name} 
            label={label}
          />
        );
        };
        AllowLateSubmissionsField.displayName = "AssignmentsForm.AllowLateSubmissionsField";
        AssignmentsForm.AllowLateSubmissionsField = AllowLateSubmissionsField;
    

        const TimeLimitField = ({ form, data, name="timeLimit", label="TimeLimit" }: AssignmentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter timeLimit"
            
            />
        );
        };
        TimeLimitField.displayName = "AssignmentsForm.TimeLimitField";
        AssignmentsForm.TimeLimitField = TimeLimitField;
    

        const StatusField = ({ form, data, name="status", label="Status" }: AssignmentsFormProps) => {
        return (
            <
         SelectInput
            form={form}
            name={name}
            label={label}
            options={[{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }, { value: "graded", label: "Graded" }, { value: "archived", label: "Archived" }]}
            placeholder="Select status"
          />
        );
        };
        StatusField.displayName = "AssignmentsForm.StatusField";
        AssignmentsForm.StatusField = StatusField;
    

        const ResourcesField = ({ form, data, name="resources", label="Resources" }: AssignmentsFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter resources"
            rows={3}
          />
        );
        };
        ResourcesField.displayName = "AssignmentsForm.ResourcesField";
        AssignmentsForm.ResourcesField = ResourcesField;
    

        const UserIdField = ({ form, data, name="userId", label="UserId" }: AssignmentsFormProps) => {
        return (
            <
          UsersSelectorField
            form={form}
            name={name}
            label={label}
            placeholder="Select users"
            options={data?.users || []}
          />
        );
        };
        UserIdField.displayName = "AssignmentsForm.UserIdField";
        AssignmentsForm.UserIdField = UserIdField;
    

        const CreatedAtField = ({ form, data, name="createdAt", label="CreatedAt" }: AssignmentsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CreatedAtField.displayName = "AssignmentsForm.CreatedAtField";
        AssignmentsForm.CreatedAtField = CreatedAtField;
    

        const UpdatedAtField = ({ form, data, name="updatedAt", label="UpdatedAt" }: AssignmentsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        UpdatedAtField.displayName = "AssignmentsForm.UpdatedAtField";
        AssignmentsForm.UpdatedAtField = UpdatedAtField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: AssignmentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter enableRLS"
            
            />
        );
        };
        EnableRLSField.displayName = "AssignmentsForm.EnableRLSField";
        AssignmentsForm.EnableRLSField = EnableRLSField;
    

export default AssignmentsForm;