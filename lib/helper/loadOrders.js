import OrderCard from "../../components/ui/OrderCard";

// load previous orders associated with the account
export const loadOrders = (orders) => {
  return orders.map((product) => (
    <OrderCard key={product.id} product={product} />
  ));
};
