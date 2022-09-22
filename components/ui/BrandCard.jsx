import styles from "./BrandCard.module.css";
import { urlForImage } from "../../lib/sanity";

export default function BrandCard({ brand: { logo, title, _id }, handler }) {
  return (
    <div
      className={styles.card}
      onClick={() => {
        handler(_id);
      }}
    >
      <a>
        <div>
          <img
            src={urlForImage(logo)}
            width={"100%"}
            height={"auto"}
            object-fit={"contain"}
            alt={`${title}`}
          />
        </div>
        <h3>{title}</h3>
      </a>
    </div>
  );
}
