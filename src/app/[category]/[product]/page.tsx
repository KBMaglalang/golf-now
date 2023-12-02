import React from "react";
import { toPlainText } from "@portabletext/react";
import type { Metadata } from "next";

// components
import {
  BreadCrumb,
  ProductDetailsImages,
  ProductDetailsCartQuantity,
} from "@/components/Common";

// context or store

// constants and functions
import { formatPathname } from "@/lib/utils";
import { sanityFetch } from "@/lib/sanity";
import { urlForImage } from "@/lib/sanity";
import { SANITY_GET_PRODUCT_DETAILS } from "@/lib/sanity/queries";
import { META_TITLE } from "@/constants";

type Props = {
  params: {
    category: string;
    product: string;
  };
};

type MetaProps = {
  params: { category: string; product: string };
};

/**

Generates metadata for a specific category.
@param {MetaProps} params - Parameters for generating metadata.
@returns {Promise<Metadata>} - A promise that resolves to the Metadata object. */
export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  return {
    title: `${META_TITLE} | ${formatPathname(params.category)}`,
  };
}

export default async function page({ params: { category, product } }: Props) {
  /**

  Fetches the details of a specific product from the Sanity API.
  @param {string} category - The category of the product.
  @param {string} product - The name or identifier of the product.
  @returns {Promise<ProductType>} - A promise that resolves to the ProductType object. */
  const productDetail = await sanityFetch<ProductType>({
    query: SANITY_GET_PRODUCT_DETAILS({ category, product }),
    tags: [],
  });

  /**

  Retrieves the URLs of images associated with a product.
  @param {Array<Image>} images - An array of Image objects.
  @returns {Array<string>} - An array of image URLs. */
  const imageUrls = productDetail.image.map((image) =>
    urlForImage(image).url()
  );

  return (
    <main className="container mx-auto my-12 flex-1 p-5">
      {/* breadcrumb */}
      <BreadCrumb />

      {/* content */}
      <div className="flex flex-col md:flex-row my-12 w-full">
        {/* images */}
        <div className="md:w-8/12 w-auto">
          <ProductDetailsImages imageUrls={imageUrls} />
        </div>

        {/* product details */}
        <div className="md:w-4/12 w-auto flex flex-col space-y-2">
          {/* details */}
          <span className="text-sm font-bold">{productDetail.brand.title}</span>

          <h1 className="text-2xl font-bold">{productDetail.name}</h1>

          <span>{`Stock: ${productDetail.stock}`}</span>
          <span className="text-2xl font-bold mt-12">{`$${productDetail.price.toFixed(
            2
          )}`}</span>

          {/* cart functions */}
          <ProductDetailsCartQuantity productDetail={productDetail} />

          {/* features and description */}
          <div>
            <h2 className="text-2xl font-bold">Features</h2>
            <p>{toPlainText(productDetail.features)}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold">Description</h2>
            <p>{toPlainText(productDetail.description)}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
