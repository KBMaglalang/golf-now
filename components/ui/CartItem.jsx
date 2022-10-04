import { urlForImage } from "../../lib/sanity/sanity";
import { useStateContext } from "../../context/StateContext";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Container, Grid, Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function CartItem({ product }) {
  const { onRemove, toggleCartItemQuantity } = useStateContext();

  return (
    <Grid item>
      <Card>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <CardMedia
              component="img"
              height={"auto"}
              width={"100px"}
              image={urlForImage(product?.image && product?.image[0])
                .width(100)
                .url()}
              alt={`${product?._type}-${product?.slug.current}`}
              sx={{ padding: "1rem", objectFit: "contain" }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, ml: 2 }}>
            <Typography variant="subtitle2" color="primary">
              {product?.brand?.title}
            </Typography>
            <Typography variant="h5">{product?.name}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Container>
              <Typography variant="h6" color="primary" gutterBottom>
                {`$${product?.price}`}
              </Typography>
            </Container>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <IconButton
                color="primary"
                sx={{ display: "inline" }}
                onClick={() => toggleCartItemQuantity(product._id, "dec")}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6" sx={{ display: "inline" }}>
                {product?.quantity}
              </Typography>
              <IconButton
                color="primary"
                sx={{ display: "inline" }}
                onClick={() => toggleCartItemQuantity(product._id, "inc")}
              >
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              color="error"
              onClick={() => onRemove(product)}
            >
              Remove
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
