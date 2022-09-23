import React from "react";
import Head from "next/head";
import prisma from "../lib/prisma";
import OrderCard from "../components/ui/OrderCard";
import { useSession, getSession } from "next-auth/react";
import styles from "../styles/Account.module.css";

export default function Orders({ userOrders }) {
  const { data: session } = useSession({ required: true });

  // load previous orders associated with the account
  const loadOrders = (orders) => {
    return orders.map((product) => (
      <OrderCard key={product.id} product={product} />
    ));
  };

  if (session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Golf Now | Orders</title>
          <meta name="description" content="Golf Products" />
          <link rel="icon" href="/golf-ball-icon.png" />
        </Head>

        <main className={styles.main}>
          <h1>Order History</h1>
          {loadOrders(userOrders)}
        </main>
      </div>
    );
  }

  // show this if user is not logged in
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
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
