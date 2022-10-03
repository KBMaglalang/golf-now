import Head from "next/head";
import { useRouter } from "next/router";
import { sanityClient } from "../../../lib/sanity/sanity.server";

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
  const products = await sanityClient.fetch(
    '*[_type in ["balls", "clubs", "shoes", "clothing", "bag-carts", "golf-tech"]]{..., brand->{_id,title}}'
  );

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
    revalidate: 10,
  };
};
