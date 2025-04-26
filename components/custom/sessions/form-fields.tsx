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
import { UsersSelectorField } from "@/components/shared/entity-selector";
import { Users } from "@/types/entities";

interface SessionsFormProps extends BaseInputProps {
  data?: {
    users?: Users[];
  };
}

const SessionsForm = () => {
  return;
};

const IdField = ({
  form,
  data,
  name = "id",
  label = "Id",
}: SessionsFormProps) => {
  return (
    <StringInput form={form} name={name} label={label} placeholder="Enter id" />
  );
};
IdField.displayName = "SessionsForm.IdField";
SessionsForm.IdField = IdField;

const SessionTokenField = ({
  form,
  data,
  name = "sessionToken",
  label = "SessionToken",
}: SessionsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter sessionToken"
    />
  );
};
SessionTokenField.displayName = "SessionsForm.SessionTokenField";
SessionsForm.SessionTokenField = SessionTokenField;

const UserIdField = ({
  form,
  data,
  name = "userId",
  label = "UserId",
}: SessionsFormProps) => {
  return (
    <UsersSelectorField
      form={form}
      name={name}
      label={label}
      placeholder="Select users"
      options={data?.users || []}
    />
  );
};
UserIdField.displayName = "SessionsForm.UserIdField";
SessionsForm.UserIdField = UserIdField;

const ExpiresField = ({
  form,
  data,
  name = "expires",
  label = "Expires",
}: SessionsFormProps) => {
  return <DateInput form={form} name={name} label={label} />;
};
ExpiresField.displayName = "SessionsForm.ExpiresField";
SessionsForm.ExpiresField = ExpiresField;

const EnableRLSField = ({
  form,
  data,
  name = "enableRLS",
  label = "EnableRLS",
}: SessionsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter enableRLS"
    />
  );
};
EnableRLSField.displayName = "SessionsForm.EnableRLSField";
SessionsForm.EnableRLSField = EnableRLSField;

export default SessionsForm;
