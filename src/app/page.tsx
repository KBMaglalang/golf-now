// components
import { Hero } from "@/components/Hero";
import { CategoryList } from "@/components/CategoryList";
import { ProductList } from "@/components/ProductList";
import { Contact } from "@/components/Contact";
import { CTA } from "@/components/CTA";
import { Testimonials } from "@/components/Testimonial";
import { AdSegment1 } from "@/components/AdSegment";

// context or store

// constants and functions
import { sanityFetch } from "@/lib/sanity";
import { SANITY_GET_ALL_PRODUCTS } from "@/lib/sanity/queries";

export default async function Home() {
  const products = await sanityFetch<ProductType[]>({
    query: SANITY_GET_ALL_PRODUCTS,
    tags: [],
  });

  return (
    <main>
      <Hero />
      <AdSegment1 />
      <ProductList productData={products} title={"Top Selling Products"} />
      <CTA />
      <CategoryList />
      <Testimonials />
      <Contact />
    </main>
  );
}
