import Link from "next/link";
import React, { Fragment } from "react";
import {
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

export default function FooterBar() {
  return (
    <Fragment>
      <div className="footer-customer-care-container">
        <h3>Customer Care</h3>
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
      <div className="footer-about-us-container">
        <h3>About Us</h3>
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
      <div className="footer-conenct-container">
        <h3>Connect With Us</h3>
        <ul>
          <li>
            <a href="https://www.facebook.com/">
              <AiFillFacebook />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/">
              <AiFillTwitterCircle />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <AiFillInstagram />
            </a>
          </li>
          <li>
            <a href="https://www.youtube.com/">
              <AiFillYoutube />
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );
}
