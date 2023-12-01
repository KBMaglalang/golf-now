"use client";

import React from "react";

// components

// context or store

// constants and functions
import { stripePromise } from "@/config/stripe/stripe.client";

type Props = {
  cartDetails: CartItemType[];
};

export function ButtonPayment({ cartDetails }: Props) {
  const handleCheckout = async () => {
    const response = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartDetails }),
    });

    if (response.ok === false) return;
    const data = await response.json();

    const stripe = await stripePromise;
    await stripe!.redirectToCheckout({
      sessionId: data.id,
    });
  };

  return (
    <button className="btn btn-primary uppercase" onClick={handleCheckout}>
      Checkout
    </button>
  );
}
