"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Form } from "@/components/ui";
import { useForm } from "react-hook-form";
import { RegisterInput, registerSchema } from "@/validations/insert";
import { StringInput } from "@/components/shared/form-inputs";
import { zodResolver } from "@hookform/resolvers/zod";

export default function RegisterPage() {
  const router = useRouter();
  
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema)
    
  })
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        toast("Error ");
        setIsLoading(false);
        return;
      }
      
      toast("Success", );
      setIsLoading(false);
      router.push('/login');
    } catch (error) {
      console.error(error);
      toast("Bad Error");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create a new EduTeach account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <StringInput form={form} name="firstName" label="First Name" required description="Enter your user name"  />
              
            </div>
            <div className="grid gap-2">
            <StringInput form={form} name="lastName" label="Last Name" required description="Enter your user name"  />
              
            </div>
            <div className="grid gap-2">
            <StringInput form={form} name="name" label="User name" required description="Enter your user name"  />
              
            </div>
            <div className="grid gap-2">
            <StringInput form={form} name="email" label="Email" required description="Enter your email"  />

            </div>
            <div className="grid gap-2">
            <StringInput form={form} name="password" label="Password" type = "password" required description="Enter your password"  />

            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-sm text-center w-full">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
