/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import GradesForm from "@/components/custom/grades/form-fields";
import { SiteHeader } from "@/components/shared/site-header";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCreateGrades } from "@/services/grades-service";
import { GradesCreateInput } from "@/types/entities";
import { gradeInsertSchema } from "@/validations/insert";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitErrorHandler, useForm } from "react-hook-form";
import { defaultValues } from "@/lib/consts/defaultValues";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useEffect } from "react";
import { useGetClasses } from "@/services/classes-service";
import { useGetStudents } from "@/services/students-service";

export default function GradesCreatePage() {
  const createGrades = useCreateGrades();
  const session = useSession();
  const form = useForm<GradesCreateInput>({
    resolver: zodResolver(gradeInsertSchema),
    defaultValues: {
      ...defaultValues.grade.insert,
      userId: session.data?.user?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const { data: classes , mutate: mutateClasses} = useGetClasses();
  const { data: students, mutate: mutateStudents } = useGetStudents();

  const onSubmit = async (data: GradesCreateInput) => {
    const userId = session.data?.user?.id;
    if (userId) {
      createGrades.mutate({ ...data, userId });
    }
  };

  const onInValid = (errors: SubmitErrorHandler<z.infer<typeof gradeInsertSchema>>) => {
    console.error(errors);
    form.reset(form.getValues());
  };

  useEffect(() => {
    if (createGrades.isSuccess) {
      form.reset();
    }
  }, [createGrades.isSuccess]);

  useEffect(() => {
    if (session.data?.user?.id) {
      form.setValue("userId", session.data.user.id);
      mutateClasses({userId: session.data.user.id});
      mutateStudents({userId: session.data.user.id});
    }
  }, [session.data?.user?.id]);

  return (
    <>
      <SiteHeader title="Create Grades" />
      <div className="flex flex-1 flex-col p-4 md:p-6 gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Create New Grades
            </h1>
            <p className="text-sm text-muted-foreground">
              Add a new grades to your data
            </p>
          </div>
        </div>
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Grades Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                // @ts-ignore
                onSubmit={form.handleSubmit(onSubmit, onInValid)}
                className="space-y-4"
              >
                {Object.entries(GradesForm).map(([name, Field]) => (
                  <Field data={{ classes, students }} key={name} form={form} />
                ))}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
                  >
                    Reset
                  </Button>
                  <Button type="submit" disabled={createGrades.isPending}>
                    Create Grades
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
