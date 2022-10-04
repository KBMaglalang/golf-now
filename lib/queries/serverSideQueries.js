export const REVALIDATE_GET_STATIC_PROPS = 10;

export const BRAND_SEARCH_QUERY = `*[_type == "brand"]`;

export const ALL_PRODUCTS_QUERY =
  '*[_type in ["balls", "clubs", "shoes", "clothing", "bag-carts", "golf-tech"]]{..., brand->{_id,title}}';

export const PRODUCT_DETAILS_QUERY = (params) => {
  return `*[_type == "${params.category}" && slug.current == '${params.slug}']{..., brand->{_id,title}}[0]`;
};

export const CATEGORY_PRODUCT_QUERY = (category) => {
  return `*[_type == "${category}"]{..., brand->{_id,title}}`;
};

export const SEARCH_QUERY = (searchTerm) => {
  return `*[[_type, name] match "${searchTerm}"]`;
};
