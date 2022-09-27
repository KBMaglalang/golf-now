import styles from "./Card.module.css";
import Link from "next/link";
import { urlForImage } from "../../lib/sanity";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Container, Grid } from "@mui/material";

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product?._type}/${product?.slug.current}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height={"auto"}
            width={"100%"}
            image={urlForImage(product?.image && product?.image[0])
              .width(345)
              .url()}
            alt={`${product?._type}-${product?.slug.current}`}
          />
          <CardContent>
            <Typography variant="h5" color="primary">
              {product?.name}
            </Typography>
            <Container maxWidth="xl">
              <Typography gutterBottom variant="subtitle2" component="div">
                {product?.brand?.title}
              </Typography>
              {product?.stock > 0 && (
                <Typography variant="h6">${product?.price}</Typography>
              )}
              {!product?.stock && (
                <Container>
                  <Typography
                    variant="body1"
                    color="primary"
                    className={!product?.stock && styles.strike}
                  >
                    {`$${product?.price}`}
                  </Typography>
                  <Typography variant="body2" color="secondary">
                    SOLD OUT
                  </Typography>
                </Container>
              )}
            </Container>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
