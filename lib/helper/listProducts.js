import ProductCard from "../../components/ui/Card";
import BrandCard from "../../components/ui/BrandCard";

export const listProducts = (items) => {
  return items.map((product) => (
    <ProductCard key={product.sku} product={product} />
  ));
};

// list top selling products
export const topSellingProducts = (allProducts) => {
  // sort products from lowest stock and filter products that in stock
  const results = [...allProducts]
    .sort((a, b) => a.stock - b.stock)
    .filter((e) => e.stock > 1);
  results.splice(3, results.length);

  return results
    ?.filter((product) => product.stock > 0)
    .map((product) => <ProductCard key={product._id} product={product} />);
};

// list products associated with type or brand
export const listBrandProducts = (items, func) => {
  const isProductsBrands = items?.filter((e) => e._type === "brand");

  if (isProductsBrands.length) {
    return items.map((product) => (
      <BrandCard key={product._id} brand={product} handler={func} />
    ));
  }

  return listProducts(items);
};
