import { NextResponse, NextRequest } from "next/server";

// components

// context or store

// constants and functions
import { prisma } from "@/config/prisma/prisma";

export async function DELETE(req: NextRequest) {
  const keyValue = req.nextUrl?.searchParams?.get("key");

  if (!keyValue) {
    return new NextResponse("Missing Key Data", { status: 400 });
  }

  try {
    const result = await prisma.user.delete({
      where: {
        id: keyValue,
      },
    });

    return new NextResponse(JSON.stringify({ result }), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify({ error, ok: false }), {
      status: 400,
    });
  }
}
