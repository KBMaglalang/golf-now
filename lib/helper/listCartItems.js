import CartItem from "../../components/ui/CartItem";

// list items in the cart
export const listCartItems = (items) => {
  if (!items?.length) return;

  return items.map((item) => <CartItem key={item._id} product={item} />);
};
