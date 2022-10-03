import React from "react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanity/sanity.server";

// material ui
import { Typography, Container, Grid } from "@mui/material";

// components
import BrandCard from "../components/ui/BrandCard";
import ProductCard from "../components/ui/Card";

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

  // list products associated with type or brand
  const listProducts = (items) => {
    const isProductsBrands = productList?.filter((e) => e._type === "brand");
    if (isProductsBrands.length) {
      return items.map((product) => (
        <BrandCard key={product._id} brand={product} handler={getProducts} />
      ));
    }
    return items.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
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
              {listProducts(productList)}
            </Grid>
          </Container>
        </Container>
      </main>
    </>
  );
}

export const getStaticProps = async (context) => {
  const products = await sanityClient.fetch(`*[_type == "brand"]`);

  return {
    props: { products },
    revalidate: 10,
  };
};
