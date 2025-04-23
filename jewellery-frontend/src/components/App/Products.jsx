import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "./Header";
import Cart from "./Cart";
import Toast from "./Toast";
import Select from "react-select";
import "./Products.css";

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

  const fetchProducts = async () => {
    try {
      let url = "https://as-jewels-1.onrender.com/api/products/";
      const queryParams = new URLSearchParams();

      if (selectedCategory) queryParams.append("category", selectedCategory);
      if (selectedSubcategory) queryParams.append("subcategory", selectedSubcategory);
      if (selectedTags.length > 0) {
        queryParams.append("tags", selectedTags.join(","));
      }

      if (queryParams.toString()) {
        url = `https://as-jewels-1.onrender.com/api/products/filter/?${queryParams}`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchFilters = async () => {
    try {
      const [catRes, subcatRes, tagRes] = await Promise.all([
        axios.get("https://as-jewels-1.onrender.com/api/categories/"),
        axios.get("https://as-jewels-1.onrender.com/api/subcategories/"),
        axios.get("https://as-jewels-1.onrender.com/api/tags/"),
      ]);

      setCategories(catRes.data);
      setSubcategories(subcatRes.data);
      setTags(tagRes.data);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedSubcategory, selectedTags]);

  return (
    <>
      <Header />
      {cartOpen && (
        <Cart
          setCartOpen={setCartOpen}
          refreshCart={refreshCart}
          setRefreshCart={setRefreshCart}
        />
      )}
      <div className="filters">
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedSubcategory(e.target.value)}>
          <option value="">All Subcategories</option>
          {subcategories.map((sub) => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>

        <Select
          isMulti
          options={tags.map(tag => ({ value: tag.id, label: tag.name }))}
          className="tags-select"
          onChange={(selected) =>
            setSelectedTags(selected.map(tag => tag.value))
          }
          placeholder="Select Tags"
        />
      </div>

      <div className="products-container">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
            </div>
            <button className="add-to-cart">ADD TO CART</button>
            <Link to={`/product/${product.id}`}>
              <button className="view-details">VIEW DETAILS</button>
            </Link>
          </div>
        ))}
      </div>
      {showToast && <Toast message={toastMessage} />}
    </>
  );
}
