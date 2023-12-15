"use client";

import React, { useState } from "react";

import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/outline";

// components

// context or store
import { useStateContext } from "@/context/stateContext";

// constants and functions

type Props = {
  productDetail: ProductType;
};

export function ProductDetailsCartQuantity({ productDetail }: Props) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useStateContext();
  const isOutOfStock = productDetail?.stock === 0;

  const incrementQuantity = () => {
    if (productDetail.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    // check if e is within range
    if (value > 0 && value <= productDetail.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      ...productDetail,
      quantity,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      ...productDetail,
      quantity: 1,
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row justify-between space-x-2">
        {/* quantity */}
        <div className="flex flex-row w-2/3 space-x-2">
          {/* dec */}
          <button
            data-test="product-quantity-decrement"
            className="btn btn-square btn-secondary"
            disabled={isOutOfStock}
            onClick={decrementQuantity}
          >
            <MinusCircleIcon className="w-8 h-8" />
          </button>
          {/* value */}
          <input
            data-test="product-quantity-input"
            type="text"
            className="input input-bordered w-full text-center"
            value={quantity}
            disabled={isOutOfStock}
            onChange={handleInputChange}
          />
          {/* inc */}
          <button
            data-test="product-quantity-increment"
            className="btn btn-square btn-secondary"
            disabled={isOutOfStock}
            onClick={incrementQuantity}
          >
            <PlusCircleIcon className="w-8 h-8" />
          </button>
        </div>

        {/* add to cart */}
        <button
          data-test="product-add-to-cart"
          className="btn btn-secondary uppercase w-1/3"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>

      {/* buy now */}
      <button
        data-test="product-buy-now"
        className="btn btn-primary uppercase w-full"
        disabled={isOutOfStock}
        onClick={handleBuyNow}
      >
        Buy Now
      </button>
    </div>
  );
}
