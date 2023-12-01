import { NextResponse, NextRequest } from "next/server";

// components

// context or store

// constants and functions
import { prisma } from "@/config/prisma/prisma";

export async function GET(req: NextRequest) {
  const keyValue = req.nextUrl?.searchParams?.get("key");

  if (!keyValue) {
    return new NextResponse("Missing Key Data", { status: 400 });
  }

  try {
    const result = await prisma.user.findUnique({
      where: {
        email: keyValue,
      },
    });

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { userDetails } = data;

  if (!userDetails) {
    return new NextResponse("Missing User Details", { status: 400 });
  }

  try {
    // update the user details
    const result = await prisma.user.update({
      where: {
        id: userDetails.id,
      },
      data: {
        ...userDetails,
      },
    });

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
