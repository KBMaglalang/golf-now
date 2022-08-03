import styles from "./Card.module.css";
import Link from "next/link";
import { urlFor } from "../../lib/sanityClient";
import Image from "next/image";

export default function Card({ product: { _type, slug, image, name, price } }) {
  return (
    <div className={styles.card}>
      <Link href={`/${_type}/${slug.current}`}>
        <a>
          <div>
            <img
              src={urlFor(image && image[0])}
              width={"auto"}
              height={300}
              object-fit={"contain"}
              alt={`${_type}-${slug.current}`}
            />
          </div>
          <div></div>
          <div>{name}</div>
          <div>{price}</div>
        </a>
      </Link>
      {/* <Image src="/" alt="pic" width={500} height={500} /> */}
    </div>
  );
}
