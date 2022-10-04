import Head from "next/head";
import { useStateContext } from "../context/StateContext";
import getStripe from "../lib/stripe/stripe";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

// helper functions
import { listCartItems } from "../lib/helper/listCartItems";
import { getTotal } from "../lib/helper/getTotal";
import { stripeCreateOrder } from "../lib/queries/api";

// material ui
import { Typography, Container, Grid, Button, Box } from "@mui/material";

export default function Cart() {
  const { cartItems } = useStateContext();
  const router = useRouter();

  const handleCheckout = async () => {
    // ! for deployment purposes only
    if (process.env.NODE_ENV === "production") {
      router.push("/success");
      return;
    }
    toast.loading("Redirecting...");

    // process the order with stripe
    const stripe = await getStripe();
    const response = await stripeCreateOrder(cartItems);

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

          <Box>
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
          </Box>
        </Container>
      </main>
    </>
  );
}
