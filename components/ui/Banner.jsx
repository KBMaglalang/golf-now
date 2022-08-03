import styles from "./Banner.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="banner-container">
      <Image src="/" alt="pic" width={1080} height={500} />
      <div className="banner-info">
        <h1 className="banner-title">Title</h1>
        <p>Description</p>
        <p>Price</p>
        <p>Discount Price</p>
        <p>Discount Percentage</p>
        <p>Sale Period</p>
        <p>Out of Stock Indicator</p>
        <div>
          <Link href="/">Buy Now</Link>
        </div>
      </div>
    </div>
  );
}
