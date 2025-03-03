import React, { useEffect } from 'react';
import ProductItem from './ProductItem';
import { useProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';
import "../css/productList.css"

const ProductList: React.FC = () => {
  const { products, fetchProducts } = useProductContext();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="container">
      <h1>PRODUCTOS</h1>
      <div className="container-products">
        {products.map((product) => (
            <ProductItem product={product} />
        ))}

        {products.length === 0 && "No hay productos creados hasta el momento"}
      </div>

      <Link to="/products/create">
        <button title="Crear producto" className="add-product-button">+</button>
      </Link>
    </div>
  );
};

export default ProductList;
