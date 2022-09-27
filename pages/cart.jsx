import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import CartItem from "../components/ui/CartItem";
import getStripe from "../lib/stripe";
import toast from "react-hot-toast";
// import styles from "../styles/Product.module.css";

import { Typography, Container, Grid, Button } from "@mui/material";

export default function Cart() {
  const { cartItems } = useStateContext();

  // list items in the cart
  const listCartItems = (items) => {
    if (!items?.length) {
      return;
    }

    return items.map((e) => <CartItem key={e._id} product={e} />);
  };

  // calculate cart total
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
    const response = await fetch("/api/stripe/orders", {
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
    <>
      <Head>
        <title>{`Golf Now | Cart`}</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container maxWidth="lg">
          <Typography variant="h5" color="primary">
            {`Your Cart ${cartItems.length ? `(${cartItems.length}) ` : ""}`}
          </Typography>
          {!cartItems.length && (
            <Typography variant="body1">Cart is Empty</Typography>
          )}
        </Container>

        <Container>
          <Grid container spacing={4}>
            {listCartItems(cartItems)}
          </Grid>
        </Container>

        {!!cartItems.length && (
          <Container>
            <Typography variant="h4" color="primary">{`Cart Total: $${getTotal(
              cartItems
            )}`}</Typography>

            <Button
              variant="contained"
              color="primary"
              onClick={handleCheckout}
            >
              Pay with Stripe
            </Button>
          </Container>
        )}
      </main>
    </>
  );
}
