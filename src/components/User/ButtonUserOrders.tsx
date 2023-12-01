import React from "react";
import Link from "next/link";

// components

// context or store

// constants and functions

export default function ButtonUserOrders() {
  return (
    <Link href={"/user/orders"} className="btn btn-ghost">
      Orders
    </Link>
  );
}
