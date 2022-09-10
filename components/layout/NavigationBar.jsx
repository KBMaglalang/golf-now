import React, { Fragment } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./NavigationBar.module.css";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";
import { useSession, signIn, signOut } from "next-auth/react";

export default function NavigationBar() {
  const { data: session } = useSession();
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useStateContext();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      router.push(`/search?=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <Fragment>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">Golf Now</Link>
        </div>
        <div className="search-input">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="btn"
            onClick={() => {
              router.push(`/search?=${encodeURIComponent(searchTerm)}`);
            }}
          >
            Search
          </button>
        </div>
        <nav>
          <ul>
            {session && (
              // <li>
              //   <Link href="/account">{session.user.name}</Link>
              // </li>
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
            {!session && <li onClick={() => signIn()}>Log In / Sign Up</li>}

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
