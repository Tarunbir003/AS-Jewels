import React from "react";
import "./Homepage.css"; // Import the CSS file for styling

const Homepage = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Timeless Beauty, Eternal Shine</h1>
          <p>"Adorn yourself with the whispers of elegance, where every jewel tells a story of grace and luxury."</p>
          <div className="btn-container">
            <a href="#collection" className="btn">Discover Now</a>
          </div>
        </div>
      </header>

      {/* Collection Section */}
      <section id="collection" className="collection-section">
        <h2>Our Luxury Collection</h2>
        <img src="/images/bracelet_gold.jpg" alt="Jewelry Collection" />
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 AS Jewels. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
