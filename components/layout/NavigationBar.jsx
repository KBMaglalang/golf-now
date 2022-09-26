import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";

// Material UI components
import {
  Typography,
  Grid,
  Toolbar,
  AppBar,
  Container,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";

// Custom Components
import CategoryBar from "./CategoryBar";
import LoginProfileButton from "./LoginProfileButton";
import SearchBar from "./SearchBar";

export default function NavigationBar() {
  const { data: session } = useSession();

  return (
    <>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Link href="/">
            <Typography variant="h5" color="secondary">
              <GolfCourseIcon />
              Golf Now
            </Typography>
          </Link>

          <Container maxWidth="lg">
            <SearchBar />
          </Container>

          {session && <LoginProfileButton />}
          {!session && (
            <IconButton aria-label="login" onClick={signIn}>
              <LoginOutlinedIcon />
            </IconButton>
          )}

          <Link href="/cart">
            <IconButton aria-label="cart">
              <ShoppingCartIcon />
            </IconButton>
          </Link>
        </Toolbar>
        <Container>
          <CategoryBar />
        </Container>
      </AppBar>
    </>
  );
}
