import React from "react";
import Link from "next/link";

// Material UI components
import { Typography, IconButton, Box } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

export default function FooterBar() {
  return (
    <>
      <Box>
        <Typography variant="h5" color="primary">
          Customer Care
        </Typography>
        <Link href="/contact-us">
          <Typography variant="body1" color="secondary">
            Contact Us
          </Typography>
        </Link>
        <Link href="/returns">
          <Typography variant="body1" color="secondary">
            Returns & Refunds
          </Typography>
        </Link>
        <Link href="/shipping">
          <Typography variant="body1" color="secondary">
            Shipping Policies
          </Typography>
        </Link>
      </Box>
      <Box>
        <Typography variant="h5" color="primary">
          About Us
        </Typography>

        <Link href="/about">
          <Typography variant="body1" color="secondary">
            About Us
          </Typography>
        </Link>
        <Link href="/careers">
          <Typography variant="body1" color="secondary">
            Careers
          </Typography>
        </Link>
        <Link href="/policy">
          <Typography variant="body1" color="secondary">
            Privacy Policy
          </Typography>
        </Link>
        <Link href="/accessibility">
          <Typography variant="body1" color="secondary">
            Accessibility
          </Typography>
        </Link>
        <Link href="/terms-conditions">
          <Typography variant="body1" color="secondary">
            Terms & Conditions
          </Typography>
        </Link>
      </Box>
      <Box>
        <Typography variant="h5" color="primary">
          Connect With Us
        </Typography>

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
    </>
  );
}
