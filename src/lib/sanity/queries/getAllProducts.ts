export const SANITY_GET_ALL_PRODUCTS =
  '*[_type in ["balls", "clubs", "shoes", "clothing", "bag-carts", "golf-tech"] && visible == true]{..., brand->{_id,title}}[0...8]';
