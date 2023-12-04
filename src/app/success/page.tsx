"use client";

import React, { useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Session } from "next-auth";

// components
import { BreadCrumb } from "@/components/Common";

// context or store
import { useStateContext } from "@/context/stateContext";

// constants and functions

const processData = async (
  cart: CartItemType[],
  stripeId: string,
  session: Session
) => {
  // get stripe checkout information
  const orderResponse = await fetch(`/api/process_order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stripeId,
      cart,
      session,
    }),
  });
  if (orderResponse.ok === false) return;
  const response = await orderResponse.json();
};
export default function Page() {
  const { cart, clearCart } = useStateContext();
  const stripeId = useSearchParams().get("session_id");
  const { data: session } = useSession();

  useEffect(() => {
    if (!stripeId || !session || !cart) return;

    processData(cart, stripeId, session);
    clearCart();
    localStorage.clear();
  }, [session, stripeId]);

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
