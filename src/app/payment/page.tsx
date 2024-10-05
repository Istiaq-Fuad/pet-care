"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import checkOut from "./actions/checkOut";
import { useTransition } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function PaymentPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const { data: session, update, status } = useSession();
  const router = useRouter();

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-y-4">
      <Logo />

      <h1 className="text-xl font-semibold text-black/80">
        PetSoft access requires payment
      </h1>

      {!searchParams.success && (
        <Button
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await checkOut();
            });
          }}
        >
          Buy lifetime access for $99
        </Button>
      )}

      {searchParams.success && (
        <div className="flex flex-col justify-center items-center gap-y-5">
          <Button
            onClick={async () => {
              await update(true);
              router.push("/app/dashboard");
            }}
            disabled={status === "loading" || session?.user.hasAccess}
          >
            Access PetSoft
          </Button>
          <p className="p-4 bg-green-100 text-green-800 rounded-md">
            Payment successful!
          </p>
        </div>
      )}

      {searchParams.canceled && (
        <div className="p-4 bg-red-100 text-red-800 rounded-md">
          Payment canceled, try again!
        </div>
      )}
    </section>
  );
}

export default PaymentPage;
