import Head from "next/head";
import { useRouter } from "next/router";
import { sanityClient } from "../../../lib/sanity/sanity.server";

// constants
import {
  ALL_PRODUCTS_QUERY,
  REVALIDATE_GET_STATIC_PROPS,
  CATEGORY_PRODUCT_QUERY,
} from "../../../lib/queries/serverSideQueries";

// helper functions
import { toUpperCaseWords } from "../../../lib/helper/toUpperCaseWords";
import { listProducts } from "../../../lib/helper/listProducts";

// material ui
import { Typography, Container, Grid } from "@mui/material";

export default function ClubsBase({ products }) {
  const router = useRouter();
  const categoryName = toUpperCaseWords(router);

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
          <Typography variant="h3" color="primary" gutterBottom>
            {categoryName}
          </Typography>

          <Container>
            <Grid container spacing={4}>
              {listProducts(products)}
            </Grid>
          </Container>
        </Container>
      </main>
    </>
  );
}

export const getStaticPaths = async () => {
  const products = await sanityClient.fetch(ALL_PRODUCTS_QUERY);

  return {
    paths: products.map((product) => ({
      params: {
        category: product._type,
        slug: product.slug.current,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { category } }) => {
  const products = await sanityClient.fetch(CATEGORY_PRODUCT_QUERY(category));

  return {
    props: { products },
    revalidate: REVALIDATE_GET_STATIC_PROPS,
  };
};
