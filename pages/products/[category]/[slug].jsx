import Head from "next/head";
import { useState, useEffect } from "react";
import { sanityClient } from "../../../lib/sanity/sanity.server";
import { urlForImage } from "../../../lib/sanity/sanity";
import { useStateContext } from "../../../context/StateContext";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toPlainText } from "@portabletext/react";
import toast from "react-hot-toast";

// constants
import {
  ALL_PRODUCTS_QUERY,
  PRODUCT_DETAILS_QUERY,
  REVALIDATE_GET_STATIC_PROPS,
} from "../../../lib/queries/serverSideQueries";
import {
  prismaGetUserInfo,
  isUserFavoriteProduct,
  prismaFavoriteAdd,
  prismaFavoriteDelete,
} from "../../../lib/queries/api";

// material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Container,
  Grid,
  Button,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function ProductDetails({ product }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { onAdd } = useStateContext();
  const [favState, setFavState] = useState(false);
  const [favoriteId, setFavoriteId] = useState("");
  const [index, setIndex] = useState(0);
  const [productQuantity, setProductQuantity] = useState(1);

  useEffect(() => {
    setProductQuantity(1);
  }, []);

  useEffect(() => {
    if (session) {
      getUserFavorite(product);
    }
  }, [session]);

  const updateQuantity = (state) => {
    if (state === "inc" && productQuantity + 1 <= product.stock) {
      setProductQuantity((prev) => prev + 1);
    }

    if (state === "dec" && productQuantity - 1 > 0) {
      setProductQuantity((prev) => prev - 1);
    }
  };

  const handleBuyNow = () => {
    onAdd(product, productQuantity);
    router.push("/cart");
  };

  const getUserFavorite = async (productDetails) => {
    // get information about the logged in user
    const prismaUserResponse = await prismaGetUserInfo(session);
    if (prismaUserResponse.statusCode === 500) return;
    const prismaUserData = await prismaUserResponse.json();

    // get information if the product is in the user favorite
    const response = await isUserFavoriteProduct(
      prismaUserData,
      productDetails
    );
    if (response.statusCode === 500) return;
    const productFavorite = await response.json();

    if (productFavorite.length) {
      setFavState(true);
      setFavoriteId(productFavorite[0].id);
      return;
    }

    setFavState(false);
    setFavoriteId("");
  };

  const handleProductFavorite = async (product) => {
    if (session) {
      // get information about the logged in user
      const prismaUserResponse = await prismaGetUserInfo(session);
      if (prismaUserResponse.statusCode === 500) return;
      const prismaUserData = await prismaUserResponse.json();

      // check if the product should be removed from favorites
      if (favState) {
        // remove product
        const response = await prismaFavoriteDelete({ id: favoriteId });
        if (response.statusCode === 500) return;
        await response.json();

        toast.success("Product Removed From Favorites");
      } else {
        // add product to favorites
        const prismaFavoriteResponse = await prismaFavoriteAdd(
          product,
          prismaUserData
        );
        if (prismaFavoriteResponse.statusCode === 500) return;
        await prismaFavoriteResponse.json();

        toast.success("Added To Favorites");
      }

      getUserFavorite(product);
      return;
    }

    toast.error("Login or Sign Up to Add to Favorites");
  };

  return (
    <>
      <Head>
        <title>{`Golf Now | ${product?.brand?.title} - ${product?.name}`}</title>
        <meta name="description" content="Golf Products" />
        <link rel="icon" href="/golf-ball-icon.png" />
      </Head>

      <main>
        <Container maxWidth="lg" sx={{ my: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    height={"auto"}
                    width={"100%"}
                    image={
                      product.image[index] &&
                      urlForImage(product.image[index]).width(500).url()
                    }
                    alt={`${product?._type}-${product?.slug.current}`}
                  />
                  <Grid container spacing={4}>
                    {product.image?.map((item, i) => (
                      <Grid item key={i}>
                        <CardMedia
                          component="img"
                          height={"auto"}
                          width={"auto"}
                          image={item && urlForImage(item).width(100).url()}
                          onMouseEnter={() => setIndex(i)}
                          sx={{ width: 100 }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                  >{`SKU: ${product?.sku}`}</Typography>
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                  >{`${product?.brand?.title}`}</Typography>
                  <Typography variant="h5" color="primary" noWrap gutterBottom>
                    {product?.name}
                  </Typography>
                  <Button
                    variant="contained"
                    color={favState ? "error" : "primary"}
                    onClick={() => handleProductFavorite(product)}
                    fullWidth
                    sx={{ my: 4 }}
                  >
                    {favState ? "Remove From Favorites" : "Add to Favorites"}
                  </Button>
                  <Typography>{`Available Stock: ${product?.stock}`}</Typography>
                  <Typography variant="h6">{`$${product?.price}`}</Typography>
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
                      onClick={() => updateQuantity("dec")}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ display: "inline" }}>
                      {productQuantity}
                    </Typography>
                    <IconButton
                      color="primary"
                      sx={{ display: "inline" }}
                      onClick={() => updateQuantity("inc")}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      my: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      disabled={!product?.stock ? true : false}
                      onClick={handleBuyNow}
                    >
                      Buy it Now
                    </Button>
                    <Button
                      variant="contained"
                      disabled={!product?.stock ? true : false}
                      onClick={() => onAdd(product, productQuantity)}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Product Description
                  </Typography>
                  <Typography>{toPlainText(product?.description)}</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Product Features
                  </Typography>
                  <Typography>{toPlainText(product?.features)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}

export const getStaticPaths = async () => {
  const products = await sanityClient.fetch(ALL_PRODUCTS_QUERY);

  return {
    paths: products.map((product) => ({
      params: {
        category: product._type,
        slug: product.slug.current,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const product = await sanityClient.fetch(PRODUCT_DETAILS_QUERY(params));

  return {
    props: { product },
    revalidate: REVALIDATE_GET_STATIC_PROPS,
  };
};
