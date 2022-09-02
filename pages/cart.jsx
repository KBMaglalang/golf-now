import { useState, useEffect } from "react";
import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import CartItem from "../components/ui/CartItem";
import getStripe from "../lib/stripe";
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

  const getTotal = (items) => {
    if (!items?.length) {
      return;
    }

    const results = items
      .reduce((p, c) => p + c.price * c.quantity, 0)
      .toFixed(2);

    return results;
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

        {!cartItems.length && <span>Cart is Empty</span>}

        <div>{listCartItems(cartItems)}</div>

        {!!cartItems.length && (
          <div className={styles.productImagesContainer}>
            <h1>{`Cart Total: $${getTotal(cartItems)}`}</h1>

            <div>
              <button
                type="button"
                className={styles.addToCartButton}
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
