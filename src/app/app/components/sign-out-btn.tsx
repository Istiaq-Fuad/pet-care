"use client";

import { Button } from "@/components/ui/button";
import logOut from "../account/actions/signOut";
import { useTransition } from "react";
import { toast } from "sonner";

function SignOutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          const error = await logOut();

          toast.error(error?.message);
        });
      }}
    >
      Sign out
    </Button>
  );
}

export default SignOutButton;
