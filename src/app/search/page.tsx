import React from "react";

// components
import { BreadCrumb } from "@/components/Common";
import { ProductList } from "@/components/ProductList";

// context or store

// constants and functions
import { sanityFetch } from "@/lib/sanity";
import { SANITY_SEARCH_QUERY } from "@/lib/sanity/queries";

type Props = {
  searchParams: any;
};

export default async function Page({ searchParams }: Props) {
  const { q } = searchParams ?? { q: "" };
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
          <h1 className="text-2xl font-bold">Search</h1>
        </div>

        <ProductList productData={searchProducts} />
      </div>
    </main>
  );
}
