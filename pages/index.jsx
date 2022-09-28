import Head from "next/head";
import ProductCard from "../components/ui/Card";
import { sanityClient } from "../lib/sanity.server";

// material ui
import { Typography, Container, Grid } from "@mui/material";

// components
import HeroBanner from "../components/layout/HeroBanner";

export default function Home({ allProducts }) {
  // list top selling products
  const topSellingProducts = () => {
    // sort products from lowest stock and filter products that in stock
    const results = [...allProducts]
      .sort((a, b) => a.stock - b.stock)
      .filter((e) => e.stock > 1);
    results.splice(3, results.length);

    return results
      ?.filter((product) => product.stock > 0)
      .map((product) => <ProductCard key={product._id} product={product} />);
  };

  const listProducts = () => {
    return allProducts
      ?.filter((product) => product.stock > 0)
      .map((product) => <ProductCard key={product._id} product={product} />);
  };

  return (
    <>
      <Head>
        <title>Golf Now</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container maxWidth="xl">
          <HeroBanner />
        </Container>
        <Container>
          <Container>
            <Typography variant="h3" color="primary">
              Top Selling Products
            </Typography>
            <Grid container spacing={4}>
              {topSellingProducts()}
            </Grid>
          </Container>
          <Container>
            <Typography variant="h4" color="primary">
              Check Out These Products
            </Typography>
            <Grid container spacing={4}>
              {listProducts()}
            </Grid>
          </Container>
        </Container>
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
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
  };
};
