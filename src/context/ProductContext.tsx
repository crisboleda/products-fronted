import React, { createContext, useState } from 'react';
import { Product, ProductContextType } from '../types/Product';
import { ProductProviderProps } from '../types/Product';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children, productService }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const data = await productService.fetchProducts();
    setProducts(data);
  };

  const addProduct = async (product: Product): Promise<string[]> => {
    const response = await productService.addProduct(product);
    if (response.success) {
      setProducts((prevProducts) => [...prevProducts, product]);
      return [];
    }
    return response.errors ?? [];
  };

  const updateProduct = async (updatedProduct: Product) => {
    if (await productService.updateProduct(updatedProduct.id, updatedProduct)) {
      setProducts((prevProducts) =>
        prevProducts.map((product) => (
          product.id === updatedProduct.id ? updatedProduct : product
        ))
      );
    }
  };

  const deleteProduct = async (id: number) => {
    if (await productService.deleteProduct(id)) {
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = (): ProductContextType => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
