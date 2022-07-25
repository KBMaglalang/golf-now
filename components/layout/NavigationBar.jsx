import React, { Fragment } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Golf Now</Link>
        </div>
        <div className="search-input">
          <input type="text" placeholder="Search..."></input>
          <button type="button" className="btn" onClick={() => {}}>
            Search
          </button>
        </div>
        <nav>
          <ul>
            <li>
              <Link href="/login">Log In</Link>
            </li>
            <li>
              <Link href="/cart">
                <div>
                  <AiOutlineShoppingCart className={styles.cart} />
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
              <Link href="/new">New</Link>
            </li>
            <li>
              <Link href="/clubs">Clubs</Link>
            </li>
            <li>
              <Link href="/balls">Balls</Link>
            </li>
            <li>
              <Link href="/shoes">Shoes</Link>
            </li>
            <li>
              <Link href="/clothing">Clothing</Link>
            </li>
            <li>
              <Link href="/bag-carts">Bags & Carts</Link>
            </li>
            <li>
              <Link href="/golf-tech">Golf Tech</Link>
            </li>
            <li>
              <Link href="/accessories">Accessories</Link>
            </li>
            <li>
              <Link href="/brands">Brands</Link>
            </li>
            <li>
              <Link href="/golf-deals">Golf Deals</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
}
