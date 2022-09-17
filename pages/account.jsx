import React from "react";
import Head from "next/head";
import styles from "../styles/Account.module.css";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import OrderCard from "../components/ui/OrderCard";

export default function Account({ userData, userOrders }) {
  const { data: session } = useSession({ required: true });

  const updateUser = async (event) => {
    event.preventDefault();

    const formData = {
      phoneNumber: event.target.phoneNumber.value,
      address1: event.target.address1.value,
      address2: event.target.address2.value,
      city: event.target.city.value,
      country: event.target.country.value,
      stateProvince: event.target.stateProvince.value,
      postalCode: event.target.postalCode.value,
    };

    try {
      await fetch(`/api/prisma/user/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, userData }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const loadOrders = (orders) => {
    return orders.map((product) => (
      <OrderCard key={product.id} product={product} />
    ));
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

          <form onSubmit={updateUser} className={styles.form}>
            <div className={styles.block}>
              <span>Phone Number</span>
              <input
                type="text"
                id="phoneNumber"
                className="phoneNumber"
                defaultValue={userData.phoneNumber}
              />
            </div>
            <div className={styles.block}>
              <span>Address 1</span>
              <input
                type="text"
                id="address1"
                name="address1"
                defaultValue={userData.address1}
              />
            </div>
            <div className={styles.block}>
              <span>Address 2</span>
              <input
                type="text"
                id="address2"
                name="address2"
                defaultValue={userData.address2}
              />
            </div>
            <div className={styles.block}>
              <span>City</span>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={userData.city}
              />
            </div>
            <div className={styles.block}>
              <span>State/Province</span>
              <input
                type="text"
                id="stateProvince"
                name="stateProvince"
                defaultValue={userData.stateProvince}
              />
            </div>
            <div className={styles.block}>
              <span>Country</span>
              <input
                type="text"
                id="country"
                name="country"
                defaultValue={userData.country}
              />
            </div>
            <div className={styles.block}>
              <span>Postal Code</span>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                defaultValue={userData.postalCode}
              />
            </div>

            <button type="submit">Update Account</button>
          </form>
          <div>
            <h1>Order History</h1>
            {loadOrders(userOrders)}
          </div>
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

  // get user information
  const userData = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // get user orders
  const userOrders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
  });

  // deal with error of prisma dateTime unable to be stringified
  for (const order of userOrders) {
    order.createdAt = order.createdAt.toISOString();
  }

  return {
    props: { userData, userOrders },
  };
};
