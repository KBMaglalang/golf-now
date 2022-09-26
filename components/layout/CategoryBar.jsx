import React from "react";

import { Toolbar, Button } from "@mui/material";

export default function CategoryBar() {
  return (
    <>
      <Toolbar>
        <Button color="secondary" variant="text" href="/products/clubs">
          Clubs
        </Button>
        <Button color="secondary" variant="text" href="/products/balls">
          Balls
        </Button>
        <Button color="secondary" variant="text" href="/products/shoes">
          Shoes
        </Button>
        <Button color="secondary" variant="text" href="/products/clothing">
          Clothing
        </Button>
        <Button color="secondary" variant="text" href="/products/bag-carts">
          {"Bags & Carts"}
        </Button>
        <Button color="secondary" variant="text" href="/products/golf-tech">
          Golf Tech
        </Button>
        <Button color="secondary" variant="text" href="/products/brand">
          Brand
        </Button>
      </Toolbar>
    </>
  );
}
