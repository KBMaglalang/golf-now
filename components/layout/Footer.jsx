import Link from "next/link";
import React, { Fragment } from "react";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import styles from "./Footer.module.css";

export default function FooterBar() {
  return (
    <Fragment>
      <div className={styles.footerCustomerContainer}>
        <h2>Customer Care</h2>
        <ul>
          <li>
            <Link href="/contact-us">Contact Us</Link>
          </li>
          <li>
            <Link href="/returns">Returns & Refunds</Link>
          </li>
          <li>
            <Link href="/shipping">Shipping Policies</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footerAboutUsContainer}>
        <h2>About Us</h2>
        <ul>
          <li>
            <Link href="/about">About Us</Link>
          </li>
          <li>
            <Link href="/careers">Careers</Link>
          </li>
          <li>
            <Link href="/policy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/accessibility">Accessibility</Link>
          </li>
          <li>
            <Link href="/terms-conditions">Terms & Conditions</Link>
          </li>
        </ul>
      </div>
      <div className={styles.footerConnectContainer}>
        <h2>Connect With Us</h2>
        <ul>
          <li>
            <a href="https://www.facebook.com/">
              <AiFillFacebook className={styles.logo} />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/">
              <AiFillTwitterCircle className={styles.logo} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <AiFillInstagram className={styles.logo} />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/">
              <AiFillYoutube className={styles.logo} />
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
