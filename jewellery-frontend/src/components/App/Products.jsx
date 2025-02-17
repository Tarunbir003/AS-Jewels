import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import Header from './Header';
import Cart from './Cart'; 
import Toast from './Toast'; 
import Select from 'react-select';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 
  const [cartOpen, setCartOpen] = useState(false);
  const [refreshCart, setRefreshCart] = useState(false); 
  const token = localStorage.getItem('accessToken'); 

  const fetchProducts = async () => {
    try {
      let url = 'http://127.0.0.1:8000/api/products/';
      const queryParams = new URLSearchParams();

      if (selectedCategory) queryParams.append('category', selectedCategory);
      if (selectedSubcategory) queryParams.append('subcategory', selectedSubcategory);
      selectedTags.forEach((tag) => queryParams.append('tags', tag));

      if (queryParams.toString()) {
        url = `http://127.0.0.1:8000/products/filter/?${queryParams.toString()}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const baseURL = 'http://127.0.0.1:8000';
      const productsWithFullImages = response.data.map((product) => ({
        ...product,
        image: product.image.startsWith('http') ? product.image : `${baseURL}${product.image}`,
      }));

      setProducts(productsWithFullImages);
    } catch (error) {
      console.error('Error fetching the products:', error);
    }
  };

  const fetchFilters = async () => {
    try {
      const categoryResponse = await axios.get('http://127.0.0.1:8000/api/categories/');
      const subcategoryResponse = await axios.get('http://127.0.0.1:8000/api/subcategories/');
      const tagsResponse = await axios.get('http://127.0.0.1:8000/api/tags/');

      setCategories(categoryResponse.data);
      setSubcategories(subcategoryResponse.data);
      setTags(tagsResponse.data);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSubcategory, selectedTags]);

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/cart/',
        { product_id: productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        setCartOpen(true); 
        setRefreshCart(true);
        setToastMessage('Product added to cart!');
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          setRefreshCart(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <div className='container'>
      <div className="filter-section my-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Subcategories</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-4">
          <Select
            isMulti
            options={tags.map((tag) => ({
              value: tag.id,
              label: tag.name,
            }))}
            value={tags.filter((tag) => selectedTags.includes(tag.id)).map((tag) => ({
              value: tag.id,
              label: tag.name,
            }))}
            onChange={(selectedOptions) => {
              setSelectedTags(selectedOptions ? selectedOptions.map(option => option.value) : []);
            }}
            className="w-full max-w-xl"
            placeholder="Select Tags"
            closeMenuOnSelect={false}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center space-x-4 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg group"
          >
            <svg
              className="absolute bottom-0 left-0 mb-8 scale-150 group-hover:scale-[1.65] transition-transform"
              viewBox="0 0 375 283"
              fill="none"
              style={{ opacity: 0.1 }}
            >
              <rect
                x="159.52"
                y="175"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 159.52 175)"
                fill="white"
              />
              <rect
                y="107.48"
                width="152"
                height="152"
                rx="8"
                transform="rotate(-45 0 107.48)"
                fill="white"
              />
            </svg>
            <div className="relative pt-10 px-10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <div
                className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                style={{
                  background: 'radial-gradient(black, transparent 60%)',
                  transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
                  opacity: 0.2,
                }}
              ></div>
              <img className="relative w-40 h-40" src={product.image} alt={product.name} />
            </div>
            <div className="relative text-white px-6 pb-6 mt-6">
              <span className="block opacity-75 -mb-1">{product.description}</span>
              <div className="flex justify-between">
                <span className="block font-semibold text-xl">{product.name}</span>
                <span className="bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
                  ${product.price}
                </span>
              </div>
              <button
                onClick={() => addToCart(product.id)}
                className="mt-4 bg-purple-600 hover:bg-pink-500 text-white text-sm font-medium px-6 py-2 rounded-lg"
              >
                Add to Cart
              </button>
              <Link
  to={`/product/${product.id}`}
  className="mt-4 block text-sm text-white bg-pink-500 hover:bg-pink-600 font-medium px-4 py-2 rounded-lg text-center"
>
  View Details
</Link>

            </div>
          </div>
        ))}
      </div>
      <Toast show={showToast} message={toastMessage} />
      <Cart open={cartOpen} setOpen={setCartOpen} refreshCart={refreshCart} />
    </div>
  );
}
