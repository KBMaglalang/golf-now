import { urlForImage } from "../../lib/sanity";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid } from "@mui/material";

export default function BrandCard({ brand: { logo, title, _id }, handler }) {
  return (
    <Grid item>
      <Card
        sx={{ width: 250 }}
        onClick={() => {
          handler(_id);
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height={"250px"}
            width={"250px"}
            image={urlForImage(logo).width(250).url()}
            alt={`${title}`}
            sx={{ padding: "1rem", objectFit: "contain" }}
          />
          <CardContent>
            <Typography variant="h5" color="primary">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
