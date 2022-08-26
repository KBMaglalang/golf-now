// import styles from "./Card.module.css";
import Link from "next/link";
import { urlFor } from "../../lib/sanityClient";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function CartItem({ product }) {
  console.log("🚀 ~ file: CartItem.jsx ~ line 8 ~ CartItem ~ product", product);

  return (
    <div>
      <div>
        {/* <img
          src={urlFor(product?.image && product?.image[0])}
          width={"100%"}
          height={"auto"}
          object-fit={"contain"}
          alt={`${product?._type}-${product?.slug.current}`}
        /> */}
      </div>
      <div>{product?.brand?.title}</div>

      <h3>{product?.name}</h3>
      <div>
        <div>
          <p className="quantity-desc">
            <span className="minus">
              <AiOutlineMinus />
            </span>
            <span className="num">{product?.quantity}</span>
            <span className="plus">
              <AiOutlinePlus />
            </span>
          </p>
        </div>
        <div>
          <span>Remove</span>
        </div>
      </div>
    </div>
  );
}
