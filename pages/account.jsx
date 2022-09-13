import React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, signOut, getSession } from "next-auth/react";

export default function Account() {
  const { data: session } = useSession({ required: true });
  // const { data: session, status } = useSession({ required: true });

  // const createUser = async () => {
  //   try {
  //     await fetch(`/api/prisma/user/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify(undefined),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  // const findUser = async () => {
  //   try {
  //     await fetch(`/api/prisma/user/`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify(undefined),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const deleteUser = async () => {
  //   try {
  //     await fetch(`/api/prisma/user/`, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify(undefined),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const createOrder = async () => {
  //   try {
  //     await fetch(`/api/prisma/order/`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify(undefined),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const findOrder = async () => {
  //   try {
  //     await fetch(`/api/prisma/order/`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify(undefined),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const updateOrder = async () => {
  //   try {
  //     await fetch(`/api/prisma/order/`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify(undefined),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const deleteOrder = async () => {
  //   try {
  //     await fetch(`/api/prisma/order/`, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       // body: JSON.stringify(undefined),
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

  return {
    props: { session },
  };
};
