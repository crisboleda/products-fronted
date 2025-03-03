import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import productServiceInstance from './services/productService';
import EditProduct from './components/ProductUpdate';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/create" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
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
