"use client";

import React, { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import type { User } from "@prisma/client";
import { Session } from "next-auth";

// components
import { BreadCrumb } from "@/components/Common";

// context or store
import { useStateContext } from "@/context/stateContext";

// constants and functions

const stripeGetOrderInfo = async (id: string) => {
  return await fetch(`/api/checkout_sessions?key=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const prismaGetUserInfo = async (session: Session) => {
  return await fetch(`/api/user/profile?key=${session?.user?.email}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

const prismaCreateOrder = async (
  product: CartItemType,
  stripeData: any,
  prismaUserData: User
) => {
  return await fetch(`/api/order/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cartItems: product,
      stripeData,
      userDetails: prismaUserData,
    }),
  });
};

const sanityUpdateProductStock = async (cartDetails: CartItemType[]) => {
  return await fetch("/api/sanity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartDetails }),
  });
};

export default function Page() {
  const { cart, clearCart } = useStateContext();
  const stripeId = useSearchParams().get("session_id");
  const { data: session } = useSession();

  // const processData = async () => {
  //   if (!stripeId) return;
  //   if (!session) return;

  //   // get stripe checkout information
  //   const stripeResponse = await stripeGetOrderInfo(stripeId);
  //   if (stripeResponse.ok === false) return;
  //   const stripeData = await stripeResponse.json();

  //   if (stripeData?.payment_status === "paid") {
  //     if (cart.length) {
  //       // get information about the logged in user
  //       const response = await prismaGetUserInfo(session);
  //       if (response.ok === false) return;
  //       const prismaUserData = await response.json();

  //       // store the data in prisma
  //       await Promise.all(
  //         cart.map(async (product) => {
  //           prismaCreateOrder(product, stripeData, prismaUserData);
  //         })
  //       );

  //       // update the stock amount in sanity
  //       const sanityCheck = await sanityUpdateProductStock(cart);
  //       if (sanityCheck.ok === false) return;
  //       await sanityCheck.json();

  //       // clear out cart items
  //       clearCart();
  //       localStorage.clear();
  //     }
  //   }
  // };

  // clear the cart
  // useEffect(() => {
  //   processData();
  // }, []);

  return (
    <main className="container mx-auto my-12 flex-1 p-5">
      {/* breadcrumb */}
      <BreadCrumb />

      {/* content */}
      <div className="flex flex-col my-12 w-full h-full">
        <div className="text-center flex flex-col items-center justify-center space-y-4">
          <CheckCircleIcon className="w-16 h-16 text-green-500" />
          <h1 className="text-2xl font-bold">Thank You For Your Order!</h1>
        </div>
      </div>
    </main>
  );
}