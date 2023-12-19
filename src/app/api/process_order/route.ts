import { NextResponse, NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

// components

// context or store

// constants and functions
import { prisma } from "@/config/prisma/prisma";
import { client as sanityClient } from "@/lib/sanity";
import { stripe } from "@/config/stripe/stripe.server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { stripeId, cart, session } = data;

  if (!stripeId || !cart || !session) {
    return new NextResponse("Missing Arguments", { status: 400 });
  }

  try {
    // get order details
    const orderDetails = await stripe.checkout.sessions.retrieve(stripeId);
    if (!orderDetails || orderDetails.payment_status !== "paid")
      return new NextResponse("No Changes", { status: 200 });

    // get prisma user details
    const user = await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });
    if (!user) return new NextResponse("Missing Cart", { status: 400 });

    // update the orders in prisma
    await prisma.order.updateMany({
      where: {
        stripeOrderId: stripeId,
        userId: user.id,
      },
      data: {
        status: "Paid",
      },
    });

    // update the sanity stock for each product
    await Promise.all(
      cart.map(async (product: any) => {
        revalidateTag(`${product.slug.current}`);
        await sanityClient
          .patch(product._id)
          .dec({ stock: product.quantity })
          .commit();
      })
    );

    return new NextResponse(JSON.stringify("Order Updated"), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
