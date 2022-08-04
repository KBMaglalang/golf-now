import Head from "next/head";
import styles from "../../styles/Home.module.css"; // ! could change this to another css
// import { cmsClient, urlFor } from "../lib/sanityClient";
import { cmsClient, urlFor } from "../../lib/sanityClient";

export default function ClubsDetails({ productBrand, product }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{`Golf Now - ${productBrand?.title} | ${product?.name}`}</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        <div>
          <div className="productImagesContainer">
            <p>images</p>
          </div>
          <div className="productDetailsContainer">
            <h4>{`SKU: ${product?.sku}`}</h4>
            <h3>{`${productBrand?.title}`}</h3>
            <h3>{product?.name}</h3>
            <p>
              in stock or not - default settings and then updated on client side
            </p>
            <p>{`$${product?.price}`}</p>
          </div>
        </div>
        <div className="productDescriptionContainer">
          <div>
            <h3>Product Description</h3>
          </div>
          <div>
            <h3>Product Features</h3>
          </div>
        </div>
        <div className="recommendationContainer">
          <h3>Recommended Products</h3>
        </div>
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
  const productBrand = await cmsClient.fetch(
    `*[_type == "brand" && _id == '${product.brand._ref}'][0]`
  );

  return {
    props: { productBrand, product },
    revalidate: 1,
  };
};
