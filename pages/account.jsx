import React from "react";
import Head from "next/head";
import styles from "../styles/Account.module.css";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import OrderCard from "../components/ui/OrderCard";
import InputBox from "../components/ui/InputBox";
import toast from "react-hot-toast";

export default function Account({ userData, userOrders }) {
  const { data: session } = useSession({ required: true });

  // update information in prisma
  const updateUser = async (event) => {
    event.preventDefault();
    const loading = toast.loading("Updating Account Information");

    // setup data to pass over db
    const formData = {
      phoneNumber: event.target.phoneNumber.value,
      address1: event.target.address1.value,
      address2: event.target.address2.value,
      city: event.target.city.value,
      country: event.target.country.value,
      stateProvince: event.target.stateProvince.value,
      postalCode: event.target.postalCode.value,
    };

    // update content in prisma
    await fetch(`/api/prisma/user/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData, userData }),
    });

    toast.remove(loading);
    toast.success("Update Complete");
  };

  // load previous orders associated with the account
  const loadOrders = (orders) => {
    return orders.map((product) => (
      <OrderCard key={product.id} product={product} />
    ));
  };

  // show if the user is logged in
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

          <h2>Account Information</h2>
          <form onSubmit={updateUser} className={styles.form}>
            <InputBox
              inputTitle="Phone Number"
              inputId="phoneNumber"
              inputDefaultValue={userData.phoneNumber}
            />
            <InputBox
              inputTitle="Address 1"
              inputId="address1"
              inputDefaultValue={userData.address1}
            />
            <InputBox
              inputTitle="Address 2"
              inputId="address2"
              inputDefaultValue={userData.address2}
            />
            <InputBox
              inputTitle="City"
              inputId="city"
              inputDefaultValue={userData.city}
            />
            <InputBox
              inputTitle="State/Province"
              inputId="stateProvince"
              inputDefaultValue={userData.stateProvince}
            />
            <InputBox
              inputTitle="Country"
              inputId="country"
              inputDefaultValue={userData.country}
            />
            <InputBox
              inputTitle="Postal Code"
              inputId="postalCode"
              inputDefaultValue={userData.postalCode}
            />
            <button className={styles.updateAccountButton} type="submit">
              Update Account
            </button>
          </form>
          <br />
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
