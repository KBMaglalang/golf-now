import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/fireworks";
import { useSession } from "next-auth/react";

const Success = () => {
  const router = useRouter();
  const { setCartItems, cartItems } = useStateContext();
  const { data: session } = useSession({ required: true });

  const processData = async () => {
    if (!router.isReady) return;
    if (!router.query?.session_id) return;

    const stripeResponse = await fetch(
      `/api/stripe/orders?key=${router.query.session_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (stripeResponse.statusCode === 500) return;
    const stripeData = await stripeResponse.json();
    console.log(
      "🚀 ~ file: success.jsx ~ line 28 ~ processData ~ stripeData",
      stripeData
    );

    if (stripeData.session.payment_status === "paid") {
      runFireworks();

      if (cartItems.length) {
        // get information about the logged in user
        console.log("user session", session);

        const response = await fetch(
          `/api/prisma/user?key=${session.user.email}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.statusCode === 500) return;
        const prismaUserData = await response.json();
        console.log(
          "🚀 ~ file: success.jsx ~ line 51 ~ processData ~ prismaUserData",
          prismaUserData
        );

        // store the data in prisma
        const prismaResponse = await fetch(`/api/prisma/order/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItems: cartItems[0], stripeData }),
        });
        if (prismaResponse.statusCode === 500) return;
        const data = await prismaResponse.json();
        console.log(
          "🚀 ~ file: success.jsx ~ line 41 ~ processData ~ data",
          data
        );

        // update the stock amount in sanity
        const sanityCheck = await fetch("/api/sanityUpdate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItems),
        });
        if (sanityCheck.statusCode === 500) return;
        const dataSanity = await sanityCheck.json();

        // clear out cart items
        setCartItems([]);
        localStorage.clear();
      }
    }
  };

  useEffect(() => {
    processData();
  }, [router.isReady]); // ! this may not be necessary when actually deployed

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt</p>
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
