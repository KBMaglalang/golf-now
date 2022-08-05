import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/Product.module.css"; // ! could change this to another css
import { cmsClient, urlFor } from "../../lib/sanityClient";
import Card from "../../components/ui/Card";
import { PortableText } from "@portabletext/react";

export default function ClubsDetails({ productBrand, product, products }) {
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Golf Now - ${productBrand?.title} | ${product?.name}`}</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.productContainer}>
          <div className={styles.productImagesContainer}>
            <div className={styles.imageContainer}>
              <img src={product.image[index] && urlFor(product.image[index])} />
            </div>
            <div className={styles.smallImagesContainer}>
              {product.image?.map((item, i) => (
                <img
                  key={i}
                  src={item && urlFor(item)}
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
          <div className={styles.productDetailsContainer}>
            <h4>{`SKU: ${product?.sku}`}</h4>
            <h3>{`${productBrand?.title}`}</h3>
            <h2>{product?.name}</h2>
            <span>--- can add variations here ---</span>
            <span>{`Available Stock: ${product?.stock}`}</span>
            <span>{`$${product?.price}`}</span>
            <div className={styles.buttonContainer}>
              <button className={styles.buyNowButton}>Buy it Now</button>
              <button className={styles.addToCartButton}>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className={styles.productDescriptionContainer}>
          <div>
            <h3>Product Description</h3>
            <PortableText value={product?.description} />
          </div>
          <div>
            <h3>Product Features</h3>
            <PortableText value={product?.features} />
          </div>
        </div>
        <h3>Recommended Products</h3>
        <div>
          <div>
            <div className={styles.recommendationContainer}>
              {products.map((item) => (
                <Card key={item._id} product={item} />
              ))}
            </div>
          </div>
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
  const products = await cmsClient.fetch(
    '*[_type == "clubs"]{_type, slug, image, name, price, stock, brand->{_id,title}}'
  );
  console.log(
    "🚀 ~ file: [slug].jsx ~ line 72 ~ getStaticProps ~ products",
    products
  );
  const product = await cmsClient.fetch(
    `*[_type == "clubs" && slug.current == '${slug}'][0]`
  );
  const productBrand = await cmsClient.fetch(
    `*[_type == "brand" && _id == '${product?.brand._ref}'][0]`
  );

  return {
    props: { productBrand, product, products },
    revalidate: 1,
  };
};
