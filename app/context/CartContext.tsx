import React, { createContext, useContext, useState } from 'react';

// Define the shape of your cart item
export interface CartItem {
  'Brand Name': string;
  quantity: number;
  // Add other properties as needed
}

// Define the context type
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (brandName: string) => void;
  removeAllFromCart: (brandName: string) => void;
  cartItemCount: number;
  uniqueItemCount: number;
}

// Create the context
const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeAllFromCart: () => {},
  cartItemCount: 0,
  uniqueItemCount: 0,
});

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Add item to cart or increment quantity if already exists
  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem['Brand Name'] === item['Brand Name']);
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Remove one item from cart or remove completely if quantity is 1
  const removeFromCart = (brandName: string) => {
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem['Brand Name'] === brandName);
      if (existingItemIndex !== -1) {
        if (updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex].quantity -= 1;
        } else {
          updatedCart.splice(existingItemIndex, 1);
        }
      }
      return updatedCart;
    });
  };

  // Remove all items of a specific brand from cart
  const removeAllFromCart = (brandName: string) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem['Brand Name'] !== brandName));
  };

  // Calculate total item count and unique item count
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const uniqueItemCount = cart.length;

  // Provide the cart context value to children
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeAllFromCart, cartItemCount, uniqueItemCount }}>
      {children}
    </CartContext.Provider>
  );
};
