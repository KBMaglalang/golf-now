import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../../styles/Product.module.css";
import { cmsClient, urlFor } from "../../../lib/sanityClient";
import { PortableText } from "@portabletext/react";
import { useStateContext } from "../../../context/StateContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";

export default function ClubsDetails({ product }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);
  const { onAdd } = useStateContext();

  useEffect(() => {
    setProductQuantity(1);
  }, []);

  const updateQuantity = (state) => {
    if (state === "inc" && productQuantity + 1 <= product.stock) {
      setProductQuantity((prev) => prev + 1);
    }

    if (state === "dec" && productQuantity - 1 > 0) {
      setProductQuantity((prev) => prev - 1);
    }
  };

  const handleBuyNow = () => {
    onAdd(product, productQuantity);
    router.push("/cart");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{`Golf Now | ${product?.brand?.title} - ${product?.name}`}</title>
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
            <h3>{`${product?.brand?.title}`}</h3>
            <h2>{product?.name}</h2>
            {/* <span>--- can add variations here ---</span> */}
            <span>{`Available Stock: ${product?.stock}`}</span>
            <span>{`$${product?.price}`}</span>
            <div>
              <div>
                <span className="quantity-desc">
                  <span
                    className={styles.minus}
                    onClick={() => updateQuantity("dec")}
                  >
                    <AiOutlineMinus />
                  </span>
                  <span className={styles.num}>{productQuantity}</span>
                  <span
                    className={styles.plus}
                    onClick={() => updateQuantity("inc")}
                  >
                    <AiOutlinePlus />
                  </span>
                </span>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <button
                className={
                  !product?.stock
                    ? styles.disabledBuyNowButton
                    : styles.buyNowButton
                }
                disabled={!product?.stock ? true : false}
                onClick={handleBuyNow}
              >
                Buy it Now
              </button>
              <button
                className={
                  !product?.stock
                    ? styles.disabledAddToCartButton
                    : styles.addToCartButton
                }
                disabled={!product?.stock ? true : false}
                onClick={() => onAdd(product, productQuantity)}
              >
                Add to Cart
              </button>
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
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const product = await cmsClient.fetch(
    `*[_type == "${context.query.category}" && slug.current == '${context.query.slug}']{..., brand->{_id,title}}[0]`
  );

  return {
    props: { product },
  };
};
