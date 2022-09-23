import React, { Fragment } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { AiOutlineRight } from "react-icons/ai";
import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();

    router.push(`/search?=${encodeURIComponent(event.target.search.value)}`);
  };

  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Golf Now</Link>
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
                    {session.user.name}
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
                  <AiOutlineShoppingCart className={styles.cart} alt="cart" />
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
    </Fragment>
  );
}
