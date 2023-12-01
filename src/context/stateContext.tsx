"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// types
type StateContextType = {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  addToCart: (item: CartItemType) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const defaultContextValue: StateContextType = {
  cart: [],
  setCart: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
};

type StateProviderProps = {
  children: React.ReactNode;
};

// context
// create a new context
const StateContext = createContext<StateContextType>(defaultContextValue);

// Create a state provider component
export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
  // --- states ---
  const [cart, setCart] = useState<CartItemType[]>([]);

  // --- methods ---
  // read the local storage
  useEffect(() => {
    const cart = localStorage?.getItem("cart");

    if (cart) {
      setCart(JSON.parse(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  // update the local storage
  const updateLocalStorage = (updatedCart: CartItemType[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // add items to the cart
  const addToCart = (item: CartItemType) => {
    // check if the item is already in the cart
    const isItemInCart = cart.find((cartItem) => cartItem._id === item._id);

    let newCart = [];

    if (isItemInCart) {
      newCart = cart.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: item.quantity }
          : cartItem
      );
      setCart(newCart);
    } else {
      newCart = [...cart, { ...item, quantity: item.quantity }];
      setCart(newCart);
    }

    updateLocalStorage(newCart);
  };

  // remove item from the cart
  const removeFromCart = (id: string) => {
    const newCart = cart.filter((item) => item._id !== id);
    setCart(newCart);
    updateLocalStorage(newCart);
  };

  // clear the cart
  const clearCart = () => {
    setCart([]);
    updateLocalStorage([]);
  };

  // --- return the provider ---
  return (
    <StateContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </StateContext.Provider>
  );
};

/**
 * Retrieves the state context from the nearest `StateProvider`.
 *
 * @returns {StateContext} - The state context.
 * @throws {Error} - If `useStateContext` is used outside of a `StateProvider`.
 */
export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateProvider");
  }
  return context;
};
