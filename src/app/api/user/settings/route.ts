import { NextResponse, NextRequest } from "next/server";

// components

// context or store

// constants and functions
import { prisma } from "@/config/prisma/prisma";

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { userDetails, userNotifications } = data;

  if (!userNotifications) {
    return new NextResponse("Missing User Details", { status: 400 });
  }

  try {
    // update the user details
    const result = await prisma.user.update({
      where: {
        id: userDetails.id,
      },
      data: {
        emailNotification: userNotifications.emailNotification,
        smsNotification: userNotifications.smsNotification,
        newsLetterNotification: userNotifications.newsLetterNotification,
      },
    });

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error: any) {
    return new NextResponse(error, {
      status: 400,
    });
  }
}
