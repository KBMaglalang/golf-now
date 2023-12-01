import { NextResponse, NextRequest } from "next/server";

// components
import { stripe } from "@/config/stripe/stripe.server";

// context or store

// constants and functions

export async function GET(req: NextRequest) {
  const keyValue = req.nextUrl?.searchParams?.get("key");

  if (!keyValue) {
    return new NextResponse("Missing Key Data", { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(keyValue);
    return new NextResponse(JSON.stringify(session), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { cartDetails } = data;

  if (!cartDetails) {
    return new NextResponse("Missing Cart", { status: 400 });
  }

  try {
    const params = {
      mode: "payment",
      submit_type: "pay",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        { shipping_rate: "shr_1LcEBcHuV7ggtf9uWGBesx8j" },
        { shipping_rate: "shr_1LcECcHuV7ggtf9uaZ6r4ZI5" },
      ],
      line_items: cartDetails.map((item: any) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: (item.price * 100).toFixed(0),
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}`,
    };

    const session = await stripe.checkout.sessions.create(params as any);

    return new NextResponse(JSON.stringify(session), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
