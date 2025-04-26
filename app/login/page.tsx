"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useSession, signIn } from "next-auth/react";
import { Form } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginInput, loginSchema } from "@/validations/insert";
import { StringInput } from "@/components/shared/form-inputs";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);

    try {
      await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      }).then(data => {
        console.log({data})
        toast.success("Success", {
          description: "Logged in successfully",
        });
        router.push("/dashboard");
      }).catch(error => {
        toast.error("Error", {
          description: error || "Failed to login",
        });
      });

      
    } catch {
      toast.error("Error", {
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function checkAuth() {
      if (session.data) {
        router.push("/dashboard");
      }
    }
    checkAuth();
  }, [router, session]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Sign in to your EduTeach account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, console.error)}
              className="space-y-4"
            >
              <div className="grid gap-2">
                <StringInput
                  form={form}
                  name="email"
                  label="Email"
                  placeholder="example@gmail.com"
                  required
                  description="Enter your email"
                />
              </div>
              <div className="grid gap-2">
                <StringInput
                  form={form}
                  name="password"
                  label="Password"
                  placeholder="*******"
                  required
                  description="Enter your password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center mt-2">
            <Link
              href="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
