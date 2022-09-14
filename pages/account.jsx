import React, { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useSession, getSession } from "next-auth/react";
import prisma from "../lib/prisma";

export default function Account({ userData }) {
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

  // ! to be moved to the server side
  // const getOrders = async () => {
  //   console.log("in getOrders function");

  //   const response = await fetch(
  //     `/api/stripe/orders?key=cs_test_a14NWqAPyHcOFzFEMKVmOatz2NKaVj4k7DWBvJnxODTMHRIT5JpsGixvaC`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );

  //   if (response.statusCode === 500) return;
  //   const data = await response.json();
  //   console.log("🚀 ~ file: account.jsx ~ line 61 ~ getOrders ~ data", data);
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
            <h1>Order Request</h1>
            {/* <button onClick={() => getOrders()}>getPreviousOrders</button> */}
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

  return {
    props: { userData },
  };
};
