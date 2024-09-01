import React, { createContext, useState } from 'react';


export const CartContext = createContext();
export const CartProvider = ({ children }) =>
 {
      const loggedInUser=localStorage.getItem('loggedIn') || '';
      let str=loggedInUser+"cart";
      let cart = JSON.parse(localStorage.getItem(str) || '[]'); 
      const [cartCount, setCartCount] = useState(cart.length);
      const updateCartCount = (newCount) =>
       {
          setCartCount(newCount);
       };
      return (
        <CartContext.Provider value={{ cartCount, updateCartCount }}>
          {children}
        </CartContext.Provider>
      );
};
