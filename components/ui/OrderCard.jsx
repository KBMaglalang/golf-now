import React from "react";
import styles from "./OrderCard.module.css";

export default function OrderCard({ product }) {
  return (
    <div className={styles.card}>
      <div className={styles.block}>
        <span className={styles.title}>{product.createdAt.split("T")[0]}</span>
        <span className={styles.date}>{product.createdAt.split("T")[1]}</span>
      </div>
      <span className={styles.productName}>{product.productName}</span>
      <div className={styles.block}>
        <span className={styles.title}>Quantity</span>
        <span>{product.quantity}</span>
      </div>
      <div className={styles.block}>
        <span className={styles.title}>Total</span>
        <span>
          {`$${((product.productSubTotal * product.quantity) / 100).toFixed(
            2
          )}`}
        </span>
      </div>
      <div className={styles.block}>
        <span className={styles.title}>Order Status</span>
        <span>{product.status}</span>
      </div>
    </div>
  );
}
