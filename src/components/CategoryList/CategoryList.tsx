import React from "react";

// components
import CategoryListItem from "./CategoryListItem";

// context or store

// constants and functions
import { sanityFetch } from "@/lib/sanity";
import { SANITY_GET_CATEGORIES } from "@/lib/sanity/queries";

export async function CategoryList() {
  /**

  Fetches the categories from the Sanity API by sending a POST request with the specified query
  and an empty array of tags. The response is then awaited and stored in the 'categories' variable.
  @returns {Promise<CategoryType[]>} A promise that resolves to an array of category objects. */
  const categories = await sanityFetch<CategoryType[]>({
    query: SANITY_GET_CATEGORIES,
    tags: [],
  });

  return (
    <section id="categoryList" className="text-gray-600 body-font">
      {/* title */}
      <div className="justify-center w-full flex flex-row mt-12">
        <h1 className="text-4xl font-bold">Categories</h1>
      </div>

      {/* category list */}
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-wrap -m-4">
          {categories.map((item: CategoryType) => (
            <CategoryListItem key={item._id} category={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
