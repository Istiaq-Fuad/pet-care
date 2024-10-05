"use server";

import { readUserSession } from "@/lib/server-utils";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import Stripe from "stripe";

export default async function checkOut() {
  const session = await readUserSession();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const checkOutSession = await stripe.checkout.sessions.create({
    // payment_intent_data: {
    //   receipt_email: session.user.email!,
    // },
    customer_email: session.user.email!,
    mode: "payment",
    line_items: [
      {
        price: "price_1PwKkXFS41sCH25Fwp9emjEJ",
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment?canceled=true`,
  });

  if (checkOutSession.url) {
    redirect(checkOutSession.url);
  } else {
    // Handle the case where checkOutSession.url is null
    toast.error("Failed to create checkout session");
  }
}
