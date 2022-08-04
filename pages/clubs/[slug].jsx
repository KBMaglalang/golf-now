import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../styles/Product.module.css"; // ! could change this to another css
import { cmsClient, urlFor } from "../../lib/sanityClient";
import Card from "../../components/ui/Card";

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
              <img
                src={product.image[index] && urlFor(product.image[index])}
                className="product-detail-image"
              />
            </div>
            <div className="small-images-container">
              {product.image?.map((item, i) => (
                <img
                  key={i}
                  src={item && urlFor(item)}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={(e) => setIndex(i)}
                  height={200}
                />
              ))}
            </div>
          </div>
          <div className={styles.productDetailsContainer}>
            <h4>{`SKU: ${product?.sku}`}</h4>
            <h3>{`${productBrand?.title}`}</h3>
            <h3>{product?.name}</h3>
            <p>
              in stock or not - default settings and then updated on client side
            </p>
            <label>{`$${product?.price}`}</label>
          </div>
        </div>
        <div className={styles.productDescriptionContainer}>
          <div>
            <h3>Product Description</h3>
          </div>
          <div>
            <h3>Product Features</h3>
          </div>
        </div>
        <div>
          <h3>Recommended Products</h3>
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
