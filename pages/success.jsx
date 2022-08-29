import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/fireworks";
import { useRouter } from "next/router";

const Success = () => {
  const router = useRouter();
  const { setCartItems, setTotalPrice, setTotalQuantities, cartItems } =
    useStateContext();

  // useEffect(async () => {
  //   if (!router.isReady) return;
  //   if (!router.query?.session_id) return;

  //   const response = await fetch(`/api/stripe?key=${router.query.session_id}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (response.statusCode === 500) return;
  //   const data = await response.json();

  //   if (data.session.payment_status === "paid") {
  //     runFireworks();

  //     if (cartItems.length) {
  //       // update the stock amount in sanity
  //       const sanityCheck = await fetch("/api/sanityUpdate", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(cartItems),
  //       });
  //     }

  //     setCartItems([]);
  //     setTotalPrice(0);
  //     setTotalQuantities(0);

  //     localStorage.clear();
  //   }
  // }, [router.isReady]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        {/* <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:order@example.com">
            OOgunremi@yahoo.com
          </a>
        </p> */}
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
