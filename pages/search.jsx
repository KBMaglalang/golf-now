import { useState, useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import Card from "../components/ui/Card";
import Head from "next/head";
import { cmsClient } from "../lib/sanityClient";

export default function search({ products }) {
  const listProducts = (items) => {
    return items.map((product) => <Card key={product.sku} product={product} />);
  };

  return (
    <div>
      <Head>
        <title>Golf Now</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <div>
          <h1>Products Found</h1>
          <div>{listProducts(products)}</div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  let products = undefined;
  const searchTerm = Object.values(context.query)[0];

  products = await cmsClient.fetch(`*[[_type, name] match "${searchTerm}"]`);
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
