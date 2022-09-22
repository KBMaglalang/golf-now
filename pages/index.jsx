import Head from "next/head";
import Card from "../components/ui/Card";
import styles from "../styles/Home.module.css";
import { sanityClient } from "../lib/sanity.server";

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
        <div className={styles.topProductsContainer}>{topProductsList()}</div>
        <h1>Balls</h1>
        <div className={styles.categoryTopContainer}>{listProducts(balls)}</div>
        <h1>Clubs</h1>
        <div className={styles.categoryTopContainer}>{listProducts(clubs)}</div>
        <h1>Shoes</h1>
        <div className={styles.categoryTopContainer}>{listProducts(shoes)}</div>
        <h1>Clothing</h1>
        <div className={styles.categoryTopContainer}>
          {listProducts(clothing)}
        </div>
        <h1>Bags & Carts</h1>
        <div className={styles.categoryTopContainer}>
          {listProducts(bagCarts)}
        </div>
        <h1>Golf Tech</h1>
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
