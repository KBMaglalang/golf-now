import React from "react";
import Head from "next/head";
import styles from "../styles/Account.module.css";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const BasicCard = ({ favorites }) => {
  const router = useRouter();
  const handleFavoriteDelete = async () => {
    const response = await fetch(`/api/prisma/favorite`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favoriteId: favorites.id,
      }),
    });
    if (response.statusCode === 500) return;
    const prismaFavoritesResponse = await response.json();
    if (prismaFavoritesResponse) {
      toast.success("Product Removed From Favorites");
    } else {
      toast.error("Unable to Remove Product");
    }
    router.reload(window.location.pathname);
  };

  return (
    <div>
      <span>{favorites.id}</span>
      <span>{favorites.createdAt}</span>
      <span>{favorites.productSKU}</span>
      <h5>{favorites.productName}</h5>
      <span>{favorites.productSanityId}</span>
      <span>{favorites.userId}</span>
      <button onClick={handleFavoriteDelete}>Remove</button>
    </div>
  );
};

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
          {userFavorites.map((e) => (
            <BasicCard key={e.id} favorites={e} />
          ))}
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
