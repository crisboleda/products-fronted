import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import "../css/productEdit.css";

const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const { products, updateProduct } = useProductContext();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const newProduct = {
        id: Number(id),
        name: name,
        description: description,
        price: price,
      }
      await updateProduct(newProduct);
      navigate('/');
    }
  };

  return (
    <div className="container-creation">
        <h1>Edición de Producto</h1>

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
            <button type="submit">Editar producto</button>
        </form>
    </div>
  );
};

export default EditProduct;
