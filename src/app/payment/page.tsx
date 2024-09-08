"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import checkOut from "./actions/checkOut";

function PaymentPage() {
  return (
    <section className="h-screen flex flex-col items-center justify-center gap-y-4">
      <Logo />

      <h1 className="text-xl font-semibold text-black/80">
        PetSoft access requires payment
      </h1>

      <Button
        onClick={async () => {
          await checkOut();
        }}
      >
        Buy lifetime access for $99
      </Button>
    </section>
  );
}

export default PaymentPage;
