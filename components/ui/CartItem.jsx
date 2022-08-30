// import styles from "./Card.module.css";
import Link from "next/link";
import { urlFor } from "../../lib/sanityClient";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useStateContext } from "../../context/StateContext";
import { PortableText } from "@portabletext/react";

export default function CartItem({ product }) {
  const { onAdd, onRemove, toggleCartItemQuantity } = useStateContext();

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
      <PortableText value={product?.description} />
      <span>{`Price: $${product?.price}`}</span>
      <span>{`Total: ${product?.price * product?.quantity}`}</span>

      <h3>{product?.name}</h3>
      <div>
        <div>
          <p className="quantity-desc">
            <span
              className="minus"
              onClick={() => toggleCartItemQuantity(product._id, "dec")}
            >
              <AiOutlineMinus />
            </span>
            <span className="num">{product?.quantity}</span>
            <span
              className="plus"
              onClick={() => toggleCartItemQuantity(product._id, "inc")}
            >
              <AiOutlinePlus />
            </span>
          </p>
        </div>
        <div>
          <span onClick={() => onRemove(product)}>Remove</span>
        </div>
      </div>
    </div>
  );
}
