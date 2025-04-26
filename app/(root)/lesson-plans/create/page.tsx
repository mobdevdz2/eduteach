/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import LessonPlansForm from "@/components/custom/lessonPlans/form-fields";
import { SiteHeader } from "@/components/shared/site-header";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateLessonPlans } from "@/services/lessonPlans-service";
import { LessonPlansCreateInput } from "@/types/entities";
import { lessonPlanInsertSchema } from "@/validations/insert";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { defaultValues } from "@/lib/consts/defaultValues";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useEffect } from "react";

export default function LessonPlansCreatePage() {
  const createLessonPlans = useCreateLessonPlans();
  const session = useSession();
  const form = useForm<LessonPlansCreateInput>({
    resolver: zodResolver(lessonPlanInsertSchema),
    defaultValues: {
      ...defaultValues.lessonPlan.insert,
      userId: session.data?.user?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const onSubmit = async (data: LessonPlansCreateInput) => {
    const userId = session.data?.user?.id;
    if (userId) {
      createLessonPlans.mutate({ ...data, userId });
    }
  };

  const onInValid = (errors: SubmitErrorHandler<z.infer<typeof lessonPlanInsertSchema>>) => {
    console.error(errors);
    form.reset(form.getValues());
  };

  useEffect(() => {
    if (createLessonPlans.isSuccess) {
      form.reset();
    }
  }, [createLessonPlans.isSuccess]);

  useEffect(() => {
    if (session.data?.user?.id) {
      form.setValue("userId", session.data.user.id);
    }
  }, [session.data?.user?.id]);

  return (
    <>
      <SiteHeader title="Create LessonPlans" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Create New LessonPlans
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new lessonPlans to your data
            </p>
          </div>
        </div>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>LessonPlans Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                // @ts-ignore
                onSubmit={form.handleSubmit(onSubmit, onInValid)}
                className="space-y-4"
              >
                {Object.entries(LessonPlansForm).map(([name, Field]) => (
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
                  <Button type="submit" disabled={createLessonPlans.isPending}>
                    Create LessonPlans
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
