import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../../../styles/Product.module.css";
import { sanityClient } from "../../../lib/sanity.server";
import { urlForImage } from "../../../lib/sanity";
import { PortableText } from "@portabletext/react";
import { useStateContext } from "../../../context/StateContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function ClubsDetails({ product }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { onAdd } = useStateContext();
  const [favState, setFavState] = useState(false);
  const [favoriteId, setFavoriteId] = useState("");
  const [index, setIndex] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    setProductQuantity(1);
  }, []);

  useEffect(() => {
    if (session) {
      getUserFavorite();
    }
  }, [session]);

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

  const getUserFavorite = async () => {
    // get information about the logged in user
    const prismaUserResponse = await fetch(
      `/api/prisma/user?key=${session.user.email}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (prismaUserResponse.statusCode === 500) return;
    const prismaUserData = await prismaUserResponse.json();

    const response = await fetch(
      `/api/prisma/favorite?userId=${prismaUserData.id}&productSanityId=${product._id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.statusCode === 500) return;
    const productFavorite = await response.json();
    if (productFavorite.length) {
      setFavState(true);
      setFavoriteId(productFavorite[0].id);
      return;
    }

    setFavState(false);
    setFavoriteId("");
  };

  const handleProductFavorite = async () => {
    if (session) {
      // get information about the logged in user
      const prismaUserResponse = await fetch(
        `/api/prisma/user?key=${session.user.email}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (prismaUserResponse.statusCode === 500) return;
      const prismaUserData = await prismaUserResponse.json();

      // check if the product should be removed from favorites
      if (favState) {
        // remove product
        const response = await fetch(`/api/prisma/favorite`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favoriteId }),
        });
        if (response.statusCode === 500) return;
        const prismaProductDelete = await response.json();
        // setFavState(false);
        toast.success("Product Removed From Favorites");
      } else {
        // add product to favorites
        const prismaFavoriteResponse = await fetch(`/api/prisma/favorite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product, prismaUserData }),
        });
        if (prismaFavoriteResponse.statusCode === 500) return;
        const prismaFavoriteData = await prismaFavoriteResponse.json();
        // setFavState(true);
        toast.success("Added To Favorites");
      }

      getUserFavorite();
      return;
    }

    toast.error("Login or Sign Up to Add to Favorites");
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
              <img
                src={product.image[index] && urlForImage(product.image[index])}
              />
            </div>
            <div className={styles.smallImagesContainer}>
              {product.image?.map((item, i) => (
                <img
                  key={i}
                  src={item && urlForImage(item)}
                  onMouseEnter={() => setIndex(i)}
                />
              ))}
            </div>
          </div>
          <div className={styles.productDetailsContainer}>
            <h4>{`SKU: ${product?.sku}`}</h4>
            <h3>{`${product?.brand?.title}`}</h3>
            <h2>{product?.name}</h2>
            <button onClick={handleProductFavorite}>
              {favState ? "Remove From Favorites" : "Add to Favorites"}
            </button>
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
  const product = await sanityClient.fetch(
    `*[_type == "${context.query.category}" && slug.current == '${context.query.slug}']{..., brand->{_id,title}}[0]`
  );
  return {
    props: { product },
  };
};
