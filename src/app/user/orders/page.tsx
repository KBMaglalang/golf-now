import React from "react";
import { getServerSession } from "next-auth";
import type { Order } from "@prisma/client";

// components
import { BreadCrumb } from "@/components/Common";
import { SideBar, ViewOrders } from "@/components/User";

// context or store

// constants and functions
import { authOptions } from "@/config/auth/auth";
import { prisma } from "@/config/prisma/prisma";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user =
    session &&
    (await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    }));

  const orders =
    user?.id &&
    (await prisma.order.findMany({
      where: {
        userId: user.id,
      },
    }));

  return (
    <main className="container mx-auto my-12 flex-1 p-5">
      {/* breadcrumb */}
      <BreadCrumb />

      {/* content */}
      <div className="my-12 w-full h-full flex flex-row md:space-x-4">
        {/* side bar */}
        <div className="hidden md:w-2/12  md:block">
          <SideBar />
        </div>

        {/* content */}
        <div className="md:w-10/12 w-full">
          <div className="w-full h-full md:p-4">
            {!orders ? (
              <span>No Previous Orders</span>
            ) : (
              <ViewOrders ordersList={orders!} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
