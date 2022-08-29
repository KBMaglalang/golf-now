import { useState, useEffect } from "react";
import Head from "next/head";
import { cmsClient, urlFor } from "../lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { useStateContext } from "../context/StateContext";
import CartItem from "../components/ui/CartItem";

export default function Cart() {
  const { cartItems, onRemove, toggleCartItemQuantity } = useStateContext();

  const listCartItems = (items) => {
    if (!items?.length) {
      return;
    }

    const temp = items.map((e) => <CartItem key={e._id} product={e} />);
    return temp;
  };

  //number of unique products in the cart
  // calculate subtotal
  // calculate shipping
  // calculate sales tax
  // calculate total

  return (
    <div>
      <Head>
        <title>{`Golf Now | Cart`}</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <h1>Your Cart</h1>
      <div className="cart-container">{listCartItems(cartItems)}</div>
      <div className="cart-total-container">
        <h1>Cart Total</h1>
        <p>subtotal</p>
        <p>delivery</p>
        <p>sales tax</p>
        <p>estimated total</p>
        <div className="btn-container">
          <button type="button" className="btn">
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  );
}
