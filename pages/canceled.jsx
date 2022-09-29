import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import payStyles from "../styles/Payment.module.css";
import Head from "next/head";

// material ui
import { Typography, Container, Grid, Button } from "@mui/material";

const Canceled = () => {
  return (
    <>
      <Head>
        <title>Golf Now - Payment Canceled</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container maxWidth="lg">
          <Typography>Forgot to add something to your cart?</Typography>

          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </Container>
      </main>
    </>
  );
};

export default Canceled;
