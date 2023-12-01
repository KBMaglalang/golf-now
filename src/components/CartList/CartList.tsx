"use client";

import React from "react";

// components
import CartListItem from "./CartListItem";

// context or store
import { useStateContext } from "@/context/stateContext";

// constants and functions

export function CartList() {
  const { cart } = useStateContext();
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* list cart items */}
      {cart.length > 0 ? (
        cart.map((item) => <CartListItem key={item._id} item={item} />)
      ) : (
        <span className="flex flex-row justify-center w-full text-center text-2xl font-bold">
          Cart Empty
        </span>
      )}
    </>
  );
}
