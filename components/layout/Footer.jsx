import React from "react";
import Link from "next/link";

// Material UI components
import {
  Typography,
  IconButton,
  Box,
  Container,
  Grid,
  Button,
  ButtonGroup,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function FooterBar() {
  return (
    <>
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid
          container
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
        >
          <Grid item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" color="primary">
                Customer Care
              </Typography>
              <ButtonGroup orientation="vertical">
                <Link href="/contact-us">
                  <Button variant="text" color="inherit">
                    <Typography variant="body1">Contact Us</Typography>
                  </Button>
                </Link>
                <Link href="/returns">
                  <Button variant="text" color="inherit">
                    <Typography variant="body1">Returns & Refunds</Typography>
                  </Button>
                </Link>
                <Link href="/shipping">
                  <Button variant="text" color="inherit">
                    <Typography variant="body1">Shipping Policies</Typography>
                  </Button>
                </Link>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" color="primary">
                About Us
              </Typography>

              <ButtonGroup orientation="vertical">
                <Link href="/about">
                  <Button variant="text" color="inherit">
                    <Typography variant="body1">About Us</Typography>
                  </Button>
                </Link>
                <Link href="/careers">
                  <Button variant="text" color="inherit">
                    <Typography variant="body1">Careers</Typography>
                  </Button>
                </Link>
                <Link href="/policy">
                  <Button variant="text" color="inherit">
                    <Typography variant="body1">Privacy Policy</Typography>
                  </Button>
                </Link>
                <Link href="/accessibility">
                  <Button variant="text" color="inherit">
                    <Typography variant="body1">Accessibility</Typography>
                  </Button>
                </Link>
                <Link href="/terms-conditions">
                  <Button variant="text" color="inherit">
                    <Typography variant="body1">Terms & Conditions</Typography>
                  </Button>
                </Link>
              </ButtonGroup>
            </Box>
          </Grid>
          <Grid item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" color="primary">
                Connect With Us
              </Typography>

              <Box>
                <a href="https://www.facebook.com/">
                  <IconButton aria-label="facebook">
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                </a>
                <a href="https://www.twitter.com/">
                  <IconButton aria-label="twitter">
                    <TwitterIcon fontSize="large" />
                  </IconButton>
                </a>
                <a href="https://www.instagram.com/">
                  <IconButton aria-label="instagram">
                    <InstagramIcon fontSize="large" />
                  </IconButton>
                </a>
                <a href="https://www.youtube.com/">
                  <IconButton aria-label="youtube">
                    <YouTubeIcon fontSize="large" />
                  </IconButton>
                </a>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
