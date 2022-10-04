// calculate cart total
export const getTotal = (items) => {
  if (!items?.length) return;

  const results = items
    .reduce((p, c) => p + c.price * c.quantity, 0)
    .toFixed(2);

  return results;
};
