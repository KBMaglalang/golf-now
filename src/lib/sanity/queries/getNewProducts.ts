export const SANITY_GET_NEW_PRODUCTS =
  '*[_type in ["balls", "clubs", "shoes", "clothing", "bag-carts", "golf-tech"] && visible == true] | order(_createdAt desc) {..., brand->{_id,title}}[0...12]';
