"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

function AuthFormButton({ formType }: { formType: "login" | "signup" }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {formType === "login" ? "Log in" : "Sign up"}
    </Button>
  );
}

export default AuthFormButton;
