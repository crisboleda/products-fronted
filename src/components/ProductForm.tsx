import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';
import { useProductContext } from '../context/ProductContext';
import "../css/productCreate.css"

interface ProductFormProps {
  currentProduct?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ currentProduct }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const { addProduct } = useProductContext();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setDescription(currentProduct.description);
      setPrice(currentProduct.price);
    }
  }, [currentProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = { id: currentProduct?.id || Date.now(), name, description, price };
    const result = await addProduct(product) as unknown as string[];
    setErrors(result);
    setName('');
    setDescription('');
    setPrice(0);

    navigate('/');
  };

  return (
    <div>
      <header>
        <Link to="/">
          <button title="Listar productos" className="list-product-button">Lista de Productos</button>
        </Link>
      </header>
      <div className="container-creation">
        <h1>Formulario de Producto</h1>

        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{ color: 'red' }}>
              {error}
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" />
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input name="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Precio" />
          </div>

          <br />
          <button type="submit">Crear producto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
