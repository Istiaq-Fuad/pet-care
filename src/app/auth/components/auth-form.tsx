"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logIn from "../actions/login";
import signUp from "../actions/signUp";
import AuthFormButton from "./auth-form-btn";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authFormSchema,
  AuthFormType,
} from "@/lib/validation/auth-form-validation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AuthErrorMessage from "./auth-error";
import { useRouter } from "next/navigation";

function AuthForm({ formType }: { formType: "login" | "signup" }) {
  const router = useRouter();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<AuthFormType>({
    resolver: zodResolver(authFormSchema),
  });

  type serverErrorType = {
    email?: string;
    password?: string;
    default?: string;
  };

  const [serverError, setServerError] = useState<serverErrorType>({});

  return (
    <form
      action={async () => {
        const isValid = await trigger();
        if (!isValid) return;

        const formValues = getValues();

        if (formType === "signup") {
          const error = await signUp(formValues);
          if (error) {
            setServerError((prev) => ({
              ...prev,
              ...error,
            }));
          }
        } else if (formType === "login") {
          const error = await logIn(formValues);
          if (error) {
            setServerError((prev) => ({
              ...prev,
              ...error,
            }));
          }
          router.push("/app/dashboard");
        }
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} className="max-w-56" />
          {errors.email?.message && (
            <AuthErrorMessage message={errors.email.message} />
          )}
          {serverError.email && (
            <AuthErrorMessage message={serverError.email} />
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" {...register("password")} />
          {errors.password?.message && (
            <AuthErrorMessage message={errors.password.message} />
          )}
          {serverError.password && (
            <AuthErrorMessage message={serverError.password} />
          )}
        </div>
      </div>

      <div>
        <AuthFormButton formType={formType} />
      </div>

      {serverError.default && (
        <AuthErrorMessage message={serverError.default} />
      )}
    </form>
  );
}

export default AuthForm;
