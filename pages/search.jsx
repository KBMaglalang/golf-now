import Head from "next/head";
import { sanityClient } from "../lib/sanity/sanity.server";

// helper functions
import { listProducts } from "../lib/helper/listProducts";

// material ui
import { Typography, Container, Grid } from "@mui/material";

export default function search({ products }) {
  return (
    <>
      <Head>
        <title>Golf Now | Search</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container maxWidth="lg" sx={{ my: 4 }}>
          <Typography
            variant="h3"
            color="primary"
            gutterBottom
          >{`Products Found (${products.length})`}</Typography>
          <Container>
            {products.length >= 1 ? (
              <Grid container spacing={4}>
                {listProducts(products)}
              </Grid>
            ) : (
              <Typography variant="body1">Nothing Found</Typography>
            )}
          </Container>
        </Container>
      </main>
    </>
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
