import React from "react";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

// components
import { BreadCrumb } from "@/components/Common";
import { SideBar, ViewSettings } from "@/components/User";

// context or store

// constants and functions
import { authOptions } from "@/config/auth/auth";
import { prisma } from "@/config/prisma/prisma";
import { META_TITLE, META_DESCRIPTION } from "@/constants";

export const metadata: Metadata = {
  title: `${META_TITLE} | User Settings`,
  description: META_DESCRIPTION,
  icons: {
    icon: "../../favicon.png",
  },
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user =
    session &&
    (await prisma.user.findUnique({
      where: {
        email: session.user?.email!,
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
            <ViewSettings userDetails={user!} />
          </div>
        </div>
      </div>
    </main>
  );
}
