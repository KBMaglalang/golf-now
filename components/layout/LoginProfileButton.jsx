import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

// material ui
import { IconButton, Menu, MenuItem } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function LoginProfileButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup={true}
        aria-expanded={open ? true : undefined}
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
    </>
  );
}
