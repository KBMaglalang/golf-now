import React from "react";
import Link from "next/link";
import Head from "next/head";

// material ui
import { Typography, Container, Button } from "@mui/material";

const Canceled = () => {
  return (
    <>
      <Head>
        <title>Golf Now - Payment Canceled</title>
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
          <Typography variant="h2" gutterBottom>
            Forgot Something?
          </Typography>

          <Link href="/">
            <Button variant="contained">Return Home</Button>
          </Link>
        </Container>
      </main>
    </>
  );
};

export default Canceled;
