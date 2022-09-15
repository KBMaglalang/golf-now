import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";
import getStripe from "../lib/stripe";

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

  const getCheckoutSessionsData = async () => {
    console.log("in getcheckoutsessions function");

    const orderIds = userOrders.map((e) => e.stripeOrderId);
    console.log(
      "🚀 ~ file: account.jsx ~ line 39 ~ getCheckoutSessionsData ~ orderIds",
      orderIds
    );

    try {
      const response = await fetch(`/api/stripe/orders/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        params: {
          order1: orderIds[0],
        },
      });
      if (response.statusCode === 500) return;
      const data = await response.json();
      console.log(
        "🚀 ~ file: account.jsx ~ line 60 ~ findOrder ~ checkoutSessionData",
        data
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {}, []);

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

          <form onSubmit={updateUser}>
            <span>Phone Number</span>
            <input
              type="text"
              id="phoneNumber"
              className="phoneNumber"
              defaultValue={userData.phoneNumber}
            />
            <span>Address 1</span>
            <input
              type="text"
              id="address1"
              name="address1"
              defaultValue={userData.address1}
            />
            <span>Address 2</span>
            <input
              type="text"
              id="address2"
              name="address2"
              defaultValue={userData.address2}
            />
            <span>City</span>
            <input
              type="text"
              id="city"
              name="city"
              defaultValue={userData.city}
            />
            <span>State/Province</span>
            <input
              type="text"
              id="stateProvince"
              name="stateProvince"
              defaultValue={userData.stateProvince}
            />
            <span>Country</span>
            <input
              type="text"
              id="country"
              name="country"
              defaultValue={userData.country}
            />
            <span>Postal Code</span>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              defaultValue={userData.postalCode}
            />
            <button type="submit">Update Account</button>
          </form>
          <div>
            <h1>Order Test</h1>
            <button onClick={getCheckoutSessionsData}>Get Orders</button>
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

  const userData = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  // console.log(
  //   "🚀 ~ file: account.jsx ~ line 190 ~ getServerSideProps ~ userData",
  //   userData
  // );

  const userOrders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
  });
  // console.log(
  //   "🚀 ~ file: account.jsx ~ line 198 ~ getServerSideProps ~ userOrders",
  //   userOrders
  // );

  // const stripe = await getStripe();
  // console.log(
  //   "🚀 ~ file: account.jsx ~ line 205 ~ getServerSideProps ~ stripe",
  //   stripe
  // );
  // const response = stripe.checkout.sessions.retrieve(
  //   userOrders[0].stripeOrderId
  // );
  // // if (response.statusCode === 500) return;
  // const data = await response.json();
  // console.log(
  //   "🚀 ~ file: account.jsx ~ line 210 ~ getServerSideProps ~ data",
  //   data
  // );

  // const result = await fetch(
  //   `/api/stripe/orders?key=${userOrders[0].stripeOrderId}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // console.log(
  //   "🚀 ~ file: account.jsx ~ line 226 ~ getServerSideProps ~ result",
  //   result
  // );

  // const response = await fetch(
  //   `/api/stripe/orders?key=cs_test_a14NWqAPyHcOFzFEMKVmOatz2NKaVj4k7DWBvJnxODTMHRIT5JpsGixvaC`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );

  return {
    props: { userData, userOrders },
  };
};
