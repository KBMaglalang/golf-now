import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanity/sanity.server";

// helper functions
import { listBrandProducts } from "../lib/helper/listProducts";

// material ui
import { Typography, Container, Grid } from "@mui/material";

export default function Brand({ products }) {
  const [productList, setProductList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    setProductList(products);
    setSelectedBrand("");
  }, [products]);

  // get products from a specific brand
  const getProducts = async (brandId) => {
    const sanityData = await fetch(`/api/sanityUpdate?id=${brandId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (sanityData.statusCode === 500) return;
    const data = await sanityData.json();
    setProductList(data.response);
    setSelectedBrand(data.response[0].brand.title);
  };

  return (
    <>
      <Head>
        <title>{`Golf Now | Brand`}</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container maxWidth="lg" sx={{ my: 4 }}>
          {selectedBrand && (
            <Typography variant="h3" color="primary" gutterBottom>
              {`Brand | ${selectedBrand}`}
            </Typography>
          )}
          {!selectedBrand && (
            <Typography variant="h3" color="primary" gutterBottom>
              Brand
            </Typography>
          )}
          <Container>
            <Grid container spacing={4}>
              {listBrandProducts(productList, getProducts)}
            </Grid>
          </Container>
        </Container>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const products = await sanityClient.fetch(`*[_type == "brand"]`);

  return {
    props: { products },
    revalidate: 10,
  };
};
