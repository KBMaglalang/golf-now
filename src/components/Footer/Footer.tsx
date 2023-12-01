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
        <Link href={"/clubs"} className="link link-hover">
          Clubs
        </Link>
        <Link href={"/balls/"} className="link link-hover">
          Golf Balls
        </Link>
        <Link href={"/shoes"} className="link link-hover">
          Shoes
        </Link>
        <Link href={"/clothing"} className="link link-hover">
          Clothing
        </Link>
        <Link href={"/bag-carts"} className="link link-hover">
          Bags & Carts
        </Link>
        <Link href={"/golf-tech"} className="link link-hover">
          Golf Tech
        </Link>
      </nav>

      {/* company */}
      <nav>
        <header className="footer-title">Company</header>
        <Link href={"/about-us"} className="link link-hover">
          About us
        </Link>
        <Link href={"/contact"} className="link link-hover">
          Contact
        </Link>
      </nav>

      {/* legal */}
      <nav>
        <header className="footer-title">Legal</header>
        <Link href={"/terms-of-use"} className="link link-hover">
          Terms of use
        </Link>
        <Link href={"/privacy-policy"} className="link link-hover">
          Privacy policy
        </Link>
        <Link href={"/cookie-policy"} className="link link-hover">
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
