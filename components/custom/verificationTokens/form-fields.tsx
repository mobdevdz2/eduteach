import React from "react";
import { BaseInputProps, StringInput, NumberInput, CheckboxInput, SelectInput, DateInput, TextInput } from "@/components/shared/form-inputs";

interface VerificationTokensFormProps extends BaseInputProps {
  data?: {
    
  };
}

const VerificationTokensForm = () => {
  return;
};


        const IdentifierField = ({ form, data, name="identifier", label="Identifier" }: VerificationTokensFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter identifier"
            
            />
        );
        };
        IdentifierField.displayName = "VerificationTokensForm.IdentifierField";
        VerificationTokensForm.IdentifierField = IdentifierField;
    

        const TokenField = ({ form, data, name="token", label="Token" }: VerificationTokensFormProps) => {
        return (
            <
          StringInput 
            form={form} 
            name={name} 
            label={label}
            placeholder="Enter token"
            
            />
        );
        };
        TokenField.displayName = "VerificationTokensForm.TokenField";
        VerificationTokensForm.TokenField = TokenField;
    

        const ExpiresField = ({ form, data, name="expires", label="Expires" }: VerificationTokensFormProps) => {
        return (
            <
        DateInput 
          form={form} 
          name={name} 
          label={label}
        />
        );
        };
        ExpiresField.displayName = "VerificationTokensForm.ExpiresField";
        VerificationTokensForm.ExpiresField = ExpiresField;
    

        const EnableRLSField = ({ form, data, name="enableRLS", label="EnableRLS" }: VerificationTokensFormProps) => {
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
        EnableRLSField.displayName = "VerificationTokensForm.EnableRLSField";
        VerificationTokensForm.EnableRLSField = EnableRLSField;
    

export default VerificationTokensForm;