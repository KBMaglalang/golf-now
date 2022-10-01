import React from "react";
import { useSession, signIn } from "next-auth/react";
import { useStateContext } from "../../context/StateContext";

// Material UI components
import Link from "@mui/material/Link";
import {
  Typography,
  Toolbar,
  AppBar,
  Container,
  IconButton,
  Box,
  Badge,
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
  const { cartItems } = useStateContext();

  return (
    <>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Box>
              <Link href="/">
                <Typography variant="h5" color="secondary.contrastText" noWrap>
                  <GolfCourseIcon />
                  Golf Now
                </Typography>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              <SearchBar />
            </Box>

            <Box>
              {session && <LoginProfileButton />}
              {!session && (
                <IconButton aria-label="login" onClick={signIn}>
                  <LoginOutlinedIcon />
                </IconButton>
              )}

              <Link href="/cart">
                <IconButton aria-label="cart">
                  {cartItems.length >= 1 ? (
                    <Badge color="error" variant="dot">
                      <ShoppingCartIcon />
                    </Badge>
                  ) : (
                    <ShoppingCartIcon />
                  )}
                </IconButton>
              </Link>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
      <AppBar position="relative" color="categoryBar">
        <CategoryBar />
      </AppBar>
    </>
  );
}
