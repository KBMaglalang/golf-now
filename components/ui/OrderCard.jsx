import React from "react";
import styles from "./OrderCard.module.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";

export default function OrderCard({ product }) {
  return (
    <Grid item>
      <Card>
        <CardContent>
          <Container>
            <Typography>{product.createdAt.split("T")[0]}</Typography>
            <Typography>
              {product.createdAt.split("T")[1].slice(0, 5)}
            </Typography>
          </Container>
          <Typography>{product.productName}</Typography>
          <Container>
            <Typography>Quantity</Typography>
            <Typography>{product.quantity}</Typography>
          </Container>
          <Container>
            <Typography>Total</Typography>
            <Typography>{`$${(
              (product.productSubTotal * product.quantity) /
              100
            ).toFixed(2)}`}</Typography>
          </Container>
          <Container>
            <Typography className={styles.title}>Order Status</Typography>
            <Typography>{product.status}</Typography>
          </Container>
        </CardContent>
      </Card>
    </Grid>
  );
}
