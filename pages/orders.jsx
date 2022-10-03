import Head from "next/head";
import prisma from "../lib/prisma/prisma";
import { useSession, getSession } from "next-auth/react";

// material ui
import { Typography, Container, Grid } from "@mui/material";

// components
import OrderCard from "../components/ui/OrderCard";
import NotSignedIn from "../components/layout/NotSignedIn";

export default function Orders({ userOrders }) {
  const { data: session } = useSession({ required: true });

  // load previous orders associated with the account
  const loadOrders = (orders) => {
    return orders.map((product) => (
      <OrderCard key={product.id} product={product} />
    ));
  };

  // if session exists, display content
  if (session) {
    return (
      <>
        <Head>
          <title>Golf Now | Orders</title>
          <meta name="description" content="Golf Products" />
          <link rel="icon" href="/golf-ball-icon.png" />
        </Head>

        <main>
          <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h3" color="primary" gutterBottom>
              Order History
            </Typography>
            <Container>
              {userOrders.length >= 1 ? (
                <Grid container spacing={4}>
                  {loadOrders(userOrders)}
                </Grid>
              ) : (
                <Typography variant="body1">No Previous Orders</Typography>
              )}
            </Container>
          </Container>
        </main>
      </>
    );
  }

  // show this if user is not logged in
  return <NotSignedIn />;
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

  // get user orders
  const userOrders = await prisma.order.findMany({
    where: {
      userId: userData.id,
    },
  });

  // deal with error of prisma dateTime unable to be stringified
  for (const order of userOrders) {
    order.createdAt = order.createdAt.toISOString();
  }

  return {
    props: { userOrders },
  };
};
