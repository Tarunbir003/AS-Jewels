import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Homepage.css"; // Importing the CSS file for styling

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("accessToken");

  // Function to shuffle the products array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fetch products dynamically from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure correct image URLs
      const baseURL = "http://127.0.0.1:8000";
      let productsWithImages = response.data.map((product) => ({
        ...product,
        image: product.image.startsWith("http") ? product.image : `${baseURL}${product.image}`,
      }));

      // Shuffle and limit to 8 products
      productsWithImages = shuffleArray(productsWithImages).slice(0, 8);

      setProducts(productsWithImages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-heading">Timeless Beauty, Eternal Shine</h1>
          <p className="italic">
            &quot;Adorn yourself with the whispers of elegance, where every jewel tells a story of grace and luxury.&quot;
          </p>
          <div className="btn-container">
            <a href="#collection" className="btn">Discover Now</a>
          </div>
        </div>
      </header>

      {/* Collection Section */}
      <section id="collection" className="collection-section">
        <h2 className="collection-heading">Our Luxury Collection</h2>
        <p className="collection-description">
          Explore our carefully curated selection of exquisite jewelry, crafted with elegance and precision.
        </p>

        {/* Product Gallery - Now Showing 8 Random Products */}
        <div className="image-gallery">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="image-card">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image cursor-pointer"
                  />
                </Link>
                <h3 className="image-title">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">Loading products...</p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About AS Jewels</h2>
        <p>We are dedicated to crafting exquisite jewelry that captures timeless beauty and sophistication. Each piece is meticulously designed to reflect luxury and elegance.</p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions? Contact us at <a href="mailto:contact@asjewels.com">contact@asjewels.com</a></p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} AS Jewels. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
