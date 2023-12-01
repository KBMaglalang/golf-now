import { NextResponse, NextRequest } from "next/server";

// components

// context or store

// constants and functions
import { prisma } from "@/config/prisma/prisma";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { stripeData, cartItems, userDetails } = data;

  if (!userDetails || !cartItems || !stripeData) {
    return new NextResponse("Missing Data", { status: 400 });
  }

  try {
    // update the user details
    const result = await prisma.order.create({
      data: {
        stripeOrderId: stripeData.id,
        quantity: cartItems.quantity,
        userId: userDetails.id,
        status: "Pending",
        productSKU: cartItems.sku,
        productSubTotal: parseInt((cartItems.price * 100).toFixed(0)),
        productName: cartItems.name,
      },
    });

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
