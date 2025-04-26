import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";
import { ClassesSelectorField } from "@/components/shared/entity-selector";
import { Classes } from "@/types/entities";
import { UsersSelectorField } from "@/components/shared/entity-selector";
import { Users } from "@/types/entities";

interface LessonPlansFormProps extends BaseInputProps {
  data?: {
    classes?: Classes[];
    users?: Users[]
  };
}

const LessonPlansForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: LessonPlansFormProps) => {
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
        IdField.displayName = "LessonPlansForm.IdField";
        LessonPlansForm.IdField = IdField;
    

        const TitleField = ({ form, data, name="title", label="Title" }: LessonPlansFormProps) => {
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
        TitleField.displayName = "LessonPlansForm.TitleField";
        LessonPlansForm.TitleField = TitleField;
    

        const SubjectField = ({ form, data, name="subject", label="Subject" }: LessonPlansFormProps) => {
        return (
            <
         SelectInput
            form={form}
            name={name}
            label={label}
            options={[{ value: "mathematics", label: "Mathematics" }, { value: "science", label: "Science" }, { value: "english", label: "English" }, { value: "history", label: "History" }, { value: "geography", label: "Geography" }, { value: "art", label: "Art" }, { value: "music", label: "Music" }, { value: "physical_education", label: "Physical Education" }]}
            placeholder="Select subject"
          />
        );
        };
        SubjectField.displayName = "LessonPlansForm.SubjectField";
        LessonPlansForm.SubjectField = SubjectField;
    

        const GradeLevelField = ({ form, data, name="gradeLevel", label="GradeLevel" }: LessonPlansFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter gradeLevel"
            
            />
        );
        };
        GradeLevelField.displayName = "LessonPlansForm.GradeLevelField";
        LessonPlansForm.GradeLevelField = GradeLevelField;
    

        const DurationField = ({ form, data, name="duration", label="Duration" }: LessonPlansFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter duration"
            
            />
        );
        };
        DurationField.displayName = "LessonPlansForm.DurationField";
        LessonPlansForm.DurationField = DurationField;
    

        const DateField = ({ form, data, name="date", label="Date" }: LessonPlansFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        DateField.displayName = "LessonPlansForm.DateField";
        LessonPlansForm.DateField = DateField;
    

        const ClassIdField = ({ form, data, name="classId", label="ClassId" }: LessonPlansFormProps) => {
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
        ClassIdField.displayName = "LessonPlansForm.ClassIdField";
        LessonPlansForm.ClassIdField = ClassIdField;
    

        const StatusField = ({ form, data, name="status", label="Status" }: LessonPlansFormProps) => {
        return (
            <
         SelectInput
            form={form}
            name={name}
            label={label}
            options={[{ value: "draft", label: "Draft" }, { value: "complete", label: "Complete" }, { value: "archived", label: "Archived" }]}
            placeholder="Select status"
          />
        );
        };
        StatusField.displayName = "LessonPlansForm.StatusField";
        LessonPlansForm.StatusField = StatusField;
    

        const ObjectivesField = ({ form, data, name="objectives", label="Objectives" }: LessonPlansFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter objectives"
            rows={3}
          />
        );
        };
        ObjectivesField.displayName = "LessonPlansForm.ObjectivesField";
        LessonPlansForm.ObjectivesField = ObjectivesField;
    

        const MaterialsField = ({ form, data, name="materials", label="Materials" }: LessonPlansFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter materials"
            rows={3}
          />
        );
        };
        MaterialsField.displayName = "LessonPlansForm.MaterialsField";
        LessonPlansForm.MaterialsField = MaterialsField;
    

        const IntroductionField = ({ form, data, name="introduction", label="Introduction" }: LessonPlansFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter introduction"
            
            />
        );
        };
        IntroductionField.displayName = "LessonPlansForm.IntroductionField";
        LessonPlansForm.IntroductionField = IntroductionField;
    

        const MainActivityField = ({ form, data, name="mainActivity", label="MainActivity" }: LessonPlansFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter mainActivity"
            
            />
        );
        };
        MainActivityField.displayName = "LessonPlansForm.MainActivityField";
        LessonPlansForm.MainActivityField = MainActivityField;
    

        const ConclusionField = ({ form, data, name="conclusion", label="Conclusion" }: LessonPlansFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter conclusion"
            
            />
        );
        };
        ConclusionField.displayName = "LessonPlansForm.ConclusionField";
        LessonPlansForm.ConclusionField = ConclusionField;
    

        const AssessmentField = ({ form, data, name="assessment", label="Assessment" }: LessonPlansFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter assessment"
            
            />
        );
        };
        AssessmentField.displayName = "LessonPlansForm.AssessmentField";
        LessonPlansForm.AssessmentField = AssessmentField;
    

        const NotesField = ({ form, data, name="notes", label="Notes" }: LessonPlansFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter notes"
            rows={3}
          />
        );
        };
        NotesField.displayName = "LessonPlansForm.NotesField";
        LessonPlansForm.NotesField = NotesField;
    

        const UserIdField = ({ form, data, name="userId", label="UserId" }: LessonPlansFormProps) => {
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
        UserIdField.displayName = "LessonPlansForm.UserIdField";
        LessonPlansForm.UserIdField = UserIdField;
    

        const OrganizationIdField = ({ form, data, name="organizationId", label="OrganizationId" }: LessonPlansFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter organizationId"
            
            />
        );
        };
        OrganizationIdField.displayName = "LessonPlansForm.OrganizationIdField";
        LessonPlansForm.OrganizationIdField = OrganizationIdField;
    

        const CreatedAtField = ({ form, data, name="createdAt", label="CreatedAt" }: LessonPlansFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CreatedAtField.displayName = "LessonPlansForm.CreatedAtField";
        LessonPlansForm.CreatedAtField = CreatedAtField;
    

        const UpdatedAtField = ({ form, data, name="updatedAt", label="UpdatedAt" }: LessonPlansFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        UpdatedAtField.displayName = "LessonPlansForm.UpdatedAtField";
        LessonPlansForm.UpdatedAtField = UpdatedAtField;
    

        const ProcedureField = ({ form, data, name="procedure", label="Procedure" }: LessonPlansFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter procedure"
            rows={3}
          />
        );
        };
        ProcedureField.displayName = "LessonPlansForm.ProcedureField";
        LessonPlansForm.ProcedureField = ProcedureField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: LessonPlansFormProps) => {
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
        EnableRLSField.displayName = "LessonPlansForm.EnableRLSField";
        LessonPlansForm.EnableRLSField = EnableRLSField;
    

export default LessonPlansForm;