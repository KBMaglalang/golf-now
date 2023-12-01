import { NextResponse, NextRequest } from "next/server";

// components

// context or store

// constants and functions
import { client } from "@/lib/sanity";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { cartDetails } = data;

  if (!cartDetails) {
    return new NextResponse("Missing Cart", { status: 400 });
  }

  try {
    await Promise.all(
      cartDetails.map(async (product: any) => {
        await client
          .patch(product._id)
          .dec({ stock: product.quantity })
          .commit();
      })
    );

    return new NextResponse(JSON.stringify({}), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
