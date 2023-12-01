"use client";

import React from "react";
import type { Order } from "@prisma/client";

// components

// context or store

// constants and functions

type Props = {
  ordersList: Order[];
};

export function ViewOrders({ ordersList }: Props) {
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h1 className="font-bold text-2xl">Orders</h1>
      </div>

      {/* content */}
      <div className="h-full">
        {ordersList.map((order: Order) => (
          <div
            key={order.id}
            className="flex md:flex-row flex-col justify-between border border-gray-200 rounded-md p-4 my-4"
          >
            <h2 className="font-bold md:w-3/6 truncate">{order.productName}</h2>
            <h2 className="md:w-1/6">SKU: {order.productSKU}</h2>
            <h2 className="md:w-1/6">Quantity: {order.quantity}</h2>
            <h2 className="md:w-1/6">Total: ${order.productSubTotal / 100}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
