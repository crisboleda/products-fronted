import React from 'react';
import { Product } from '../types/Product';
import { useProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { deleteProduct } = useProductContext();

  const handleDelete = () => {
    deleteProduct(product.id);
  };

  return (
    <div className="card">
      <div className="card-content">
          <h2 className="card-title">{product.name}</h2>
          <p className="card-description">{product.description}</p>
          <p className="card-price">Precio: <strong>${product.price}</strong></p>
          <div className="card-buttons">
              <Link to={`products/edit/${product.id}`} className="card-button edit-button">Editar</Link>
              <button className="card-button delete-button" onClick={handleDelete}>Eliminar</button>
          </div>
      </div>
    </div>
  );
};

export default ProductItem;
