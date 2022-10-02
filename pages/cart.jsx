import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import CartItem from "../components/ui/CartItem";
import getStripe from "../lib/stripe";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { Typography, Container, Grid, Button, Box } from "@mui/material";

export default function Cart() {
  const { cartItems } = useStateContext();
  const router = useRouter();

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
    // ! for deployment purposes only
    if (process.env.NODE_ENV === "production") {
      router.push("/success");
      return;
    }

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
        <Container maxWidth="lg" sx={{ my: 4 }}>
          <Typography variant="h3" color="primary" gutterBottom>
            {`Your Cart ${cartItems.length ? `(${cartItems.length}) ` : ""}`}
          </Typography>

          <Container>
            {cartItems.length >= 1 ? (
              <>
                <Grid
                  container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  spacing={4}
                >
                  {listCartItems(cartItems)}
                </Grid>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ my: 2 }}
                  >{`Subtotal: $${getTotal(cartItems)}`}</Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCheckout}
                  >
                    Pay with Stripe
                  </Button>
                  {process.env.NODE_ENV === "production" && (
                    <Typography variant="subtitle1" color="error">
                      Redirection to Stripe Page Disabled for Deployment
                    </Typography>
                  )}
                </Box>
              </>
            ) : (
              <Typography variant="body1">Cart is Empty</Typography>
            )}
          </Container>
        </Container>
      </main>
    </>
  );
}
