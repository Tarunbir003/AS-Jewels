import "./Homepage.css"; // Importing the CSS file for styling

const Homepage = () => {
  // Static product list using local images
  const products = [
    { id: 1, name: "Gold Bracelet", image: "/images/bracelet_gold.jpg", price: "$99.99" },
    { id: 2, name: "Silver Bracelet", image: "/images/bracelet_silver.jpg", price: "$89.99" },
    { id: 3, name: "Gold Necklace", image: "/images/necklace_gold.jpg", price: "$79.99" },
    { id: 4, name: "Silver Necklace", image: "/images/necklace_silver.jpg", price: "$69.99" },
    { id: 5, name: "Gold Earrings", image: "/images/earring_gold.jpg", price: "$59.99" },
    { id: 6, name: "Silver Earrings", image: "/images/earring_silver.jpg", price: "$49.99" },
    { id: 7, name: "Gold Ring", image: "/images/ring_gold.jpg", price: "$39.99" },
    { id: 8, name: "Silver Ring", image: "/images/ring_silver.jpg", price: "$29.99" },
  ];

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

        <div className="image-gallery">
          {products.map((product) => (
            <div key={product.id} className="image-card">
              <img 
                src={product.image} 
                alt={product.name} 
                className="product-image"
              />
              <h3 className="image-title">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          ))}
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
        <p>&copy; 2025 AS Jewels. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
