import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";
import { ClassesSelectorField } from "@/components/shared/entity-selector";
import { Classes } from "@/types/entities";
import { UsersSelectorField } from "@/components/shared/entity-selector";
import { Users } from "@/types/entities";

interface MaterialsFormProps extends BaseInputProps {
  data?: {
    classes?: Classes[];
    users?: Users[]
  };
}

const MaterialsForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: MaterialsFormProps) => {
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
        IdField.displayName = "MaterialsForm.IdField";
        MaterialsForm.IdField = IdField;
    

        const NameField = ({ form, data, name="name", label="Name" }: MaterialsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter name"
            
            />
        );
        };
        NameField.displayName = "MaterialsForm.NameField";
        MaterialsForm.NameField = NameField;
    

        const TypeField = ({ form, data, name="type", label="Type" }: MaterialsFormProps) => {
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
        TypeField.displayName = "MaterialsForm.TypeField";
        MaterialsForm.TypeField = TypeField;
    

        const SubjectField = ({ form, data, name="subject", label="Subject" }: MaterialsFormProps) => {
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
        SubjectField.displayName = "MaterialsForm.SubjectField";
        MaterialsForm.SubjectField = SubjectField;
    

        const GradeLevelField = ({ form, data, name="gradeLevel", label="GradeLevel" }: MaterialsFormProps) => {
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
        GradeLevelField.displayName = "MaterialsForm.GradeLevelField";
        MaterialsForm.GradeLevelField = GradeLevelField;
    

        const ClassIdField = ({ form, data, name="classId", label="ClassId" }: MaterialsFormProps) => {
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
        ClassIdField.displayName = "MaterialsForm.ClassIdField";
        MaterialsForm.ClassIdField = ClassIdField;
    

        const DescriptionField = ({ form, data, name="description", label="Description" }: MaterialsFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter description"
            rows={3}
          />
        );
        };
        DescriptionField.displayName = "MaterialsForm.DescriptionField";
        MaterialsForm.DescriptionField = DescriptionField;
    

        const FileUrlField = ({ form, data, name="fileUrl", label="FileUrl" }: MaterialsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter fileUrl"
            
            />
        );
        };
        FileUrlField.displayName = "MaterialsForm.FileUrlField";
        MaterialsForm.FileUrlField = FileUrlField;
    

        const FileSizeField = ({ form, data, name="fileSize", label="FileSize" }: MaterialsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter fileSize"
            
            />
        );
        };
        FileSizeField.displayName = "MaterialsForm.FileSizeField";
        MaterialsForm.FileSizeField = FileSizeField;
    

        const FileTypeField = ({ form, data, name="fileType", label="FileType" }: MaterialsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter fileType"
            
            />
        );
        };
        FileTypeField.displayName = "MaterialsForm.FileTypeField";
        MaterialsForm.FileTypeField = FileTypeField;
    

        const ShareWithStudentsField = ({ form, data, name="shareWithStudents", label="ShareWithStudents" }: MaterialsFormProps) => {
        return (
            <
          CheckboxInput 
            form={form} 
            name={name} 
            label={label}
          />
        );
        };
        ShareWithStudentsField.displayName = "MaterialsForm.ShareWithStudentsField";
        MaterialsForm.ShareWithStudentsField = ShareWithStudentsField;
    

        const ShareWithTeachersField = ({ form, data, name="shareWithTeachers", label="ShareWithTeachers" }: MaterialsFormProps) => {
        return (
            <
          CheckboxInput 
            form={form} 
            name={name} 
            label={label}
          />
        );
        };
        ShareWithTeachersField.displayName = "MaterialsForm.ShareWithTeachersField";
        MaterialsForm.ShareWithTeachersField = ShareWithTeachersField;
    

        const TagsField = ({ form, data, name="tags", label="Tags" }: MaterialsFormProps) => {
        return (
            <
        TextInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter tags"
            rows={3}
          />
        );
        };
        TagsField.displayName = "MaterialsForm.TagsField";
        MaterialsForm.TagsField = TagsField;
    

        const UserIdField = ({ form, data, name="userId", label="UserId" }: MaterialsFormProps) => {
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
        UserIdField.displayName = "MaterialsForm.UserIdField";
        MaterialsForm.UserIdField = UserIdField;
    

        const OrganizationIdField = ({ form, data, name="organizationId", label="OrganizationId" }: MaterialsFormProps) => {
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
        OrganizationIdField.displayName = "MaterialsForm.OrganizationIdField";
        MaterialsForm.OrganizationIdField = OrganizationIdField;
    

        const CreatedAtField = ({ form, data, name="createdAt", label="CreatedAt" }: MaterialsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CreatedAtField.displayName = "MaterialsForm.CreatedAtField";
        MaterialsForm.CreatedAtField = CreatedAtField;
    

        const UpdatedAtField = ({ form, data, name="updatedAt", label="UpdatedAt" }: MaterialsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        UpdatedAtField.displayName = "MaterialsForm.UpdatedAtField";
        MaterialsForm.UpdatedAtField = UpdatedAtField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: MaterialsFormProps) => {
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
        EnableRLSField.displayName = "MaterialsForm.EnableRLSField";
        MaterialsForm.EnableRLSField = EnableRLSField;
    

export default MaterialsForm;