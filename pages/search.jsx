import Card from "../components/ui/Card";
import Head from "next/head";
import { sanityClient } from "../lib/sanity.server";
import styles from "../styles/Home.module.css";

export default function search({ products }) {
  const listProducts = (items) => {
    return items.map((product) => <Card key={product.sku} product={product} />);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Golf Now | Search</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        <h1>{`Products Found (${products.length})`}</h1>
        {!products.length && <span>Nothing Found</span>}
        <div className={styles.categoryTopContainer}>
          {listProducts(products)}
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let products = undefined;
  const searchTerm = Object.values(context.query)[0];

  products = await sanityClient.fetch(`*[[_type, name] match "${searchTerm}"]`);

  // * some other search methods that could be implemented later on
  // const queryDescription = await cmsClient.fetch(
  //   `*[description[].children[].text match "${searchTerm}"]`
  // );
  // const queryFeatures = await cmsClient.fetch(
  //   `*[features[].children[].text match "${searchTerm}"]`
  // );

  return {
    props: { products },
  };
};
