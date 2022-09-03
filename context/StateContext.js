import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("cart"))) {
      setCartItems(JSON.parse(localStorage.getItem("cart")).cartItems);
    }
  }, []);

  const updateLocalStorage = (items) => {
    localStorage.setItem("cart", JSON.stringify({ cartItems: items }));
  };

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

    toast.success(`${quantity} ${product.name} added to cart`);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity };
        }
        return { ...cartProduct };
      });
      setCartItems(updatedCartItems);
      updateLocalStorage(updatedCartItems);
      return;
    }

    product.quantity = quantity;
    setCartItems((prev) => {
      updateLocalStorage([...prev, { ...product }]);
      return [...prev, { ...product }];
    });
  };

  const onRemove = (product) => {
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);
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
      updateLocalStorage(updateCart);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        const updateCart = [...newCartItems];
        updateCart.splice(index, 0, {
          ...foundProduct,
          quantity: foundProduct.quantity - 1,
        });
        setCartItems(updateCart);
        updateLocalStorage(updateCart);
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
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
