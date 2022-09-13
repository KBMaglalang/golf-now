import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";

export default function Account({ userData }) {
  const { data: session } = useSession({ required: true });

  const updateUser = async () => {
    try {
      await fetch(`/api/prisma/user/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(undefined),
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Golf Now | Account</title>
          <meta name="description" content="Golf Products" />
          <link rel="icon" href="/golf-ball-icon.png" />
        </Head>

        <main className={styles.main}>
          <h1>Signed in as: {session.user.name}</h1>
          <form action="">
            <span>Phone Number</span>
            <input type="text" placeholder={"asdf"} />
            <span>Address 1</span>
            <input type="text" />
            <span>Address 2</span>
            <input type="text" />
            <span>City</span>
            <input type="text" />
            <span>Country</span>
            <input type="text" />
            <span>Postal Code</span>
            <input type="text" />
            <button>Update Account</button>
          </form>
        </main>
      </div>
    );
  }

  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const userData = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return {
    props: { userData },
  };
};
