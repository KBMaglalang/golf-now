import React from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

export default function NavigationBar() {
  return (
    <header>
      <div className="header-container">
        <Link href="/">Golf Now</Link>
        <Link href="/cart">
          <AiOutlineShoppingCart />
        </Link>
        <Link href="/login">Log In</Link>
      </div>
      <div className="navigation">
        <nav>
          <Link href="/New">New</Link>
          <Link href="/Clubs">Clubs</Link>
          <Link href="/Balls">Balls</Link>
          <Link href="/Shoes">Shoes</Link>
          <Link href="/Clothing">Clothing</Link>
          <Link href="/bag-carts">Bags & Carts</Link>
          <Link href="/golf-tech">Golf Tech</Link>
          <Link href="/accessories">Accessories</Link>
          <Link href="/brands">Brands</Link>
          <Link href="/golf-deals">Golf Deals</Link>
        </nav>
      </div>
    </header>
  );
}
