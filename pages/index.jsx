import Head from "next/head";
import Card from "../components/ui/Card";
import styles from "../styles/Home.module.css";
import { cmsClient } from "../lib/sanityClient";

export default function Home({
  balls,
  clubs,
  shoes,
  clothing,
  bagCarts,
  golfTech,
}) {
  const topProductsList = () => {
    const products = [
      ...balls,
      ...clubs,
      ...shoes,
      ...clothing,
      ...bagCarts,
      ...golfTech,
    ];

    if (!products.length) {
      return;
    }

    const results = products
      .sort((a, b) => a.stock - b.stock)
      .filter((e) => e.stock > 1);
    results.splice(3, results.length);

    return listProducts(results);
  };

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
  const balls = await cmsClient.fetch(
    '*[_type == "balls"]{..., brand->{_id,title}}'
  );

  const clubs = await cmsClient.fetch(
    '*[_type == "clubs"]{..., brand->{_id,title}}'
  );
  const shoes = await cmsClient.fetch(
    '*[_type == "shoes"]{..., brand->{_id,title}}'
  );
  const clothing = await cmsClient.fetch(
    '*[_type == "clothing"]{..., brand->{_id,title}}'
  );
  const bagCarts = await cmsClient.fetch(
    '*[_type == "bag-carts"]{..., brand->{_id,title}}'
  );
  const golfTech = await cmsClient.fetch(
    '*[_type == "golf-tech"]{..., brand->{_id,title}}'
  );

  return {
    props: { balls, clubs, shoes, clothing, bagCarts, golfTech },
  };
};
