import React from "react";
import type { Metadata } from "next";

// components
import { BreadCrumb } from "@/components/Common";
import { ProductList } from "@/components/ProductList";

// context or store

// constants and functions
import { sanityFetch } from "@/lib/sanity";
import { SANITY_SEARCH_QUERY } from "@/lib/sanity/queries";
import { META_TITLE, META_DESCRIPTION } from "@/constants";

export const metadata: Metadata = {
  title: `${META_TITLE} | Search`,
  description: META_DESCRIPTION,
  icons: {
    icon: "./favicon.png",
  },
};

type Props = {
  searchParams: any;
};

export default async function Page({ searchParams }: Props) {
  // get search params from URI
  const { q } = searchParams ?? { q: "" };

  /**

  Fetches products from the Sanity API based on a search query.
  @param {string} q - The search query to filter the products by.
  @returns {Promise<Array<ProductType>>} - A promise that resolves to an array of ProductType objects. */
  const searchProducts = await sanityFetch<ProductType[]>({
    query: SANITY_SEARCH_QUERY(q),
    tags: [],
  });

  return (
    <main className="container mx-auto my-12 flex-1 p-5">
      {/* breadcrumb */}
      <BreadCrumb />

      {/* content */}
      <div className="space-y-4 my-12">
        <div>
          <h1 data-test="category-header" className="text-2xl font-bold">
            Search
          </h1>
        </div>

        <ProductList productData={searchProducts} />
      </div>
    </main>
  );
}
