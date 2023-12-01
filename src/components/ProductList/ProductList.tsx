import React from "react";

// components
import ProductListItem from "./ProductListItem";

// context or store

// constants and functions

type Props = {
  productData: ProductType[];
  title?: string;
};

export async function ProductList({ productData, title }: Props) {
  return (
    <section id="productList" className="text-gray-600 body-font">
      {/* title */}
      <div className="justify-center w-full flex flex-row mt-12">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>

      {/* product list */}
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap -m-4">
          {productData.map((item: ProductType) => (
            <ProductListItem key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
