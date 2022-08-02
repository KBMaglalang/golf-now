export default function Cart() {
  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-container">
        <div className="product-details">
          <p>product title</p>
          <p>product image</p>
          <p>product details</p>
          <p>delete product</p>
          <p>increase quantity</p>
          <p>decrease quantity</p>
          <p>product total quantity</p>
          <p>product price</p>
          <p>product sub total</p>
        </div>
      </div>
      <div className="cart-total-container">
        <h1>Cart Total</h1>
        <p>subtotal</p>
        <p>delivery</p>
        <p>sales tax</p>
        <p>estimated total</p>
        <div className="btn-container">
          <button type="button" className="btn" onClick="">
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  );
}
