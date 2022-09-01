import { useState, useEffect } from "react";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import CartItem from "../components/ui/CartItem";
import getStripe from "../lib/stripe";
import { cmsClient, urlFor } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";
import toast from "react-hot-toast";
import styles from "../styles/Product.module.css";

export default function Cart() {
  const { cartItems, onRemove, toggleCartItemQuantity } = useStateContext();

  const listCartItems = (items) => {
    if (!items?.length) {
      return;
    }

    const temp = items.map((e) => <CartItem key={e._id} product={e} />);
    return temp;
  };

  const handleCheckout = async () => {
    toast.loading("Redirecting...");

    // process the order with stripe
    const stripe = await getStripe();
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });
    if (response.statusCode === 500) return;
    const data = await response.json();

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  //number of unique products in the cart
  // calculate subtotal
  // calculate shipping
  // calculate sales tax
  // calculate total

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Golf Now | Cart`}</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        <h1>{`Your Cart ${
          cartItems.length ? `(${cartItems.length}) ` : ""
        }`}</h1>
        <div className="cart-container">{listCartItems(cartItems)}</div>
        <div className="cart-total-container">
          <h1>Cart Total</h1>
          <p>subtotal</p>
          <p>delivery</p>
          <p>sales tax</p>
          <p>estimated total</p>
          <div className="btn-container">
            <button type="button" className="btn" onClick={handleCheckout}>
              Pay with Stripe
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
