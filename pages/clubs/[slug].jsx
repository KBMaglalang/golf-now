import Head from "next/head";
import styles from "../../styles/Home.module.css"; // ! could change this to another css
// import { cmsClient, urlFor } from "../lib/sanityClient";
import { cmsClient, urlFor } from "../../lib/sanityClient";

export default function ClubsDetails({ props }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Golf Now - About Us</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        <p>brand</p>
        <p>name</p>
        <p>sku</p>
        <p>images</p>
        <p>price</p>
        <p>
          in stock or not - default settings and then updated on client side
        </p>
        <p>description</p>
        <p>features</p>
        <p>recommendations</p>
      </main>
    </div>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == "clubs"] {slug {current}}`;
  const products = await cmsClient.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const product = await cmsClient.fetch(
    `*[_type == "clubs" && slug.current == '${slug}'][0]`
  );
  const brand = await cmsClient.fetch(
    `*[_type == "brand" && _id == '${product.brand._ref}']`
  );

  return {
    props: { brand, product },
    revalidate: 1,
  };
};
