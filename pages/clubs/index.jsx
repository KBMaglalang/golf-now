import Banner from "../../components/ui/Banner";
import Card from "../../components/ui/Card";
import Image from "next/image";
import { cmsClient, urlFor } from "../../lib/sanityClient";
import Head from "next/head";
import styles from "../../styles/Product.module.css"; // ! could change this to another css

export default function ClubsBase({ products }) {
  const listProducts = (products) => {
    // filter down products into the card
    return products
      ?.filter((product) => product.stock > 0)
      .map((product) => <Card key={product.sku} product={product} />);
  };

  const loadMoreProducts = () => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Golf Now`}</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main className={styles.main}>
        {/* <Banner /> */}
        <h1>Golf Clubs</h1>
        {/* <div className="filter-container">
          <h2>Filter</h2>
          <p>Brand</p>
          <p>Price</p>
          <p>Size</p>
          <p>Hand</p>
          <p>Shaft</p>
          <p>Flex</p>
          <p>Loft</p>
          <p>Wedge Head</p>
        </div> */}
        <div className="products-container">{listProducts(products)}</div>
        <div className="btn-container">
          <p>Showing # out of #</p>
          <button
            type="button"
            className="btn"
            onClick={() => {
              loadMoreProducts();
            }}
          >
            Load More
          </button>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  const products = await cmsClient.fetch(
    '*[_type == "clubs"]{_type, slug, image, name, price, stock, sku, brand->{_id,title}}'
  );

  return {
    props: { products },
  };
};
