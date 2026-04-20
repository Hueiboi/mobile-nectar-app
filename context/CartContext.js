import React, { createContext, useState, useEffect } from 'react';
import { storageService, KEYS } from '../services/storageService';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await storageService.get(KEYS.CART);
      if (savedCart) setCartItems(savedCart);
    };
    loadCart();
  }, []);

  const saveCartToStorage = async (items) => {
    setCartItems(items);
    await storageService.save(KEYS.CART, items);
  };

  const addToCart = (product, customQty = 1) => {
    const existingIndex = cartItems.findIndex(item => item.id === product.id);
    let newCart = [...cartItems];

    if (existingIndex >= 0) {
        newCart[existingIndex].quantity += customQty;
    } else {
        newCart.push({ ...product, quantity: customQty });
    }
    saveCartToStorage(newCart);
  };

  const updateQuantity = (id, delta) => {
    const newCart = cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    saveCartToStorage(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter(item => item.id !== id);
    saveCartToStorage(newCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, addToCart, updateQuantity, removeFromCart, getTotalPrice, setCartItems 
    }}>
      {children}
    </CartContext.Provider>
  );
};