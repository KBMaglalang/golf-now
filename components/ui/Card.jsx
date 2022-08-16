import styles from "./Card.module.css";
import Link from "next/link";
import { urlFor } from "../../lib/sanityClient";
import Image from "next/image";

export default function Card({
  product: { _type, slug, image, name, price, brand },
}) {
  return (
    <div className={styles.card}>
      <Link href={`/products/${_type}/${slug.current}`}>
        <a>
          <div>
            <img
              src={urlFor(image && image[0])}
              width={"100%"}
              height={"auto"}
              object-fit={"contain"}
              alt={`${_type}-${slug.current}`}
            />
          </div>
          <div className={styles.brand}>{brand?.title}</div>
          <h3>{name}</h3>
          <label>${price}</label>
        </a>
      </Link>
    </div>
  );
}
