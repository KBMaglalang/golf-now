import React from "react";
import Head from "next/head";
import { signIn } from "next-auth/react";

// material ui
import { Typography, Container, Grid, Button } from "@mui/material";

export default function NotSignedIn() {
  return (
    <>
      <Head>
        <title>Golf Now | Not Signed In</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container maxWidth="lg" sx={{ my: 4 }}>
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={4}
          >
            <Grid item>
              <Typography variant="h3" color="error" gutterBottom>
                Not signed in
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={() => signIn()}>
                Sign in
              </Button>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}
