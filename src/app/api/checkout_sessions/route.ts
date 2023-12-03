import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
// components

// context or store

// constants and functions
import { stripe } from "@/config/stripe/stripe.server";
import { prisma } from "@/config/prisma/prisma";
import { authOptions } from "@/config/auth/auth";

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
    const userSession = await getServerSession(authOptions);
    if (!userSession) {
      return new NextResponse("Missing Cart", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userSession.user?.email!,
      },
    });
    if (!user) return new NextResponse("Missing Cart", { status: 400 });

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

    const stripeSession = await stripe.checkout.sessions.create(params as any);

    await Promise.all(
      cartDetails.map(
        async (product: any) =>
          await prisma.order.create({
            data: {
              stripeOrderId: stripeSession.id,
              userId: user.id,
              status: "Payment Pending",
              quantity: product.quantity,
              productSKU: product.sku,
              productSubTotal: parseInt((product.price * 100).toFixed(0)),
              productName: product.name,
            },
          })
      )
    );

    return new NextResponse(JSON.stringify(stripeSession), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
