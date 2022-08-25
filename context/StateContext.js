import {
  createContext,
  useState,
  useContext,
  useEffect,
  Children,
} from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [totalQuantities, setTotalQuantities] = useState(0);
  // const [qty, setQty] = useState(1);

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem("cart"))) {
  //     setCartItems(JSON.parse(localStorage.getItem("cart")).cartItems);
  //     setTotalPrice(JSON.parse(localStorage.getItem("cart")).totalPrice);
  //     setTotalQuantities(
  //       JSON.parse(localStorage.getItem("cart")).totalQuantities
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "cart",
  //     JSON.stringify({ cartItems, totalPrice, totalQuantities })
  //   );
  // }, [cartItems]);

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    // check that the order quantity does not exceed
    if (
      checkProductInCart &&
      checkProductInCart.quantity + quantity > checkProductInCart.stock
    ) {
      toast.error(`Total order cannot exceed available stock. Sorry 😞`);
      return;
    }

    // toast.success(`${qty} ${product.name} added to cart`);
    toast.success(`${quantity} ${product.name} added to cart`);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
        return { ...cartProduct };
      });
      setCartItems(updatedCartItems);
      return;
    }

    product.quantity = quantity;
    setCartItems((prev) => [...prev, { ...product }]);
  };

  const onRemove = (product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    // setTotalPrice(
    //   (prevTotalPrice) =>
    //     prevTotalPrice - foundProduct.price * foundProduct.quantity
    // );
    // setTotalQuantities(
    //   (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    // );
    setCartItems(newCartItems);
  };

  // const toggleCartItemQuantity = (id, value) => {
  //   const foundProduct = cartItems.find((item) => item._id === id);
  //   const index = cartItems.findIndex((product) => product._id === id);
  //   const newCartItems = cartItems.filter((item) => item._id !== id);

  //   if (value === "inc" && foundProduct.stock > foundProduct.quantity) {
  //     const updateCart = [...newCartItems];
  //     updateCart.splice(index, 0, {
  //       ...foundProduct,
  //       quantity: foundProduct.quantity + 1,
  //     });
  //     setCartItems(updateCart);
  //     // setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
  //     // setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
  //   } else if (value === "dec") {
  //     if (foundProduct.quantity > 1) {
  //       const updateCart = [...newCartItems];
  //       updateCart.splice(index, 0, {
  //         ...foundProduct,
  //         quantity: foundProduct.quantity - 1,
  //       });
  //       setCartItems(updateCart);
  //       // setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
  //       // setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
  //     }
  //   }
  // };

  // const incQty = (product) => {
  //   if (qty < product.stock) {
  //     setQty((prevQty) => prevQty + 1);
  //   }
  // };
  // const decQty = () => {
  //   setQty((prevQty) => {
  //     if (prevQty - 1 < 1) return 1;
  //     return prevQty - 1;
  //   });
  // };

  return (
    <Context.Provider
      value={{
        cartItems,
        setCartItems,
        // totalPrice,
        // setTotalPrice,
        // totalQuantities,
        // setTotalQuantities,
        // qty,
        // setQty,
        // decQty,
        // incQty,
        onAdd,
        onRemove,
        // toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
