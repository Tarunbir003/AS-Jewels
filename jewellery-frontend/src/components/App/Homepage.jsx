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
        <p className="collection-description">
          Explore our carefully curated selection of exquisite jewelry, crafted with elegance and precision.
        </p>
        <div className="image-gallery">
          <div className="image-row">
            <div className="image-card">
              <img src="/images/bracelet_gold.jpg" alt="Gold Bracelet" />
              <p className="image-title">Gold Bracelet</p>
            </div>
            <div className="image-card">
              <img src="/images/necklace_gold.jpg" alt="Gold Necklace" />
              <p className="image-title">Gold Necklace</p>
            </div>
          </div>
          <div className="image-row">
            <div className="image-card">
              <img src="/images/ring_gold.jpg" alt="Gold Ring" />
              <p className="image-title">Gold Ring</p>
            </div>
            <div className="image-card">
              <img src="/images/earring_gold.jpg" alt="Gold Earrings" />
              <p className="image-title">Gold Earrings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <h2>Elegance That Speaks</h2>
        <p>"Jewelry is the poetry of the heart, sculpted in gold and gems."</p>
        <div className="feature-images">
          <img src="/images/earring_gold.jpg" alt="Gold Earrings" />
          <img src="/images/watch_luxury.jpg" alt="Luxury Watch" />
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About AS Jewels</h2>
        <p>We are dedicated to crafting exquisite jewelry that captures timeless beauty and sophistication. Each piece is meticulously designed to reflect luxury and elegance.</p>
      </section>

      {/* Blog Section */}
      <section className="blog-section">
        <h2>Latest From Our Blog</h2>
        <div className="blog-posts">
          <div className="blog-post">
            <h3>The Art of Handcrafted Jewelry</h3>
            <p>Discover the intricate process of creating jewelry that stands the test of time.</p>
            <a href="#" className="btn">Read More</a>
          </div>
          <div className="blog-post">
            <h3>Choosing the Perfect Engagement Ring</h3>
            <p>A guide to selecting a ring that symbolizes your everlasting love.</p>
            <a href="#" className="btn">Read More</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Have questions? We'd love to hear from you! Contact us at <a href="mailto:contact@asjewels.com">contact@asjewels.com</a></p>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-card">
          <p>"Absolutely stunning craftsmanship! The ring I purchased is beyond perfect."</p>
          <span>- Emily R.</span>
        </div>
        <div className="testimonial-card">
          <p>"A touch of luxury that makes every moment special. Love my diamond necklace!"</p>
          <span>- James L.</span>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest collections and exclusive deals.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="btn">Subscribe</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 AS Jewels. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
