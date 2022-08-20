import Banner from "../../../components/ui/Banner";
import Card from "../../../components/ui/Card";
import Image from "next/image";
import { cmsClient, urlFor } from "../../../lib/sanityClient";
import Head from "next/head";
import styles from "../../../styles/Category.module.css";
import { useRouter } from "next/router";
import BrandCard from "../../../components/ui/BrandCard";
import { useEffect, useState, useRef } from "react";

export default function ClubsBase({ products }) {
  const [productList, setProducts] = useState([]);
  const router = useRouter();
  const categoryName =
    router?.query?.category.charAt(0).toUpperCase() +
    router?.query?.category.slice(1);

  const getProducts = async () => {
    // update the stock amount in sanity
    const sanityCheck = await fetch("/api/sanityUpdate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(
      "🚀 ~ file: index.jsx ~ line 27 ~ getProducts ~ sanityCheck",
      sanityCheck
    );
  };

  const listProducts = (products) => {
    // filter down products into the card
    if (router.query.category.includes("brand")) {
      console.log("in listProducts brand");
      return products.map((product) => (
        <BrandCard key={product._id} brand={product} />
      ));
    }
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
        {!router.query.category.includes("brand") && (
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
        )}
        <button onClick={getProducts}>test</button>

        <div className={styles.productsContainer}>{listProducts(products)}</div>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ params: { category } }) => {
  let products = undefined;
  if (category === "brand") {
    products = await cmsClient.fetch(`*[_type == "${category}"]`);
  } else {
    products = await cmsClient.fetch(
      `*[_type == "${category}"]{..., brand->{_id,title}}`
    );
  }

  return {
    props: { products },
  };
};
