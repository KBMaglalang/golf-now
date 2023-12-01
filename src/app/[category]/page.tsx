import React from "react";
import type { Metadata } from "next";

// components
import { BreadCrumb } from "@/components/Common";
import { ProductList } from "@/components/ProductList";

// context or store

// constants and functions
import { formatPathname } from "@/lib/utils";
import { sanityFetch } from "@/lib/sanity";
import {
  SANITY_GET_CATEGORY_PRODUCTS,
  SANITY_GET_NEW_PRODUCTS,
  SANITY_GET_DEAL_PRODUCTS,
} from "@/lib/sanity/queries";
import { META_TITLE } from "@/constants";

type Props = {
  params: {
    category: string;
  };
};

type MetaProps = {
  params: { category: string };
};

export async function generateMetadata({
  params,
}: MetaProps): Promise<Metadata> {
  return {
    title: `${META_TITLE} | ${formatPathname(params.category)}`,
  };
}

export default async function page({ params }: Props) {
  let sanitySearchTerm = null;
  switch (params.category) {
    case "new":
      sanitySearchTerm = SANITY_GET_NEW_PRODUCTS;
      break;
    case "deals":
      sanitySearchTerm = SANITY_GET_DEAL_PRODUCTS;
      break;
    default:
      sanitySearchTerm = SANITY_GET_CATEGORY_PRODUCTS(params);
      break;
  }

  const categoryProducts = await sanityFetch<ProductType[]>({
    query: sanitySearchTerm,
    tags: [],
  });

  return (
    <main className="container mx-auto my-12 flex-1 p-5">
      {/* breadcrumb */}
      <BreadCrumb />

      {/* content */}
      <div className="space-y-4 my-12">
        <div>
          <h1 className="text-2xl font-bold">
            {formatPathname(params.category)}
          </h1>
        </div>

        <ProductList productData={categoryProducts} />
      </div>
    </main>
  );
}
