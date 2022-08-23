import styles from "./Card.module.css";
import Link from "next/link";
import { urlFor } from "../../lib/sanityClient";
import Image from "next/image";

export default function Card({ product }) {
  return (
    <div className={styles.card}>
      <Link href={`/products/${product?._type}/${product?.slug.current}`}>
        <a>
          <div>
            <img
              src={urlFor(product?.image && product?.image[0])}
              width={"100%"}
              height={"auto"}
              object-fit={"contain"}
              alt={`${product?._type}-${product?.slug.current}`}
            />
          </div>
          <div className={styles.brand}>{product?.brand?.title}</div>
          <h3>{product?.name}</h3>
          {product?.stock > 0 && <label>${product?.price}</label>}
          {!product?.stock && (
            <div>
              <label
                className={!product?.stock && styles.strike}
              >{`$${product?.price}`}</label>
              <label> SOLD OUT</label>
            </div>
          )}
        </a>
      </Link>
    </div>
  );
}
