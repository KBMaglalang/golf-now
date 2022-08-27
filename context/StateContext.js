import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  // const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    let initialValue = undefined;

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      console.log(
        "🚀 ~ file: StateContext.js ~ line 10 ~ const[cartItems,setCartItems]=useState ~ saved",
        saved
      );
      initialValue = JSON.parse(saved).cartItems;
      console.log(
        "🚀 ~ file: StateContext.js ~ line 12 ~ const[cartItems,setCartItems]=useState ~ initialValue",
        initialValue
      );
    }

    return initialValue?.cartItems || [];
  });

  // useEffect(() => {
  //   // console.log("in useEffect");
  //   // console.log("local storage", localStorage);
  //   // console.log("getItem", localStorage.getItem("cart"));
  //   // console.log("parsed", JSON.parse(localStorage.getItem("cart")));
  //   // console.log(
  //   //   "length",
  //   //   JSON.parse(localStorage.getItem("cart"))?.cartItems.length
  //   // );

  //   // if (JSON.parse(localStorage.getItem("cart"))) {
  //   // console.log("in the if statement");
  //   setCartItems(JSON.parse(localStorage.getItem("cart")).cartItems);
  //   // setTotalPrice(JSON.parse(localStorage.getItem("cart")).totalPrice);
  //   // setTotalQuantities(
  //   //   JSON.parse(localStorage.getItem("cart")).totalQuantities
  //   // );
  //   // }
  // }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ cartItems }));
  }, [cartItems]);

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
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    const foundProduct = cartItems.find((item) => item._id === id);
    const index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc" && foundProduct.stock > foundProduct.quantity) {
      const updateCart = [...newCartItems];
      updateCart.splice(index, 0, {
        ...foundProduct,
        quantity: foundProduct.quantity + 1,
      });
      setCartItems(updateCart);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        const updateCart = [...newCartItems];
        updateCart.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });
        setCartItems(updateCart);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        setCartItems,
        onAdd,
        onRemove,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
