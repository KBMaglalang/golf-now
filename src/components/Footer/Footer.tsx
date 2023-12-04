import React from "react";
import Link from "next/link";

// components

// context or store

// constants and functions

export function Footer() {
  return (
    <footer className="footer p-5 bg-base-200 text-base-content ">
      {/* products */}
      <nav>
        <header className="footer-title">Products</header>
        <Link data-test="footer-new" href={"/new"} className="link link-hover">
          New
        </Link>
        <Link
          data-test="footer-deals"
          href={"/deals"}
          className="link link-hover"
        >
          Deals
        </Link>
        <Link
          data-test="footer-clubs"
          href={"/clubs"}
          className="link link-hover"
        >
          Clubs
        </Link>
        <Link
          data-test="footer-balls"
          href={"/balls/"}
          className="link link-hover"
        >
          Golf Balls
        </Link>
        <Link
          data-test="footer-shoes"
          href={"/shoes"}
          className="link link-hover"
        >
          Shoes
        </Link>
        <Link
          data-test="footer-clothing"
          href={"/clothing"}
          className="link link-hover"
        >
          Clothing
        </Link>
        <Link
          data-test="footer-bag-carts"
          href={"/bag-carts"}
          className="link link-hover"
        >
          Bags & Carts
        </Link>
        <Link
          data-test="footer-golf-tech"
          href={"/golf-tech"}
          className="link link-hover"
        >
          Golf Tech
        </Link>
      </nav>

      {/* company */}
      <nav>
        <header className="footer-title">Company</header>
        <Link
          data-test="footer-about-us"
          href={"/about-us"}
          className="link link-hover"
        >
          About us
        </Link>
        <Link
          data-test="footer-contact"
          href={"/contact"}
          className="link link-hover"
        >
          Contact
        </Link>
      </nav>

      {/* legal */}
      <nav>
        <header className="footer-title">Legal</header>
        <Link
          data-test="footer-terms-of-use"
          href={"/terms-of-use"}
          className="link link-hover"
        >
          Terms of use
        </Link>
        <Link
          data-test="footer-privacy-policy"
          href={"/privacy-policy"}
          className="link link-hover"
        >
          Privacy policy
        </Link>
        <Link
          data-test="footer-cookie-policy"
          href={"/cookie-policy"}
          className="link link-hover"
        >
          Cookie policy
        </Link>
      </nav>

      {/* newsletter sign up */}
      <form>
        <header className="footer-title">Newsletter</header>
        <fieldset className="form-control w-80">
          <label className="label">
            <span className="label-text">Enter your email address</span>
          </label>
          <div className="join">
            <input
              type="text"
              placeholder="username@site.com"
              className="input input-bordered join-item"
            />
            <button className="btn btn-primary join-item">Subscribe</button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
}
