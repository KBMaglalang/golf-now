import { urlForImage } from "../../lib/sanity";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import styles from "./CartItem.module.css";

export default function CartItem({ product }) {
  const { onRemove, toggleCartItemQuantity } = useStateContext();

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img
          src={urlForImage(product?.image && product?.image[0])}
          width={"100%"}
          height={"auto"}
          object-fit={"contain"}
          alt={`${product?._type}-${product?.slug.current}`}
        />
      </div>

      <div className={styles.productInfo}>
        <div className={styles.productName}>
          <span className={styles.productBrand}>{product?.brand?.title}</span>
          <span>{product?.name}</span>
        </div>
      </div>

      <div className={styles.priceContainer}>
        <span>{`Price: $${product?.price}`}</span>

        <span className={styles.productQuantity}>
          <span
            className={styles.minus}
            onClick={() => toggleCartItemQuantity(product._id, "dec")}
          >
            <AiOutlineMinus />
          </span>
          <span className={styles.num}>{product?.quantity}</span>
          <span
            className={styles.plus}
            onClick={() => toggleCartItemQuantity(product._id, "inc")}
          >
            <AiOutlinePlus />
          </span>
        </span>

        <div>
          <span className={styles.remove} onClick={() => onRemove(product)}>
            Remove
          </span>
        </div>
        <span className={styles.priceTotal}>{`Total: $${(
          product?.price * product?.quantity
        ).toFixed(2)}`}</span>
      </div>
    </div>
  );
}
