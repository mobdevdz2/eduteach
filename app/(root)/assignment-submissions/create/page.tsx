/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import AssignmentSubmissionsForm from "@/components/custom/assignmentSubmissions/form-fields";
import { SiteHeader } from "@/components/shared/site-header";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateAssignmentSubmissions } from "@/services/assignmentSubmissions-service";
import { AssignmentSubmissionsCreateInput } from "@/types/entities";
import { assignmentSubmissionInsertSchema } from "@/validations/insert";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { defaultValues } from "@/lib/consts/defaultValues";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useEffect } from "react";

export default function AssignmentSubmissionsCreatePage() {
  const createAssignmentSubmissions = useCreateAssignmentSubmissions();
  const session = useSession();
  const form = useForm<AssignmentSubmissionsCreateInput>({
    resolver: zodResolver(assignmentSubmissionInsertSchema),
    defaultValues: {
      ...defaultValues.assignmentSubmission.insert,
      userId: session.data?.user?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const onSubmit = async (data: AssignmentSubmissionsCreateInput) => {
    const userId = session.data?.user?.id;
    if (userId) {
      createAssignmentSubmissions.mutate({ ...data, userId });
    }
  };

  const onInValid = (errors: SubmitErrorHandler<z.infer<typeof assignmentSubmissionInsertSchema>>) => {
    console.error(errors);
    form.reset(form.getValues());
  };

  useEffect(() => {
    if (createAssignmentSubmissions.isSuccess) {
      form.reset();
    }
  }, [createAssignmentSubmissions.isSuccess]);

  useEffect(() => {
    if (session.data?.user?.id) {
      form.setValue("userId", session.data.user.id);
    }
  }, [session.data?.user?.id]);

  return (
    <>
      <SiteHeader title="Create AssignmentSubmissions" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Create New AssignmentSubmissions
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new assignmentSubmissions to your data
            </p>
          </div>
        </div>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>AssignmentSubmissions Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                // @ts-ignore
                onSubmit={form.handleSubmit(onSubmit, onInValid)}
                className="space-y-4"
              >
                {Object.entries(AssignmentSubmissionsForm).map(([name, Field]) => (
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
                  <Button type="submit" disabled={createAssignmentSubmissions.isPending}>
                    Create AssignmentSubmissions
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
