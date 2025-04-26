// Auto-generated entity selector components
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";

import { useState } from "react";
import {
  MultiSelectorFields,
  SelectorFields,
  SelectEntities
} from "@/types/ui";



const  IdField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="idId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Id</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select id" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.ids?.map((id) => (
                  <SelectItem key={id.id} value={id.id}>
                    {id.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  IdForm.IdField = IdField  
  

const  UserIdField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="userIdId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>UserId</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select userId" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.userIds?.map((userId) => (
                  <SelectItem key={userId.id} value={userId.id}>
                    {userId.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  UserIdForm.UserIdField = UserIdField  
  

const  TypeField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="typeId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.types?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  TypeForm.TypeField = TypeField  
  

const  ProviderField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="providerId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Provider</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.providers?.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  ProviderForm.ProviderField = ProviderField  
  

const  ProviderAccountIdField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="providerAccountIdId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>ProviderAccountId</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select providerAccountId" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.providerAccountIds?.map((providerAccountId) => (
                  <SelectItem key={providerAccountId.id} value={providerAccountId.id}>
                    {providerAccountId.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  ProviderAccountIdForm.ProviderAccountIdField = ProviderAccountIdField  
  

const  RefreshTokenField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="refresh_tokenId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Refresh_token</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select refresh_token" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.refresh_tokens?.map((refresh_token) => (
                  <SelectItem key={refresh_token.id} value={refresh_token.id}>
                    {refresh_token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  RefreshTokenForm.RefreshTokenField = RefreshTokenField  
  

const  AccessTokenField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="access_tokenId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Access_token</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select access_token" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.access_tokens?.map((access_token) => (
                  <SelectItem key={access_token.id} value={access_token.id}>
                    {access_token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  AccessTokenForm.AccessTokenField = AccessTokenField  
  

const  ExpiresAtField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="expires_atId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expires_at</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select expires_at" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.expires_ats?.map((expires_at) => (
                  <SelectItem key={expires_at.id} value={expires_at.id}>
                    {expires_at.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  ExpiresAtForm.ExpiresAtField = ExpiresAtField  
  

const  TokenTypeField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="token_typeId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Token_type</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select token_type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.token_types?.map((token_type) => (
                  <SelectItem key={token_type.id} value={token_type.id}>
                    {token_type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  TokenTypeForm.TokenTypeField = TokenTypeField  
  

const  ScopeField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="scopeId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Scope</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.scopes?.map((scope) => (
                  <SelectItem key={scope.id} value={scope.id}>
                    {scope.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  ScopeForm.ScopeField = ScopeField  
  

const  IdTokenField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="id_tokenId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Id_token</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select id_token" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.id_tokens?.map((id_token) => (
                  <SelectItem key={id_token.id} value={id_token.id}>
                    {id_token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  IdTokenForm.IdTokenField = IdTokenField  
  

const  SessionStateField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="session_stateId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Session_state</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select session_state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.session_states?.map((session_state) => (
                  <SelectItem key={session_state.id} value={session_state.id}>
                    {session_state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  SessionStateForm.SessionStateField = SessionStateField  
  

const  OauthTokenField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="oauth_token_secretId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Oauth_token_secret</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select oauth_token_secret" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.oauth_token_secrets?.map((oauth_token_secret) => (
                  <SelectItem key={oauth_token_secret.id} value={oauth_token_secret.id}>
                    {oauth_token_secret.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  OauthTokenForm.OauthTokenField = OauthTokenField  
  

const  OauthTokenField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="oauth_tokenId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Oauth_token</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select oauth_token" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.oauth_tokens?.map((oauth_token) => (
                  <SelectItem key={oauth_token.id} value={oauth_token.id}>
                    {oauth_token.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  OauthTokenForm.OauthTokenField = OauthTokenField  
  

const  EnableRLSField = ({ form, data }) => {
    return (
      <FormField
        control={form.control}
        name="enableRLSId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>EnableRLS</FormLabel>
            <Select onValueChange={field.onChange} value={field.value || ""}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select enableRLS" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {data?.enableRLSs?.map((enableRLS) => (
                  <SelectItem key={enableRLS.id} value={enableRLS.id}>
                    {enableRLS.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
  EnableRLSForm.EnableRLSField = EnableRLSField  
  



export default Form;
