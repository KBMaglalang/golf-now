import React, { Fragment } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <Fragment>
      <header className={styles.header}>
        <div className="header-container">
          <Link href="/" className={styles.logo}>
            Golf Now
          </Link>
          <ul>
            <li>
              <Link href="/login" className="header-link">
                Log In
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <AiOutlineShoppingCart />
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="navigation">
        <nav>
          <Link href="/new">New</Link>
          <Link href="/clubs">Clubs</Link>
          <Link href="/balls">Balls</Link>
          <Link href="/shoes">Shoes</Link>
          <Link href="/clothing">Clothing</Link>
          <Link href="/bag-carts">Bags & Carts</Link>
          <Link href="/golf-tech">Golf Tech</Link>
          <Link href="/accessories">Accessories</Link>
          <Link href="/brands">Brands</Link>
          <Link href="/golf-deals">Golf Deals</Link>
        </nav>
      </div>
    </Fragment>
  );
}
