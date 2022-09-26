import Head from "next/head";
import ProductCard from "../components/ui/Card";
import styles from "../styles/Home.module.css";
import { sanityClient } from "../lib/sanity.server";

import { Typography } from "@mui/material";
import { Container } from "@mui/material";
import HeroBanner from "../components/layout/HeroBanner";

export default function Home({
  balls,
  clubs,
  shoes,
  clothing,
  bagCarts,
  golfTech,
}) {
  // list top selling products
  const topProductsList = () => {
    const products = [
      ...balls,
      ...clubs,
      ...shoes,
      ...clothing,
      ...bagCarts,
      ...golfTech,
    ];

    if (!products.length) return;

    // sort products from lowest stock and filter products that in stock
    const results = products
      .sort((a, b) => a.stock - b.stock)
      .filter((e) => e.stock > 1);
    results.splice(3, results.length);

    return listProducts(results);
  };

  const listProducts = (products) => {
    return products
      ?.filter((product) => product.stock > 0)
      .slice(0, 3)
      .map((product) => <ProductCard key={product._id} product={product} />);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Golf Now</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        <HeroBanner />
        <Typography variant="h3" color="primary">
          Top Selling Products
        </Typography>
        <div className={styles.topProductsContainer}>{topProductsList()}</div>
        <Typography variant="h4" color="primary">
          Golf Balls
        </Typography>
        <div className={styles.categoryTopContainer}>{listProducts(balls)}</div>
        <Typography variant="h4" color="primary">
          Golf Clubs
        </Typography>
        <div className={styles.categoryTopContainer}>{listProducts(clubs)}</div>
        <Typography variant="h4" color="primary">
          Golf Shoes
        </Typography>
        <div className={styles.categoryTopContainer}>{listProducts(shoes)}</div>
        <Typography variant="h4" color="primary">
          Clothing
        </Typography>
        <div className={styles.categoryTopContainer}>
          {listProducts(clothing)}
        </div>
        <Typography variant="h4" color="primary">
          Bags & Carts
        </Typography>
        <div className={styles.categoryTopContainer}>
          {listProducts(bagCarts)}
        </div>
        <Typography variant="h4" color="primary">
          Golf Tech
        </Typography>
        <div className={styles.categoryTopContainer}>
          {listProducts(golfTech)}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  // get products from sanity
  const balls = await sanityClient.fetch(
    '*[_type == "balls"]{..., brand->{_id,title}}'
  );
  const clubs = await sanityClient.fetch(
    '*[_type == "clubs"]{..., brand->{_id,title}}'
  );
  const shoes = await sanityClient.fetch(
    '*[_type == "shoes"]{..., brand->{_id,title}}'
  );
  const clothing = await sanityClient.fetch(
    '*[_type == "clothing"]{..., brand->{_id,title}}'
  );
  const bagCarts = await sanityClient.fetch(
    '*[_type == "bag-carts"]{..., brand->{_id,title}}'
  );
  const golfTech = await sanityClient.fetch(
    '*[_type == "golf-tech"]{..., brand->{_id,title}}'
  );
  return {
    props: { balls, clubs, shoes, clothing, bagCarts, golfTech },
  };
};
