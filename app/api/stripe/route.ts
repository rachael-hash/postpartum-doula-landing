import { type NextRequest, NextResponse } from "next/server";

// Retrieve the Stripe secret key from environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
// Initialise Stripe only when the secret key is available
const stripe = stripeSecretKey ? require("stripe")(stripeSecretKey) : null;

export async function POST(request: NextRequest) {
  // If Stripe isn't configured, return a 500 error response
  if (!stripe) {
    return NextResponse.json({ error: "Stripe secret key not configured" }, { status: 500 });
  }

  try {
    const { priceId } = await request.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId, // The price ID must be created in your Stripe dashboard
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${request.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get("origin")}/`,
      metadata: {
        product: "pregnancy-postpartum-guide",
      },
    });

    // Return the session ID in the response
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session", error);
    return NextResponse.json({ error: "Error creating checkout session" }, { status: 500 });
  }
}
