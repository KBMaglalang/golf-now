import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sanityClient } from "../../../lib/sanity.server";

// material ui
import { Typography, Container, Grid } from "@mui/material";

// components
import BrandCard from "../../../components/ui/BrandCard";
import ProductCard from "../../../components/ui/Card";

export default function ClubsBase({ products }) {
  const [productList, setProductList] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const router = useRouter();
  const categoryName =
    router?.query?.category.charAt(0).toUpperCase() +
    router?.query?.category.slice(1);

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
  const listProducts = (products) => {
    const isProductsBrands = productList?.filter((e) => e._type === "brand");
    if (router.query.category.includes("brand") && isProductsBrands.length) {
      return products.map((product) => (
        <BrandCard key={product._id} brand={product} handler={getProducts} />
      ));
    }
    return products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ));
  };

  return (
    <>
      <Head>
        {categoryName && <title>{`Golf Now | ${categoryName}`}</title>}
        {!router?.query?.category && <title>{`Golf Now`}</title>}
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container maxWidth="lg" sx={{ my: 4 }}>
          {selectedBrand && (
            <Typography variant="h3" color="primary" gutterBottom>
              {categoryName} | {selectedBrand}
            </Typography>
          )}
          {!selectedBrand && (
            <Typography variant="h3" color="primary" gutterBottom>
              {categoryName}
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

export const getServerSideProps = async ({ params: { category } }) => {
  let products = undefined;
  if (category === "brand") {
    products = await sanityClient.fetch(`*[_type == "${category}"]`);
  } else {
    products = await sanityClient.fetch(
      `*[_type == "${category}"]{..., brand->{_id,title}}`
    );
  }

  return {
    props: { products },
  };
};
