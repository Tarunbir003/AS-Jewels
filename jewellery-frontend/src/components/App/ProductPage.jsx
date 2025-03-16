import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Toast from "./Toast";
import "./ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedMetal, setSelectedMetal] = useState("gold");
  const [selectedSize, setSelectedSize] = useState("");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
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

    fetchProductDetails();
  }, [id]);

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

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-container">
      <div className="product-page">
        {/* Left: Product Image */}
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        {/* Right: Product Details */}
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>

          {/* Metal Selection */}
          <div className="metal-options">
            <button
              className={`metal-btn ${selectedMetal === "silver" ? "active" : ""}`}
              onClick={() => setSelectedMetal("silver")}
            >
              Silver
            </button>
            <button
              className={`metal-btn ${selectedMetal === "gold" ? "active" : ""}`}
              onClick={() => setSelectedMetal("gold")}
            >
              Gold
            </button>
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
            <p>✔ Standard shipping in 5-7 business days</p>
            <p>✔ Express shipping in 2-4 business days</p>
          </div>

          {/* Additional Benefits */}
          <ul className="benefits">
            <li>Free 30-day returns</li>
            <li>Free shipping on orders $99+</li>
            <li>Gift packaging available</li>
            <li>Complimentary 1-year warranty</li>
          </ul>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <h2>AS Jewelers</h2>
          <p>Elegance in Every Detail.</p>
          <div className="social-icons">
            <i className="fab fa-instagram"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-tiktok"></i>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {showToast && <Toast message={toastMessage} onClose={() => setShowToast(false)} />}
    </div>
  );
}
