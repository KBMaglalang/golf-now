import React, { Fragment } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./NavigationBar.module.css";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import { useSession, signIn, signOut } from "next-auth/react";
import { AiOutlineRight } from "react-icons/ai";

export default function NavigationBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useStateContext();

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
            {/* <li>
              <Link href="/products/new">New</Link>
            </li> */}
            <li>
              <Link href="/products/clubs">Clubs</Link>
            </li>
            <li>
              <Link href="/products/balls">Balls</Link>
            </li>
            <li>
              <Link href="/products/shoes">Shoes</Link>
            </li>
            <li>
              <Link href="/products/clothing">Clothing</Link>
            </li>
            <li>
              <Link href="/products/bag-carts">Bags & Carts</Link>
            </li>
            <li>
              <Link href="/products/golf-tech">Golf Tech</Link>
            </li>
            {/* <li>
              <Link href="/products/accessories">Accessories</Link>
            </li> */}
            <li>
              <Link href="/products/brand">Brand</Link>
            </li>
            {/* <li>
              <Link href="/products/golf-deals">Golf Deals</Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </Fragment>
  );
}
