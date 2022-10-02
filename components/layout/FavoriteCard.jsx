import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Button, Box } from "@mui/material";

export default function FavoriteCard({ favorites }) {
  const router = useRouter();
  const handleFavoriteDelete = async () => {
    const response = await fetch(`/api/prisma/favorite`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favoriteId: favorites.id,
      }),
    });
    if (response.statusCode === 500) return;
    const prismaFavoritesResponse = await response.json();
    if (prismaFavoritesResponse) {
      toast.success("Product Removed From Favorites");
    } else {
      toast.error("Unable to Remove Product");
    }
    router.reload(window.location.pathname);
  };

  return (
    <Grid item>
      <Card sx={{ width: 345 }}>
        <Link
          href={`/products/${favorites.productType}/${favorites.productSKU}`}
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h5" color="primary" noWrap gutterBottom>
                {favorites.productName}
              </Typography>
              <Typography variant="h6">
                {`SKU: ${favorites.productSKU}`}
              </Typography>
              <Typography variant="subtitle2">{`Added: ${favorites.createdAt}`}</Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <Box>
          <Button
            variant="contained"
            color="error"
            onClick={handleFavoriteDelete}
            fullWidth
          >
            Remove
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
