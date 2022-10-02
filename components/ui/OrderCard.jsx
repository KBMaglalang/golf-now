import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid, Box } from "@mui/material";

export default function OrderCard({ product }) {
  return (
    <Grid item>
      <Card sx={{ width: 345 }}>
        <CardContent>
          <Typography variant="h5" color="primary" noWrap gutterBottom>
            {product.productName}
          </Typography>
          <Box>
            <Typography sx={{ display: "inline", mr: 1 }}>
              Order Date:
            </Typography>
            <Typography sx={{ display: "inline", mr: 1 }}>
              {product.createdAt.split("T")[0]}
            </Typography>
            <Typography sx={{ display: "inline" }}>
              {product.createdAt.split("T")[1].slice(0, 5)}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ display: "inline", mr: 1 }}>Quantity:</Typography>
            <Typography sx={{ display: "inline" }}>
              {product.quantity}
            </Typography>
          </Box>
          <Box>
            <Typography sx={{ display: "inline", mr: 1 }}>Total:</Typography>
            <Typography sx={{ display: "inline" }}>{`$${(
              (product.productSubTotal * product.quantity) /
              100
            ).toFixed(2)}`}</Typography>
          </Box>
          <Box>
            <Typography sx={{ display: "inline", mr: 1 }}>
              Order Status:
            </Typography>
            <Typography sx={{ display: "inline" }}>{product.status}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
