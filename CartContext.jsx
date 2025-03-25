import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Thêm sản phẩm vào giỏ
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Xóa sản phẩm khỏi giỏ
  const deleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <cartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(cartContext);
};
