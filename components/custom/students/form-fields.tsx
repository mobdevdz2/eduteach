import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";
import { UsersSelectorField } from "@/components/shared/entity-selector";
import { Users } from "@/types/entities";

interface StudentsFormProps extends BaseInputProps {
  data?: {
    users?: Users[]
  };
}

const StudentsForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: StudentsFormProps) => {
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
        IdField.displayName = "StudentsForm.IdField";
        StudentsForm.IdField = IdField;
    

        const FirstNameField = ({ form, data, name="firstName", label="FirstName" }: StudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter firstName"
            
            />
        );
        };
        FirstNameField.displayName = "StudentsForm.FirstNameField";
        StudentsForm.FirstNameField = FirstNameField;
    

        const LastNameField = ({ form, data, name="lastName", label="LastName" }: StudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter lastName"
            
            />
        );
        };
        LastNameField.displayName = "StudentsForm.LastNameField";
        StudentsForm.LastNameField = LastNameField;
    

        const EmailField = ({ form, data, name="email", label="Email" }: StudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter email"
            
            />
        );
        };
        EmailField.displayName = "StudentsForm.EmailField";
        StudentsForm.EmailField = EmailField;
    

        const DateOfBirthField = ({ form, data, name="dateOfBirth", label="DateOfBirth" }: StudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter dateOfBirth"
            
            />
        );
        };
        DateOfBirthField.displayName = "StudentsForm.DateOfBirthField";
        StudentsForm.DateOfBirthField = DateOfBirthField;
    

        const GenderField = ({ form, data, name="gender", label="Gender" }: StudentsFormProps) => {
        return (
            <
         SelectInput
            form={form}
            name={name}
            label={label}
            options={[{ value: "male", label: "Male" }, { value: "female", label: "Female" }, { value: "other", label: "Other" }, { value: "prefer_not_to_say", label: "Prefer Not To Say" }]}
            placeholder="Select gender"
          />
        );
        };
        GenderField.displayName = "StudentsForm.GenderField";
        StudentsForm.GenderField = GenderField;
    

        const EnrollmentDateField = ({ form, data, name="enrollmentDate", label="EnrollmentDate" }: StudentsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        EnrollmentDateField.displayName = "StudentsForm.EnrollmentDateField";
        StudentsForm.EnrollmentDateField = EnrollmentDateField;
    

        const PreviousSchoolField = ({ form, data, name="previousSchool", label="PreviousSchool" }: StudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter previousSchool"
            
            />
        );
        };
        PreviousSchoolField.displayName = "StudentsForm.PreviousSchoolField";
        StudentsForm.PreviousSchoolField = PreviousSchoolField;
    

        const SpecialNeedsField = ({ form, data, name="specialNeeds", label="SpecialNeeds" }: StudentsFormProps) => {
        return (
            <
          CheckboxInput 
            form={form} 
            name={name} 
            label={label}
          />
        );
        };
        SpecialNeedsField.displayName = "StudentsForm.SpecialNeedsField";
        StudentsForm.SpecialNeedsField = SpecialNeedsField;
    

        const NotesField = ({ form, data, name="notes", label="Notes" }: StudentsFormProps) => {
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
        NotesField.displayName = "StudentsForm.NotesField";
        StudentsForm.NotesField = NotesField;
    

        const AddressField = ({ form, data, name="address", label="Address" }: StudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter address"
            
            />
        );
        };
        AddressField.displayName = "StudentsForm.AddressField";
        StudentsForm.AddressField = AddressField;
    

        const EmergencyContactField = ({ form, data, name="emergencyContact", label="EmergencyContact" }: StudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter emergencyContact"
            
            />
        );
        };
        EmergencyContactField.displayName = "StudentsForm.EmergencyContactField";
        StudentsForm.EmergencyContactField = EmergencyContactField;
    

        const EmergencyPhoneField = ({ form, data, name="emergencyPhone", label="EmergencyPhone" }: StudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter emergencyPhone"
            
            />
        );
        };
        EmergencyPhoneField.displayName = "StudentsForm.EmergencyPhoneField";
        StudentsForm.EmergencyPhoneField = EmergencyPhoneField;
    

        const RelationshipField = ({ form, data, name="relationship", label="Relationship" }: StudentsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter relationship"
            
            />
        );
        };
        RelationshipField.displayName = "StudentsForm.RelationshipField";
        StudentsForm.RelationshipField = RelationshipField;
    

        const UserIdField = ({ form, data, name="userId", label="UserId" }: StudentsFormProps) => {
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
        UserIdField.displayName = "StudentsForm.UserIdField";
        StudentsForm.UserIdField = UserIdField;
    

        const OrganizationIdField = ({ form, data, name="organizationId", label="OrganizationId" }: StudentsFormProps) => {
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
        OrganizationIdField.displayName = "StudentsForm.OrganizationIdField";
        StudentsForm.OrganizationIdField = OrganizationIdField;
    

        const CreatedAtField = ({ form, data, name="createdAt", label="CreatedAt" }: StudentsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CreatedAtField.displayName = "StudentsForm.CreatedAtField";
        StudentsForm.CreatedAtField = CreatedAtField;
    

        const UpdatedAtField = ({ form, data, name="updatedAt", label="UpdatedAt" }: StudentsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        UpdatedAtField.displayName = "StudentsForm.UpdatedAtField";
        StudentsForm.UpdatedAtField = UpdatedAtField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: StudentsFormProps) => {
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
        EnableRLSField.displayName = "StudentsForm.EnableRLSField";
        StudentsForm.EnableRLSField = EnableRLSField;
    

export default StudentsForm;