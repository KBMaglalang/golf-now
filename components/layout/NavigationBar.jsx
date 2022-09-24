import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineRight } from "react-icons/ai";
import styles from "./NavigationBar.module.css";

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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container maxWidth="xs">
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PersonOutlineOutlinedIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/account">Account</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/orders">Orders</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/favorites">Favorites</Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            signOut();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default function NavigationBar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();

    router.push(`/search?=${encodeURIComponent(event.target.search.value)}`);
  };

  return (
    <>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Link href="/">
            <Typography variant="h5" color="secondary">
              Golf Now
            </Typography>
          </Link>
          <Container maxWidth="lg">
            <TextField
              id="standard-basic"
              label="Search"
              variant="outlined"
              sx={{ width: "50%" }}
            />
          </Container>

          {session && <ProfileMenu />}
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
      </AppBar>
    </>
  );
}

/*

<header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">
            <Typography variant="h5" color="primary">
              Golf Now
            </Typography>
          </Link>
        </div>

        <form className="searchForm" onSubmit={handleSearch} role="search">
          <label htmlFor="search">Search for stuff</label>
          <input
            id="search"
            type="search"
            placeholder="Search..."
            autoFocus
            required
          />
          <button type="submit">
            <AiOutlineRight />
          </button>
        </form>

        <nav>
          <ul>
            {session && (
              <li>
                <div className={styles.dropdown}>
                  <button className={styles.dropbtn}>
                    {session.user?.name
                      ? session.user.name
                      : session.user.email}
                  </button>
                  <div className={styles.dropdownContent}>
                    <a href="/account">Account</a>
                    <a href="/orders">Orders</a>
                    <a href="/favorites">Favorites</a>
                    <a onClick={() => signOut()}>Sign Out</a>
                  </div>
                </div>
              </li>
            )}
            {!session && (
              <li onClick={() => signIn()}>
                <div className={styles.dropdown}>
                  <button className={styles.dropbtn}>Log In / Sign Up</button>
                </div>
              </li>
            )}

            <li>
              <Link href="/cart">
                <div>
                  <AiOutlineShoppingCart className={styles.cart} " />
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <nav className={styles.navigation}>
          <ul>
            <li>
              <a href="/products/clubs">Clubs</a>
            </li>
            <li>
              <a href="/products/balls">Balls</a>
            </li>
            <li>
              <a href="/products/shoes">Shoes</a>
            </li>
            <li>
              <a href="/products/clothing">Clothing</a>
            </li>
            <li>
              <a href="/products/bag-carts">Bags & Carts</a>
            </li>
            <li>
              <a href="/products/golf-tech">Golf Tech</a>
            </li>
            <li>
              <a href="/products/brand">Brand</a>
            </li>
          </ul>
        </nav>
      </div>
*/
