import Head from "next/head";
import { sanityClient } from "../lib/sanity/sanity.server";

// helper functions
import { listProducts, topSellingProducts } from "../lib/helper/listProducts";

// material ui
import { Typography, Container, Grid } from "@mui/material";

// components
import HeroBanner from "../components/layout/HeroBanner";

export default function Home({ allProducts }) {
  return (
    <>
      <Head>
        <title>Golf Now</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container maxWidth="xl" sx={{ mb: 2 }}>
          <HeroBanner />
        </Container>
        <Container sx={{ mb: 4 }}>
          <Container>
            <Typography variant="h3" color="primary" gutterBottom>
              Top Selling Products
            </Typography>
            <Grid container spacing={4}>
              {topSellingProducts(allProducts)}
            </Grid>
          </Container>
          <Container>
            <Typography variant="h4" color="primary" sx={{ my: 2 }}>
              Check Out These Products
            </Typography>
            <Grid container spacing={4}>
              {listProducts(allProducts)}
            </Grid>
          </Container>
        </Container>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  // get products from sanity
  const allProducts = await sanityClient.fetch(
    '*[_type in ["balls", "clubs", "shoes", "clothing", "bag-carts", "golf-tech"]]{..., brand->{_id,title}}'
  );

  for (let i = allProducts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allProducts[i], allProducts[j]] = [allProducts[j], allProducts[i]];
  }

  return {
    props: { allProducts },
    revalidate: 10,
  };
};
