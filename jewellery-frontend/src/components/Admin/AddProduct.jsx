import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, subRes, tagRes, prodRes] = await Promise.all([
          axios.get('https://as-jewels-1.onrender.com/api/categories/'),
          axios.get('https://as-jewels-1.onrender.com/api/subcategories/'),
          axios.get('https://as-jewels-1.onrender.com/api/tags/'),
          axios.get('https://as-jewels-1.onrender.com/api/products/'),
        ]);
        setCategories(catRes.data);
        setSubcategories(subRes.data);
        setTags(tagRes.data);
        setProducts(prodRes.data);
      } catch (err) {
        console.error("Error fetching initial data", err);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    if (image) formData.append('image', image);
    selectedCategories.forEach((id) => formData.append('category', id));
    selectedSubcategories.forEach((id) => formData.append('subcategory', id));
    selectedTags.forEach((id) => formData.append('tags', id));

    try {
      const res = await axios.post('https://as-jewels-1.onrender.com/api/products/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccessMessage(`Product added: ${res.data.name}`);
      setProducts([...products, res.data]);
      setName(''); setDescription(''); setPrice(''); setStock('');
      setImage(null); setSelectedCategories([]); setSelectedSubcategories([]); setSelectedTags([]);
    } catch (err) {
      setErrorMessage('Failed to add product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://as-jewels-1.onrender.com/api/products/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      alert('Failed to delete product.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* ... all input fields here like before ... */}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </form>

      {successMessage && <p className="text-green-600 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-2">Existing Products</h3>
      {products.length > 0 ? (
        <ul className="space-y-4">
          {products.map(product => (
            <li key={product.id} className="border p-4 rounded-md shadow-sm bg-white flex justify-between items-center">
              <div>
                <p><strong>{product.name}</strong></p>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : <p>No products found.</p>}
    </div>
  );
};

export default AddProduct;
