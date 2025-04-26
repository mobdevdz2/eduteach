/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import VerificationTokensForm from "@/components/custom/verificationTokens/form-fields";
import { SiteHeader } from "@/components/shared/site-header";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateVerificationTokens } from "@/services/verificationTokens-service";
import { VerificationTokensCreateInput } from "@/types/entities";
import { verificationTokenInsertSchema } from "@/validations/insert";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { defaultValues } from "@/lib/consts/defaultValues";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useEffect } from "react";

export default function VerificationTokensCreatePage() {
  const createVerificationTokens = useCreateVerificationTokens();
  const session = useSession();
  const form = useForm<VerificationTokensCreateInput>({
    resolver: zodResolver(verificationTokenInsertSchema),
    defaultValues: {
      ...defaultValues.verificationToken.insert,
      userId: session.data?.user?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const onSubmit = async (data: VerificationTokensCreateInput) => {
    const userId = session.data?.user?.id;
    if (userId) {
      createVerificationTokens.mutate({ ...data, userId });
    }
  };

  const onInValid = (errors: SubmitErrorHandler<z.infer<typeof verificationTokenInsertSchema>>) => {
    console.error(errors);
    form.reset(form.getValues());
  };

  useEffect(() => {
    if (createVerificationTokens.isSuccess) {
      form.reset();
    }
  }, [createVerificationTokens.isSuccess]);

  useEffect(() => {
    if (session.data?.user?.id) {
      form.setValue("userId", session.data.user.id);
    }
  }, [session.data?.user?.id]);

  return (
    <>
      <SiteHeader title="Create VerificationTokens" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Create New VerificationTokens
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new verificationTokens to your data
            </p>
          </div>
        </div>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>VerificationTokens Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                // @ts-ignore
                onSubmit={form.handleSubmit(onSubmit, onInValid)}
                className="space-y-4"
              >
                {Object.entries(VerificationTokensForm).map(([name, Field]) => (
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
                  <Button type="submit" disabled={createVerificationTokens.isPending}>
                    Create VerificationTokens
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
