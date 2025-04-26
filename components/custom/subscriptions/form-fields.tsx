import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";
import { UsersSelectorField } from "@/components/shared/entity-selector";
import { Users } from "@/types/entities";

interface SubscriptionsFormProps extends BaseInputProps {
  data?: {
    users?: Users[]
  };
}

const SubscriptionsForm = () => {
  return;
};


        const IdField = ({ form, data, name="id", label="Id" }: SubscriptionsFormProps) => {
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
        IdField.displayName = "SubscriptionsForm.IdField";
        SubscriptionsForm.IdField = IdField;
    

        const UserIdField = ({ form, data, name="userId", label="UserId" }: SubscriptionsFormProps) => {
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
        UserIdField.displayName = "SubscriptionsForm.UserIdField";
        SubscriptionsForm.UserIdField = UserIdField;
    

        const OrganizationIdField = ({ form, data, name="organizationId", label="OrganizationId" }: SubscriptionsFormProps) => {
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
        OrganizationIdField.displayName = "SubscriptionsForm.OrganizationIdField";
        SubscriptionsForm.OrganizationIdField = OrganizationIdField;
    

        const PlanField = ({ form, data, name="plan", label="Plan" }: SubscriptionsFormProps) => {
        return (
            <
         SelectInput
            form={form}
            name={name}
            label={label}
            options={[{ value: "starter", label: "Starter" }, { value: "professional", label: "Professional" }, { value: "school", label: "School" }]}
            placeholder="Select plan"
          />
        );
        };
        PlanField.displayName = "SubscriptionsForm.PlanField";
        SubscriptionsForm.PlanField = PlanField;
    

        const StatusField = ({ form, data, name="status", label="Status" }: SubscriptionsFormProps) => {
        return (
            <
         SelectInput
            form={form}
            name={name}
            label={label}
            options={[{ value: "active", label: "Active" }, { value: "canceled", label: "Canceled" }, { value: "incomplete", label: "Incomplete" }, { value: "incomplete_expired", label: "Incomplete Expired" }, { value: "past_due", label: "Past Due" }, { value: "trialing", label: "Trialing" }, { value: "unpaid", label: "Unpaid" }]}
            placeholder="Select status"
          />
        );
        };
        StatusField.displayName = "SubscriptionsForm.StatusField";
        SubscriptionsForm.StatusField = StatusField;
    

        const CurrentPeriodStartField = ({ form, data, name="currentPeriodStart", label="CurrentPeriodStart" }: SubscriptionsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CurrentPeriodStartField.displayName = "SubscriptionsForm.CurrentPeriodStartField";
        SubscriptionsForm.CurrentPeriodStartField = CurrentPeriodStartField;
    

        const CurrentPeriodEndField = ({ form, data, name="currentPeriodEnd", label="CurrentPeriodEnd" }: SubscriptionsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CurrentPeriodEndField.displayName = "SubscriptionsForm.CurrentPeriodEndField";
        SubscriptionsForm.CurrentPeriodEndField = CurrentPeriodEndField;
    

        const CancelAtPeriodEndField = ({ form, data, name="cancelAtPeriodEnd", label="CancelAtPeriodEnd" }: SubscriptionsFormProps) => {
        return (
            <
          CheckboxInput 
            form={form} 
            name={name} 
            label={label}
          />
        );
        };
        CancelAtPeriodEndField.displayName = "SubscriptionsForm.CancelAtPeriodEndField";
        SubscriptionsForm.CancelAtPeriodEndField = CancelAtPeriodEndField;
    

        const StripeCustomerIdField = ({ form, data, name="stripeCustomerId", label="StripeCustomerId" }: SubscriptionsFormProps) => {
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
        StripeCustomerIdField.displayName = "SubscriptionsForm.StripeCustomerIdField";
        SubscriptionsForm.StripeCustomerIdField = StripeCustomerIdField;
    

        const StripeSubscriptionIdField = ({ form, data, name="stripeSubscriptionId", label="StripeSubscriptionId" }: SubscriptionsFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter stripeSubscriptionId"
            
            />
        );
        };
        StripeSubscriptionIdField.displayName = "SubscriptionsForm.StripeSubscriptionIdField";
        SubscriptionsForm.StripeSubscriptionIdField = StripeSubscriptionIdField;
    

        const CreatedAtField = ({ form, data, name="createdAt", label="CreatedAt" }: SubscriptionsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        CreatedAtField.displayName = "SubscriptionsForm.CreatedAtField";
        SubscriptionsForm.CreatedAtField = CreatedAtField;
    

        const UpdatedAtField = ({ form, data, name="updatedAt", label="UpdatedAt" }: SubscriptionsFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        UpdatedAtField.displayName = "SubscriptionsForm.UpdatedAtField";
        SubscriptionsForm.UpdatedAtField = UpdatedAtField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: SubscriptionsFormProps) => {
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
        EnableRLSField.displayName = "SubscriptionsForm.EnableRLSField";
        SubscriptionsForm.EnableRLSField = EnableRLSField;
    

export default SubscriptionsForm;