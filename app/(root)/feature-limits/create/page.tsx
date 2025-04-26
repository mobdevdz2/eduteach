/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import FeatureLimitsForm from "@/components/custom/featureLimits/form-fields";
import { SiteHeader } from "@/components/shared/site-header";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateFeatureLimits } from "@/services/featureLimits-service";
import { FeatureLimitsCreateInput } from "@/types/entities";
import { featureLimitInsertSchema } from "@/validations/insert";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { defaultValues } from "@/lib/consts/defaultValues";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useEffect } from "react";

export default function FeatureLimitsCreatePage() {
  const createFeatureLimits = useCreateFeatureLimits();
  const session = useSession();
  const form = useForm<FeatureLimitsCreateInput>({
    resolver: zodResolver(featureLimitInsertSchema),
    defaultValues: {
      ...defaultValues.featureLimit.insert,
      userId: session.data?.user?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const onSubmit = async (data: FeatureLimitsCreateInput) => {
    const userId = session.data?.user?.id;
    if (userId) {
      createFeatureLimits.mutate({ ...data, userId });
    }
  };

  const onInValid = (errors: SubmitErrorHandler<z.infer<typeof featureLimitInsertSchema>>) => {
    console.error(errors);
    form.reset(form.getValues());
  };

  useEffect(() => {
    if (createFeatureLimits.isSuccess) {
      form.reset();
    }
  }, [createFeatureLimits.isSuccess]);

  useEffect(() => {
    if (session.data?.user?.id) {
      form.setValue("userId", session.data.user.id);
    }
  }, [session.data?.user?.id]);

  return (
    <>
      <SiteHeader title="Create FeatureLimits" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Create New FeatureLimits
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new featureLimits to your data
            </p>
          </div>
        </div>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>FeatureLimits Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                // @ts-ignore
                onSubmit={form.handleSubmit(onSubmit, onInValid)}
                className="space-y-4"
              >
                {Object.entries(FeatureLimitsForm).map(([name, Field]) => (
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
                  <Button type="submit" disabled={createFeatureLimits.isPending}>
                    Create FeatureLimits
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
