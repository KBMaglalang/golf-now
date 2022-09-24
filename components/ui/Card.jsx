import styles from "./Card.module.css";
import Link from "next/link";
import { urlForImage } from "../../lib/sanity";
import { Button } from "@mui/material";

import {
  Typography,
  // Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
} from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <div className={styles.card}>
      <Link href={`/products/${product?._type}/${product?.slug.current}`}>
        <Button variant="contained" color="primary">
          <div>
            <img
              src={urlForImage(product?.image && product?.image[0])}
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
        </Button>
      </Link>
    </div>
  );
}
