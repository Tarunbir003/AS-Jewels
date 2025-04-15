import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Cart from "./Cart";
import Toast from "./Toast";
import Select from "react-select";
import "./Products.css"; // Import updated styles

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [refreshCart, setRefreshCart] = useState(false);
  const token = localStorage.getItem("accessToken");

  // Fetch products
  const fetchProducts = async () => {
    try {
      let url = "https://as-jewels-1.onrender.com/api/products/";
      const queryParams = new URLSearchParams();

      if (selectedCategory) queryParams.append("category", selectedCategory);
      if (selectedSubcategory) queryParams.append("subcategory", selectedSubcategory);
      selectedTags.forEach((tag) => queryParams.append("tags", tag));

      if (queryParams.toString()) {
        url = `https://as-jewels-1.onrender.com/products/filter/?${queryParams.toString()}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const baseURL = "https://as-jewels-1.onrender.com";
      const productsWithFullImages = response.data.map((product) => ({
        ...product,
        image: product.image.startsWith("http") ? product.image : `${baseURL}${product.image}`,
      }));

      setProducts(productsWithFullImages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch Filters
  const fetchFilters = async () => {
    try {
      const categoryResponse = await axios.get("https://as-jewels-1.onrender.com/api/categories/");
      const subcategoryResponse = await axios.get("https://as-jewels-1.onrender.com/api/subcategories/");
      const tagsResponse = await axios.get("https://as-jewels-1.onrender.com/api/tags/");

      setCategories(categoryResponse.data);
      setSubcategories(subcategoryResponse.data);
      setTags(tagsResponse.data);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSubcategory, selectedTags]);

  // Add to Cart Function
  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        "https://as-jewels-1.onrender.com/api/cart/",
        { product_id: productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setCartOpen(true);
        setRefreshCart(true);
        setToastMessage("Product added to cart!");
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          setRefreshCart(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div className="container">
      {/* Filter Section */}
      <div className="filter-bar">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <select value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
          <option value="">All Subcategories</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </select>

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
            setSelectedTags(selectedOptions ? selectedOptions.map((option) => option.value) : []);
          }}
          className="w-full max-w-md"
          placeholder="Select Tags"
          closeMenuOnSelect={false}
        />
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img className="product-image" src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">{product.price}</p>
              <div className="button-group">
                <button className="button add-to-cart-btn" onClick={() => addToCart(product.id)}>Add to Cart</button>
                <Link to={`/product/${product.id}`} className="button view-details-btn">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Toast show={showToast} message={toastMessage} />
      <Cart open={cartOpen} setOpen={setCartOpen} refreshCart={refreshCart} />
    </div>
  );
}
