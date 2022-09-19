import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import payStyles from "../styles/Payment.module.css";
import Head from "next/head";

const Canceled = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Golf Now - Payment Canceled</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        <div className={payStyles.wrapper}>
          <div className={payStyles.cancel}>
            <h2>Forgot to add something to your cart?</h2>
          </div>
          <Link href="/">
            <button type="button" width="300px" className={payStyles.btn}>
              Return Home
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Canceled;
