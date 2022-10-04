import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateContext } from "../context/StateContext";
import { runFireworks } from "../lib/helper/fireworks";
import { useSession } from "next-auth/react";

// helper functions
import {
  stripeGetOrderInfo,
  prismaGetUserInfo,
  prismaCreateOrder,
  sanityUpdateProductStock,
} from "../lib/queries/api";

// material ui
import { Typography, Container, Button } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const Success = () => {
  const router = useRouter();
  const { setCartItems, cartItems } = useStateContext();
  const { data: session } = useSession();

  const processData = async () => {
    // ! for deployment purposes only
    if (process.env.NODE_ENV === "production") {
      runFireworks();
      if (cartItems.length) {
        // clear out cart items
        setCartItems([]);
        localStorage.clear();
      }
      return;
    }

    if (!router.isReady) return;
    if (!router.query?.session_id) return;

    // get stripe checkout information
    const stripeResponse = await stripeGetOrderInfo(router);
    if (stripeResponse.statusCode === 500) return;
    const stripeData = await stripeResponse.json();

    if (stripeData.session.payment_status === "paid") {
      runFireworks();

      if (cartItems.length) {
        // get information about the logged in user
        const response = await prismaGetUserInfo(session);
        if (response.statusCode === 500) return;
        const prismaUserData = await response.json();

        // store the data in prisma
        await Promise.all(
          cartItems.map(async (product) => {
            prismaCreateOrder(product, stripeData, prismaUserData);
          })
        );

        // update the stock amount in sanity
        const sanityCheck = await sanityUpdateProductStock(cartItems);
        if (sanityCheck.statusCode === 500) return;
        await sanityCheck.json();

        // clear out cart items
        setCartItems([]);
        localStorage.clear();
      }
    }
  };

  useEffect(() => {
    processData();
  }, [session]); // ! this may not be necessary when actually deployed

  return (
    <>
      <Head>
        <title>Golf Now - Payment Success</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container
          maxWidth="lg"
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LocalMallIcon fontSize="large" sx={{ mb: 2 }} />

          <Typography variant="h1" gutterBottom>
            Thank you for your order!
          </Typography>

          <Link href="/">
            <Button variant="contained">Continue Shopping</Button>
          </Link>
        </Container>
      </main>
    </>
  );
};

export default Success;
