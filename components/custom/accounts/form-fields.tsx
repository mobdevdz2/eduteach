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

interface AccountsFormProps extends BaseInputProps {
  data?: {
    users?: Users[];
  };
}

const AccountsForm = () => {
  return;
};

const IdField = ({
  form,
  data,
  name = "id",
  label = "Id",
}: AccountsFormProps) => {
  return (
    <StringInput form={form} name={name} label={label} placeholder="Enter id" />
  );
};
IdField.displayName = "AccountsForm.IdField";
AccountsForm.IdField = IdField;

const UserIdField = ({
  form,
  data,
  name = "userId",
  label = "UserId",
}: AccountsFormProps) => {
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
UserIdField.displayName = "AccountsForm.UserIdField";
AccountsForm.UserIdField = UserIdField;

const TypeField = ({
  form,
  data,
  name = "type",
  label = "Type",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter type"
    />
  );
};
TypeField.displayName = "AccountsForm.TypeField";
AccountsForm.TypeField = TypeField;

const ProviderField = ({
  form,
  data,
  name = "provider",
  label = "Provider",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter provider"
    />
  );
};
ProviderField.displayName = "AccountsForm.ProviderField";
AccountsForm.ProviderField = ProviderField;

const ProviderAccountIdField = ({
  form,
  data,
  name = "providerAccountId",
  label = "ProviderAccountId",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter providerAccountId"
    />
  );
};
ProviderAccountIdField.displayName = "AccountsForm.ProviderAccountIdField";
AccountsForm.ProviderAccountIdField = ProviderAccountIdField;

const Refresh_tokenField = ({
  form,
  data,
  name = "refresh_token",
  label = "Refresh_token",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter refresh_token"
    />
  );
};
Refresh_tokenField.displayName = "AccountsForm.Refresh_tokenField";
AccountsForm.Refresh_tokenField = Refresh_tokenField;

const Access_tokenField = ({
  form,
  data,
  name = "access_token",
  label = "Access_token",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter access_token"
    />
  );
};
Access_tokenField.displayName = "AccountsForm.Access_tokenField";
AccountsForm.Access_tokenField = Access_tokenField;

const Expires_atField = ({
  form,
  data,
  name = "expires_at",
  label = "Expires_at",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter expires_at"
    />
  );
};
Expires_atField.displayName = "AccountsForm.Expires_atField";
AccountsForm.Expires_atField = Expires_atField;

const Token_typeField = ({
  form,
  data,
  name = "token_type",
  label = "Token_type",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter token_type"
    />
  );
};
Token_typeField.displayName = "AccountsForm.Token_typeField";
AccountsForm.Token_typeField = Token_typeField;

const ScopeField = ({
  form,
  data,
  name = "scope",
  label = "Scope",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter scope"
    />
  );
};
ScopeField.displayName = "AccountsForm.ScopeField";
AccountsForm.ScopeField = ScopeField;

const Id_tokenField = ({
  form,
  data,
  name = "id_token",
  label = "Id_token",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter id_token"
    />
  );
};
Id_tokenField.displayName = "AccountsForm.Id_tokenField";
AccountsForm.Id_tokenField = Id_tokenField;

const Session_stateField = ({
  form,
  data,
  name = "session_state",
  label = "Session_state",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter session_state"
    />
  );
};
Session_stateField.displayName = "AccountsForm.Session_stateField";
AccountsForm.Session_stateField = Session_stateField;

const Oauth_tokenField = ({
  form,
  data,
  name = "oauth_token",
  label = "Oauth_token",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter oauth_token"
    />
  );
};
Oauth_tokenField.displayName = "AccountsForm.Oauth_tokenField";
AccountsForm.Oauth_tokenField = Oauth_tokenField;

const EnableRLSField = ({
  form,
  data,
  name = "enableRLS",
  label = "EnableRLS",
}: AccountsFormProps) => {
  return (
    <StringInput
      form={form}
      name={name}
      label={label}
      placeholder="Enter enableRLS"
    />
  );
};
EnableRLSField.displayName = "AccountsForm.EnableRLSField";
AccountsForm.EnableRLSField = EnableRLSField;

export default AccountsForm;
