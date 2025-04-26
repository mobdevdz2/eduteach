import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";

interface UsersFormProps extends BaseInputProps {
  data?: {
    
  };
}

const UsersForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: UsersFormProps) => {
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
        IdField.displayName = "UsersForm.IdField";
        UsersForm.IdField = IdField;
    

        const NameField = ({ form, data, name="name", label="Name" }: UsersFormProps) => {
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
        NameField.displayName = "UsersForm.NameField";
        UsersForm.NameField = NameField;
    

        const EmailField = ({ form, data, name="email", label="Email" }: UsersFormProps) => {
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
        EmailField.displayName = "UsersForm.EmailField";
        UsersForm.EmailField = EmailField;
    

        const EmailVerifiedField = ({ form, data, name="emailVerified", label="EmailVerified" }: UsersFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        EmailVerifiedField.displayName = "UsersForm.EmailVerifiedField";
        UsersForm.EmailVerifiedField = EmailVerifiedField;
    

        const ImageField = ({ form, data, name="image", label="Image" }: UsersFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter image"
            
            />
        );
        };
        ImageField.displayName = "UsersForm.ImageField";
        UsersForm.ImageField = ImageField;
    

        const FirstNameField = ({ form, data, name="firstName", label="FirstName" }: UsersFormProps) => {
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
        FirstNameField.displayName = "UsersForm.FirstNameField";
        UsersForm.FirstNameField = FirstNameField;
    

        const LastNameField = ({ form, data, name="lastName", label="LastName" }: UsersFormProps) => {
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
        LastNameField.displayName = "UsersForm.LastNameField";
        UsersForm.LastNameField = LastNameField;
    

        const RoleField = ({ form, data, name="role", label="Role" }: UsersFormProps) => {
        return (
            <
         SelectInput
            form={form}
            name={name}
            label={label}
            options={[{ value: "teacher", label: "Teacher" }, { value: "admin", label: "Admin" }, { value: "department_head", label: "Department Head" }, { value: "school_admin", label: "School Admin" }]}
            placeholder="Select role"
          />
        );
        };
        RoleField.displayName = "UsersForm.RoleField";
        UsersForm.RoleField = RoleField;
    

        const CreatedAtField = ({ form, data, name="createdAt", label="CreatedAt" }: UsersFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CreatedAtField.displayName = "UsersForm.CreatedAtField";
        UsersForm.CreatedAtField = CreatedAtField;
    

        const UpdatedAtField = ({ form, data, name="updatedAt", label="UpdatedAt" }: UsersFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        UpdatedAtField.displayName = "UsersForm.UpdatedAtField";
        UsersForm.UpdatedAtField = UpdatedAtField;
    

        const StripeCustomerIdField = ({ form, data, name="stripeCustomerId", label="StripeCustomerId" }: UsersFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter stripeCustomerId"
            
            />
        );
        };
        StripeCustomerIdField.displayName = "UsersForm.StripeCustomerIdField";
        UsersForm.StripeCustomerIdField = StripeCustomerIdField;
    

        const OrganizationIdField = ({ form, data, name="organizationId", label="OrganizationId" }: UsersFormProps) => {
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
        OrganizationIdField.displayName = "UsersForm.OrganizationIdField";
        UsersForm.OrganizationIdField = OrganizationIdField;
    

        const LastLoginAtField = ({ form, data, name="lastLoginAt", label="LastLoginAt" }: UsersFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        LastLoginAtField.displayName = "UsersForm.LastLoginAtField";
        UsersForm.LastLoginAtField = LastLoginAtField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: UsersFormProps) => {
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
        EnableRLSField.displayName = "UsersForm.EnableRLSField";
        UsersForm.EnableRLSField = EnableRLSField;
    

export default UsersForm;