// ProductContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import http from "../http/http";

const ProductContext = createContext();

export const useProduct = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState([]); // Initialize product state

  // Fetch product data and set it in the product state
  useEffect(() => {
    const fetchProductData = async () => {
      const response = await http.get("/product"); // Replace with your API call
      if (response.status === 200) {
        setProduct(response.data);
      }
    };

    fetchProductData();
  }, []);

  return (
    <ProductContext.Provider value={{ product }}>
      {children}
    </ProductContext.Provider>
  );
};
