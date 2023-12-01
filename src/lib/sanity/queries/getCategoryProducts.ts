type Props = {
  category: string;
};

export const SANITY_GET_CATEGORY_PRODUCTS = ({ category }: Props) => {
  return `*[_type == "${category}" && visible == true]`;
};
