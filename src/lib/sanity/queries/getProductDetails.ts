type Props = {
  category: string;
  product: string;
};

export const SANITY_GET_PRODUCT_DETAILS = ({ category, product }: Props) => {
  return `*[_type == "${category}" && slug.current == '${product}' && visible == true]{..., brand->{_id,title}}[0]`;
};
