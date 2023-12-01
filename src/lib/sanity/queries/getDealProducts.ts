export const SANITY_GET_DEAL_PRODUCTS =
  '*[_type in ["balls", "clubs", "shoes", "clothing", "bag-carts", "golf-tech"] && visible == true && stock < 20] | order(_createdAt desc) {..., brand->{_id,title}}[0...12]';
