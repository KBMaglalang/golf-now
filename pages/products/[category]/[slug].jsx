import Head from "next/head";
import { useState, useEffect } from "react";
import { sanityClient } from "../../../lib/sanity.server";
import { urlForImage } from "../../../lib/sanity";
// import { PortableText } from "@portabletext/react";
import { useStateContext } from "../../../context/StateContext";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toPlainText } from "@portabletext/react";

// material ui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CardActionArea,
  Container,
  Grid,
  Button,
  CardMedia,
} from "@mui/material";

export default function ClubsDetails({ product }) {
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
      getUserFavorite();
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

  const getUserFavorite = async () => {
    // get information about the logged in user
    const prismaUserResponse = await fetch(
      `/api/prisma/user?key=${session.user.email}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (prismaUserResponse.statusCode === 500) return;
    const prismaUserData = await prismaUserResponse.json();

    const response = await fetch(
      `/api/prisma/favorite?userId=${prismaUserData.id}&productSanityId=${product._id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
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

  const handleProductFavorite = async () => {
    if (session) {
      // get information about the logged in user
      const prismaUserResponse = await fetch(
        `/api/prisma/user?key=${session.user.email}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      if (prismaUserResponse.statusCode === 500) return;
      const prismaUserData = await prismaUserResponse.json();

      // check if the product should be removed from favorites
      if (favState) {
        // remove product
        const response = await fetch(`/api/prisma/favorite`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favoriteId }),
        });
        if (response.statusCode === 500) return;
        const prismaProductDelete = await response.json();
        // setFavState(false);
        toast.success("Product Removed From Favorites");
      } else {
        // add product to favorites
        const prismaFavoriteResponse = await fetch(`/api/prisma/favorite`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ product, prismaUserData }),
        });
        if (prismaFavoriteResponse.statusCode === 500) return;
        const prismaFavoriteData = await prismaFavoriteResponse.json();
        // setFavState(true);
        toast.success("Added To Favorites");
      }

      getUserFavorite();
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
        <Container maxWidth="lg">
          <Container>
            <Card>
              <Container>
                <CardMedia
                  component="img"
                  height={"auto"}
                  width={"100%"}
                  image={
                    product.image[index] &&
                    urlForImage(product.image[index]).width(345).url()
                  }
                  alt={`${product?._type}-${product?.slug.current}`}
                />
              </Container>
              <div>
                {product.image?.map((item, i) => (
                  <CardMedia
                    key={i}
                    component="img"
                    height={"auto"}
                    width={"100%"}
                    image={item && urlForImage(item).width(345).url()}
                    onMouseEnter={() => setIndex(i)}
                  />
                ))}
              </div>
            </Card>
            <Card>
              <CardContent>
                <Typography>{`SKU: ${product?.sku}`}</Typography>
                <Typography>{`${product?.brand?.title}`}</Typography>
                <Typography>{product?.name}</Typography>
                <Button onClick={handleProductFavorite}>
                  {favState ? "Remove From Favorites" : "Add to Favorites"}
                </Button>
                <Typography>{`Available Stock: ${product?.stock}`}</Typography>
                <Typography>{`$${product?.price}`}</Typography>
                <Container>
                  <Typography onClick={() => updateQuantity("dec")}>
                    <AiOutlineMinus />
                  </Typography>
                  <Typography>{productQuantity}</Typography>
                  <Typography onClick={() => updateQuantity("inc")}>
                    <AiOutlinePlus />
                  </Typography>
                </Container>
                <Container>
                  <Button
                    disabled={!product?.stock ? true : false}
                    onClick={handleBuyNow}
                  >
                    Buy it Now
                  </Button>
                  <Button
                    disabled={!product?.stock ? true : false}
                    onClick={() => onAdd(product, productQuantity)}
                  >
                    Add to Cart
                  </Button>
                </Container>
              </CardContent>
            </Card>
          </Container>
          <Container>
            <Grid container spacing={4}>
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography>Product Description</Typography>
                    <Typography>{toPlainText(product?.description)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography>Product Features</Typography>
                    <Typography>{toPlainText(product?.features)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </main>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const product = await sanityClient.fetch(
    `*[_type == "${context.query.category}" && slug.current == '${context.query.slug}']{..., brand->{_id,title}}[0]`
  );
  return {
    props: { product },
  };
};
