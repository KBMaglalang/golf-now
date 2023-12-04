"use client";

import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

// components
import { CartList } from "../CartList";
import { ButtonPayment } from ".";

// context or store
import { useStateContext } from "@/context/stateContext";

// constants and functions

export function ButtonCart() {
  const { cart } = useStateContext();
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="drawer drawer-end">
      {/* header button */}
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <label
        data-test="cart-button"
        htmlFor="my-drawer-4"
        className="btn btn-ghost btn-circle drawer-content drawer-button"
      >
        <div className="indicator">
          <ShoppingCartIcon className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="badge badge-sm indicator-item">
              {cartQuantity}
            </span>
          )}
        </div>
      </label>

      {/*  content */}
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* Sidebar content here */}
        <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
          {/* header */}
          <div className="w-full text-center mb-6">
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>

          {/* cart content */}
          <div
            data-test="cart-list"
            className="flex flex-col flex-1 overflow-y-auto space-y-4"
          >
            {cart.length > 0 ? (
              <CartList />
            ) : (
              <div className="w-full text-center">
                <span className="font-bold">Cart Empty</span>
              </div>
            )}
          </div>

          {/* purchase button  */}
          <div className="flex flex-col mt-6 space-y-2">
            {cart.length > 0 && (
              <>
                <div className="text-2xl font-bold ">{`Total: $${cartTotal.toFixed(
                  2
                )}`}</div>
                <ButtonPayment cartDetails={cart} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
