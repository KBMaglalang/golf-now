import React from "react";

export default function OrderCard({ product }) {
  return (
    <div>
      <span>{product.createdAt}</span>
      <span>{product.productName}</span>
      <div>
        <span>Quantity</span>
        <span>{product.quantity}</span>
      </div>
      <div>
        <span>Total</span>
        <span>{product.productSubTotal * product.quantity}</span>
      </div>
      <div>
        <span>Order Status:</span>
        <span>{product.status}</span>
      </div>
    </div>
  );
}
