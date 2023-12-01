"use client";

import React from "react";
import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/24/outline";

// components

// context or store
import { useStateContext } from "@/context/stateContext";

// constants and functions

type Props = {
  item: CartItemType;
};

export default function CartListItem({ item }: Props) {
  const { removeFromCart } = useStateContext();

  return (
    <div className="flex flex-col space-y-2">
      {/* cart item header */}
      <div className="flex flex-row justify-between items-center ">
        <Link
          href={`/${item._type}/${item.slug.current}`}
          className="font-bold text-xl flex-1"
        >
          {item.name}
        </Link>

        {/* delete button */}
        <button
          className="btn btn-square "
          onClick={() => removeFromCart(item._id)}
        >
          <XCircleIcon className="w-5 h-5" />
        </button>
      </div>

      {/* cart item detail */}
      <div className="flex flex-row justify-between">
        <span className="">{`$${item.price.toFixed(2)}`}</span>
        <span className="">{item.quantity}</span>
        <span className="">{`$${(item.price * item.quantity).toFixed(
          2
        )}`}</span>
      </div>
    </div>
  );
}
