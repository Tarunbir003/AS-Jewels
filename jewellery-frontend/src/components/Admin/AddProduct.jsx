import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://as-jewels-1.onrender.com/api/products/');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('https://as-jewels-1.onrender.com/api/products/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage(`Product added successfully: ${response.data.name}`);
      setErrorMessage('');
      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setImage(null);
      fetchProducts(); // refresh list
    } catch (error) {
      setErrorMessage('Failed to add product.');
      setSuccessMessage('');
      console.error('Error adding product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://as-jewels-1.onrender.com/api/products/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-900">Add New Product</h2>
      <form onSubmit={handleSubmit} className="mb-6">
        <input type="text" placeholder="Name" className="block mb-2 w-full p-2 border" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="Description" className="block mb-2 w-full p-2 border" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" className="block mb-2 w-full p-2 border" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="number" placeholder="Stock" className="block mb-2 w-full p-2 border" value={stock} onChange={(e) => setStock(e.target.value)} required />
        <input type="file" accept="image/*" className="block mb-2 w-full p-2 border" onChange={(e) => setImage(e.target.files[0])} required />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Add Product</button>
      </form>

      {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}
      {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}

      <hr className="my-4" />

      <h3 className="text-xl font-semibold mb-2">Existing Products</h3>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <div key={product.id} className="flex justify-between items-center border p-3 rounded shadow-sm mb-2">
            <div>
              <p className="font-bold capitalize">{product.name}</p>
              <p className="text-sm">{product.description}</p>
            </div>
            <button
              onClick={() => handleDelete(product.id)}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AddProduct;
