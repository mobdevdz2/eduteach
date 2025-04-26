import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";

interface OrganizationsFormProps extends BaseInputProps {
  data?: {
    
  };
}

const OrganizationsForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: OrganizationsFormProps) => {
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
        IdField.displayName = "OrganizationsForm.IdField";
        OrganizationsForm.IdField = IdField;
    

        const NameField = ({ form, data, name="name", label="Name" }: OrganizationsFormProps) => {
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
        NameField.displayName = "OrganizationsForm.NameField";
        OrganizationsForm.NameField = NameField;
    

        const DomainField = ({ form, data, name="domain", label="Domain" }: OrganizationsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter domain"
            
            />
        );
        };
        DomainField.displayName = "OrganizationsForm.DomainField";
        OrganizationsForm.DomainField = DomainField;
    

        const LogoField = ({ form, data, name="logo", label="Logo" }: OrganizationsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter logo"
            
            />
        );
        };
        LogoField.displayName = "OrganizationsForm.LogoField";
        OrganizationsForm.LogoField = LogoField;
    

        const CreatedAtField = ({ form, data, name="createdAt", label="CreatedAt" }: OrganizationsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CreatedAtField.displayName = "OrganizationsForm.CreatedAtField";
        OrganizationsForm.CreatedAtField = CreatedAtField;
    

        const UpdatedAtField = ({ form, data, name="updatedAt", label="UpdatedAt" }: OrganizationsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        UpdatedAtField.displayName = "OrganizationsForm.UpdatedAtField";
        OrganizationsForm.UpdatedAtField = UpdatedAtField;
    

        const OwnerIdField = ({ form, data, name="ownerId", label="OwnerId" }: OrganizationsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter ownerId"
            
            />
        );
        };
        OwnerIdField.displayName = "OrganizationsForm.OwnerIdField";
        OrganizationsForm.OwnerIdField = OwnerIdField;
    

        const MaxUsersField = ({ form, data, name="maxUsers", label="MaxUsers" }: OrganizationsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter maxUsers"
            
            />
        );
        };
        MaxUsersField.displayName = "OrganizationsForm.MaxUsersField";
        OrganizationsForm.MaxUsersField = MaxUsersField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: OrganizationsFormProps) => {
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
        EnableRLSField.displayName = "OrganizationsForm.EnableRLSField";
        OrganizationsForm.EnableRLSField = EnableRLSField;
    

export default OrganizationsForm;