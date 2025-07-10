"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

const AUTH_CODE = process.env.NEXT_PUBLIC_AUTH_CODE || "";

// Step 1: Define your validation schema
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  orgName: z
    .string()
    .min(2, { message: "Organization name must be at least 2 characters" }),
  authCode: z
    .string()
    .includes(AUTH_CODE, { message: "Invalid Authorization Code" }),
  name: z
    .string()
    .min(2, { message: "Name name must be at least 2 characters" }),
});

// Step 2: Infer the form's TypeScript type
type FormValues = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setError("");
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const parsedResult = await res.json();

    if (!res.ok) {
      setError(parsedResult.error || "Registration failed");
    } else {
      const { email, password } = data;
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // VERY important
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardContent className="py-8 px-6">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Registration
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="org-name" className="text-sm">
                Org name <span className="text-red-500">*</span>
              </Label>
              <Input id="org-name" {...register("orgName")} />
            </div>
            <div>
              <Label htmlFor="name" className="text-sm">
                Name <span className="text-red-500">*</span>
              </Label>
              <Input id="name" {...register("name")} />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input id="email" {...register("email")} type="email" />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm">
                Password <span className="text-red-500">*</span>
              </Label>
              <Input id="password" {...register("password")} type="password" />
            </div>
            <div>
              <Label htmlFor="auth-code" className="text-sm">
                Authorization Code <span className="text-red-500">*</span>
              </Label>
              <Input id="auth-code" {...register("authCode")} type="password" />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Register
            </Button>
          </form>
          <div className="text-center text-sm text-muted-foreground mt-4">
            Already registered?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
