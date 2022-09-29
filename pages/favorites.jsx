import React from "react";
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";

// material ui
import { Typography, Container, Grid, Button } from "@mui/material";

// components
import FavoriteCard from "../components/layout/FavoriteCard";

export default function Favorites({ userFavorites }) {
  const { data: session } = useSession({ required: true });

  // If session exists, display content
  if (session) {
    return (
      <>
        <Head>
          <title>Golf Now | Favorites</title>
          <meta name="description" content="Golf Products" />
          <link rel="icon" href="/golf-ball-icon.png" />
        </Head>

        <main>
          <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h3" color="primary" gutterBottom>
              Favorites
            </Typography>

            <Container>
              {userFavorites.length >= 1 ? (
                <Grid container spacing={4}>
                  {userFavorites.map((e) => (
                    <FavoriteCard key={e.id} favorites={e} />
                  ))}
                </Grid>
              ) : (
                <Typography variant="body1">No Favorites</Typography>
              )}
            </Container>
          </Container>
        </main>
      </>
    );
  }

  // show this if user is not logged in
  return (
    <>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h1" color="error" gutterBottom>
          Not signed in
        </Typography>
        <Button onClick={() => signIn()}>Sign in</Button>
      </Container>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  // check if the user is logged in, redirect to homepage if not
  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  // get user information
  const userData = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // deal with prisma dateTime error
  if (userData.emailVerified)
    userData.emailVerified = userData?.emailVerified.toISOString();

  // get user favorites
  const userFavorites = await prisma.favorite.findMany({
    where: {
      userId: userData.id,
    },
  });

  // deal with error of prisma dateTime unable to be stringified
  for (const favorite of userFavorites) {
    favorite.createdAt = favorite.createdAt.toISOString();
  }

  return {
    props: { userData, userFavorites },
  };
};
