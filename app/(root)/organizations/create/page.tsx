/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import OrganizationsForm from "@/components/custom/organizations/form-fields";
import { SiteHeader } from "@/components/shared/site-header";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateOrganizations } from "@/services/organizations-service";
import { OrganizationsCreateInput } from "@/types/entities";
import { organizationInsertSchema } from "@/validations/insert";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { defaultValues } from "@/lib/consts/defaultValues";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useEffect } from "react";

export default function OrganizationsCreatePage() {
  const createOrganizations = useCreateOrganizations();
  const session = useSession();
  const form = useForm<OrganizationsCreateInput>({
    resolver: zodResolver(organizationInsertSchema),
    defaultValues: {
      ...defaultValues.organization.insert,
      userId: session.data?.user?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const onSubmit = async (data: OrganizationsCreateInput) => {
    const userId = session.data?.user?.id;
    if (userId) {
      createOrganizations.mutate({ ...data, userId });
    }
  };

  const onInValid = (errors: SubmitErrorHandler<z.infer<typeof organizationInsertSchema>>) => {
    console.error(errors);
    form.reset(form.getValues());
  };

  useEffect(() => {
    if (createOrganizations.isSuccess) {
      form.reset();
    }
  }, [createOrganizations.isSuccess]);

  useEffect(() => {
    if (session.data?.user?.id) {
      form.setValue("userId", session.data.user.id);
    }
  }, [session.data?.user?.id]);

  return (
    <>
      <SiteHeader title="Create Organizations" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Create New Organizations
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new organizations to your data
            </p>
          </div>
        </div>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Organizations Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                // @ts-ignore
                onSubmit={form.handleSubmit(onSubmit, onInValid)}
                className="space-y-4"
              >
                {Object.entries(OrganizationsForm).map(([name, Field]) => (
                  <Field key={name} form={form} />
                ))}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={createOrganizations.isPending}>
                    Create Organizations
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
