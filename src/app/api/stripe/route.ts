import prisma from "@/lib/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  // console.log(data.data.object.customer_email);

  // verify we are getting the request from stripe
  const signature = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
      await prisma.user.update({
        where: {
          email: event.data.object.customer_email!,
        },
        data: {
          hasAccess: true,
        },
      });
    default:
      console.log("Unhandled event type: ", event.type);
  }

  //   update the user

  // send the response
  return Response.json(null, { status: 200 });
}
