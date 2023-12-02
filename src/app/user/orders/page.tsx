import React from "react";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

// components
import { BreadCrumb } from "@/components/Common";
import { SideBar, ViewOrders } from "@/components/User";

// context or store

// constants and functions
import { authOptions } from "@/config/auth/auth";
import { prisma } from "@/config/prisma/prisma";
import { META_TITLE, META_DESCRIPTION } from "@/constants";

export const metadata: Metadata = {
  title: `${META_TITLE} | User Orders`,
  description: META_DESCRIPTION,
  icons: {
    icon: "../../favicon.png",
  },
};

export default async function Page() {
  // get user details
  const session = await getServerSession(authOptions);

  /**

  Retrieves a user from the database based on the email address stored in the session.
  @param {Session | null} session - The user session.
  @returns {Promise<User | null>} - A promise that resolves to the User object or null if not found. */
  const user =
    session &&
    (await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    }));

  /**

  Retrieves all orders associated with a user from the database.
  @param {number | null} userId - The user ID.
  @returns {Promise<Array<Order>>} - A promise that resolves to an array of Order objects. */
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
