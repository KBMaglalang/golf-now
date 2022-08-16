import Banner from "../../../components/ui/Banner";
import Card from "../../../components/ui/Card";
import Image from "next/image";
import { cmsClient, urlFor } from "../../../lib/sanityClient";
import Head from "next/head";
import styles from "../../../styles/Category.module.css";
import { useRouter } from "next/router";

export default function ClubsBase({ products }) {
  const router = useRouter();
  const categoryName =
    router?.query?.category.charAt(0).toUpperCase() +
    router?.query?.category.slice(1);

  const listProducts = (products) => {
    // filter down products into the card
    return products
      ?.filter((product) => product.stock > 0)
      .map((product) => <Card key={product.sku} product={product} />);
  };

  return (
    <div className={styles.container}>
      <Head>
        {categoryName && <title>{`Golf Now | ${categoryName}`}</title>}
        {!router?.query?.category && <title>{`Golf Now`}</title>}
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        {/* <Banner /> */}
        <h1 className={styles.categoryTitle}>{categoryName}</h1>
        <div className={styles.filterContainer}>
          <h3>Filter Products</h3>
          {/* <h2>Filter</h2>
          <p>Brand</p>
          <p>Price</p>
          <p>Size</p>
          <p>Hand</p>
          <p>Shaft</p>
          <p>Flex</p>
          <p>Loft</p>
          <p>Wedge Head</p> */}
        </div>
        <div className={styles.productsContainer}>{listProducts(products)}</div>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ params: { category } }) => {
  const products = await cmsClient.fetch(
    `*[_type == "${category}"]{_type, slug, image, name, price, stock, sku, brand->{_id,title}}`
  );

  return {
    props: { products },
  };
};
