import React from "react";
import Head from "next/head";
import styles from "../styles/Account.module.css";
import { useSession, getSession } from "next-auth/react";
// import prisma from "../lib/prisma";
import toast from "react-hot-toast";

export default function Favorites({ userFavorites }) {
  const { data: session } = useSession({ required: true });

  // show if the user is logged in
  if (session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Golf Now | Favorites</title>
          <meta name="description" content="Golf Products" />
          <link rel="icon" href="/golf-ball-icon.png" />
        </Head>

        <main className={styles.main}>
          <h1>Favorites</h1>
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
  // get user favorites
  const userFavorites = null;

  // const userOrders = await prisma.order.findMany({
  //   where: {
  //     userId: session.user.id,
  //   },
  // });
  // // deal with error of prisma dateTime unable to be stringified
  // for (const order of userOrders) {
  //   order.createdAt = order.createdAt.toISOString();
  // }
  return {
    props: { userFavorites },
  };
};
