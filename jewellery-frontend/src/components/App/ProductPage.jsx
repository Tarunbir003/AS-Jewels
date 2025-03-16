import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Cart from "./Cart";
import Toast from "./Toast";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("silver");
  const [selectedSize, setSelectedSize] = useState("");

  const token = localStorage.getItem("accessToken");

  // Fetch product details by ID
  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const baseURL = "http://127.0.0.1:8000";
      const productWithFullImage = {
        ...response.data,
        image: response.data.image.startsWith("http")
          ? response.data.image
          : `${baseURL}${response.data.image}`,
      };

      setProduct(productWithFullImage);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Handle Add to Cart
  const addToCart = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/cart/",
        { product_id: product.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setToastMessage("Product added to cart!");
        setShowToast(true);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="product-page">
        {/* Left: Product Image */}
        <div className="product-image">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>

        {/* Right: Product Details */}
        <div className="product-details">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="price">${product.price}</p>

          {/* Metal Selection */}
          <div className="metal-options">
            <div
              className={`metal-option silver ${
                selectedMetal === "silver" ? "active" : ""
              }`}
              onClick={() => setSelectedMetal("silver")}
            ></div>
            <div
              className={`metal-option gold ${
                selectedMetal === "gold" ? "active" : ""
              }`}
              onClick={() => setSelectedMetal("gold")}
            ></div>
          </div>

          {/* Size Selection */}
          <select
            className="select-size"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Select Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>

          {/* Add to Cart Button */}
          <button className="add-to-cart-btn" onClick={addToCart}>
            ADD TO BAG
          </button>

          {/* Shipping Information */}
          <div className="shipping-info">
            <p className="highlight">✔ Standard shipping in 5-7 business days</p>
            <p className="highlight">✔ Express shipping in 2-4 business days</p>
          </div>

          {/* Additional Benefits */}
          <div className="benefits">
            <ul>
              <li>Free 30-day returns</li>
              <li>Free shipping on orders $99+</li>
              <li>Gift packaging available</li>
              <li>Complimentary 1-year warranty</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
}
