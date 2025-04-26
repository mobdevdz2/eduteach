import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";
import { AssignmentsSelectorField } from "@/components/shared/entity-selector";
import { Assignments } from "@/types/entities";
import { StudentsSelectorField } from "@/components/shared/entity-selector";
import { Students } from "@/types/entities";

interface AssignmentSubmissionsFormProps extends BaseInputProps {
  data?: {
    students?: Students[];
    assignments?: Assignments[]
  };
}

const AssignmentSubmissionsForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: AssignmentSubmissionsFormProps) => {
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
        IdField.displayName = "AssignmentSubmissionsForm.IdField";
        AssignmentSubmissionsForm.IdField = IdField;
    

        const AssignmentIdField = ({ form, data, name="assignmentId", label="AssignmentId" }: AssignmentSubmissionsFormProps) => {
        return (
            <
          AssignmentsSelectorField
            form={form}
            name={name}
            label={label}
            placeholder="Select assignments"
            options={data?.assignments || []}
          />
        );
        };
        AssignmentIdField.displayName = "AssignmentSubmissionsForm.AssignmentIdField";
        AssignmentSubmissionsForm.AssignmentIdField = AssignmentIdField;
    

        const StudentIdField = ({ form, data, name="studentId", label="StudentId" }: AssignmentSubmissionsFormProps) => {
        return (
            <
          StudentsSelectorField
            form={form}
            name={name}
            label={label}
            placeholder="Select students"
            options={data?.students || []}
          />
        );
        };
        StudentIdField.displayName = "AssignmentSubmissionsForm.StudentIdField";
        AssignmentSubmissionsForm.StudentIdField = StudentIdField;
    

        const SubmissionDateField = ({ form, data, name="submissionDate", label="SubmissionDate" }: AssignmentSubmissionsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        SubmissionDateField.displayName = "AssignmentSubmissionsForm.SubmissionDateField";
        AssignmentSubmissionsForm.SubmissionDateField = SubmissionDateField;
    

        const ScoreField = ({ form, data, name="score", label="Score" }: AssignmentSubmissionsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter score"
            
            />
        );
        };
        ScoreField.displayName = "AssignmentSubmissionsForm.ScoreField";
        AssignmentSubmissionsForm.ScoreField = ScoreField;
    

        const FeedbackField = ({ form, data, name="feedback", label="Feedback" }: AssignmentSubmissionsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter feedback"
            
            />
        );
        };
        FeedbackField.displayName = "AssignmentSubmissionsForm.FeedbackField";
        AssignmentSubmissionsForm.FeedbackField = FeedbackField;
    

        const ContentField = ({ form, data, name="content", label="Content" }: AssignmentSubmissionsFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter content"
            rows={5}
          />
        );
        };
        ContentField.displayName = "AssignmentSubmissionsForm.ContentField";
        AssignmentSubmissionsForm.ContentField = ContentField;
    

        const CommentsField = ({ form, data, name="comments", label="Comments" }: AssignmentSubmissionsFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter comments"
            rows={3}
          />
        );
        };
        CommentsField.displayName = "AssignmentSubmissionsForm.CommentsField";
        AssignmentSubmissionsForm.CommentsField = CommentsField;
    

        const AttachmentsField = ({ form, data, name="attachments", label="Attachments" }: AssignmentSubmissionsFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter attachments"
            rows={3}
          />
        );
        };
        AttachmentsField.displayName = "AssignmentSubmissionsForm.AttachmentsField";
        AssignmentSubmissionsForm.AttachmentsField = AttachmentsField;
    

        const IsLateField = ({ form, data, name="isLate", label="IsLate" }: AssignmentSubmissionsFormProps) => {
        return (
            <
          CheckboxInput 
            form={form} 
            name={name} 
            label={label}
          />
        );
        };
        IsLateField.displayName = "AssignmentSubmissionsForm.IsLateField";
        AssignmentSubmissionsForm.IsLateField = IsLateField;
    

        const GradedByField = ({ form, data, name="gradedBy", label="GradedBy" }: AssignmentSubmissionsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter gradedBy"
            
            />
        );
        };
        GradedByField.displayName = "AssignmentSubmissionsForm.GradedByField";
        AssignmentSubmissionsForm.GradedByField = GradedByField;
    

        const GradedAtField = ({ form, data, name="gradedAt", label="GradedAt" }: AssignmentSubmissionsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        GradedAtField.displayName = "AssignmentSubmissionsForm.GradedAtField";
        AssignmentSubmissionsForm.GradedAtField = GradedAtField;
    

        const CreatedAtField = ({ form, data, name="createdAt", label="CreatedAt" }: AssignmentSubmissionsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CreatedAtField.displayName = "AssignmentSubmissionsForm.CreatedAtField";
        AssignmentSubmissionsForm.CreatedAtField = CreatedAtField;
    

        const UpdatedAtField = ({ form, data, name="updatedAt", label="UpdatedAt" }: AssignmentSubmissionsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        UpdatedAtField.displayName = "AssignmentSubmissionsForm.UpdatedAtField";
        AssignmentSubmissionsForm.UpdatedAtField = UpdatedAtField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: AssignmentSubmissionsFormProps) => {
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
        EnableRLSField.displayName = "AssignmentSubmissionsForm.EnableRLSField";
        AssignmentSubmissionsForm.EnableRLSField = EnableRLSField;
    

export default AssignmentSubmissionsForm;