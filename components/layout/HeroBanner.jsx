import React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

export default function HeroBanner() {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia
        component="video"
        height={"auto"}
        width={"100%"}
        image={"golf-putting.mp4"}
        autoPlay
        loop
      />
    </Card>
  );
}
