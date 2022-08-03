import Head from "next/head";
import Image from "next/image";
import Card from "../components/ui/Card";
import styles from "../styles/Home.module.css";
import Banner from "../components/ui/Banner";
import { cmsClient } from "../lib/sanityClient";

export default function Home({ balls, clubs, shoes }) {
  const listProducts = (products) => {
    // filter down products into the card
    return products
      ?.filter((product) => product.stock > 0)
      .slice(0, 3)
      .map((product) => <Card key={product._id} product={product} />);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Golf Now</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        {/* <Banner /> */}

        <h1>Top Selling Products</h1>
        <div className={styles.topProductsContainer}>
          {listProducts([balls, clubs, shoes])}
        </div>
        <h1>Balls</h1>
        <div className={styles.topProductsContainer}>{listProducts(balls)}</div>
        <h1>Clubs</h1>
        <div className={styles.topProductsContainer}>{listProducts(clubs)}</div>
        <h1>Shoes</h1>
        <div className={styles.topProductsContainer}>{listProducts(shoes)}</div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  const balls = await cmsClient.fetch('*[_type == "balls"]');
  const clubs = await cmsClient.fetch('*[_type == "clubs"]');
  const shoes = await cmsClient.fetch('*[_type == "shoes"]');

  return {
    props: { balls, clubs, shoes },
  };
};
