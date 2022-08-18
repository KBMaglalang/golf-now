import styles from "./BrandCard.module.css";
import Link from "next/link";
import { urlFor } from "../../lib/sanityClient";
import Image from "next/image";

export default function BrandCard({ brand: { logo, _type, title } }) {
  console.log("🚀 ~ file: BrandCard.jsx ~ line 7 ~ BrandCard ~ logo", logo);
  return (
    <div className={styles.card}>
      <Link href={`/products/${_type}/`}>
        <a>
          <div>
            <img
              src={urlFor(logo)}
              width={"100%"}
              height={"auto"}
              object-fit={"contain"}
              alt={`${title}`}
            />
          </div>
          <h3>{title}</h3>
        </a>
      </Link>
    </div>
  );
}
