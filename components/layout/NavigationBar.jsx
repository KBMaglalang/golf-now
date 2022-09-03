import React, { Fragment } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import styles from "./NavigationBar.module.css";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/StateContext";

export default function NavigationBar() {
  const router = useRouter();
  const { searchTerm, setSearchTerm } = useStateContext();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);

    console.log("value is:", event.target.value);
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
          ></input>
          <button
            type="button"
            className="btn"
            onClick={() => {
              router.push(`/search?${encodeURIComponent(searchTerm)}`);
            }}
          >
            Search
          </button>
        </div>
        <nav>
          <ul>
            <li>{/* <Link href="/signup">Sign Up</Link> */}</li>
            <li>{/* <Link href="/login">Log In</Link> */}</li>
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
