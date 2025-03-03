import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import productServiceInstance from './services/productService';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/products/" element={<ProductList />} />
        <Route path="/products/create" element={<ProductForm />} />
      </Routes>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <ProductProvider productService={productServiceInstance}>
    <App />
  </ProductProvider>
);

export default AppWrapper;
