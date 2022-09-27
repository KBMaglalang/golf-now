import { urlForImage } from "../../lib/sanity";
import { useStateContext } from "../../context/StateContext";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

export default function CartItem({ product }) {
  const { onRemove, toggleCartItemQuantity } = useStateContext();

  return (
    <Grid item>
      <Card sx={{ width: 600 }}>
        <CardMedia
          component="img"
          height={"100px"}
          width={"100px"}
          image={urlForImage(product?.image && product?.image[0])
            .width(345)
            .url()}
          alt={`${product?._type}-${product?.slug.current}`}
          sx={{ padding: "1rem", objectFit: "contain" }}
        />
        <CardContent>
          <Typography variant="subtitle2" color="primary">
            {product?.brand?.title}
          </Typography>
          <Typography variant="h5">{product?.name}</Typography>
          <Container>
            <Typography variant="h6" color="primary">
              {`Price: $${product?.price}`}
            </Typography>
            <Container>
              <Typography
                variant="h6"
                color="primary"
                onClick={() => toggleCartItemQuantity(product._id, "dec")}
              >
                <AiOutlineMinus />
              </Typography>
              <Typography variant="h6">{product?.quantity}</Typography>
              <Typography
                variant="h6"
                color="primary"
                onClick={() => toggleCartItemQuantity(product._id, "inc")}
              >
                <AiOutlinePlus />
              </Typography>
            </Container>
            <Typography
              variant="h5"
              color="secondary"
              onClick={() => onRemove(product)}
            >
              Remove
            </Typography>
            <Typography variant="body1">{`Total: $${(
              product?.price * product?.quantity
            ).toFixed(2)}`}</Typography>
          </Container>
        </CardContent>
      </Card>
    </Grid>
  );
}
