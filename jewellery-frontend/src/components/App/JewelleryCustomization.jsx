import React, { useState } from "react";
import axios from "axios";

const JewelryCustomizationForm = () => {
  const [formData, setFormData] = useState({
    jewelry_type: "",
    material: "",
    size: "",
    engraving_text: "",
    price: "",
    contact_info: "", // new field
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("https://as-jewels-1.onrender.com/api/jewelry_customization/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Customization submitted successfully!");
      setFormData({
        jewelry_type: "",
        material: "",
        size: "",
        engraving_text: "",
        price: "",
        contact_info: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to submit customization. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-4">Customize Your Jewelry</h2>
      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-500 text-center mb-2">{success}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Jewelry Type</label>
          <select name="jewelry_type" value={formData.jewelry_type} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Select Jewelry Type</option>
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Bracelet">Bracelet</option>
            {/* Add more types as needed */}
          </select>
        </div>

        <div>
          <label className="block font-medium">Material</label>
          <select name="material" value={formData.material} onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Select Material</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Size (Optional)</label>
          <input type="text" name="size" value={formData.size} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Engraving (Optional)</label>
          <input type="text" name="engraving_text" value={formData.engraving_text} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block font-medium">Contact Info</label>
          <input
            type="text"
            name="contact_info"
            value={formData.contact_info}
            onChange={handleChange}
            placeholder="Phone or WhatsApp"
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          Submit Customization
        </button>
      </form>
    </div>
  );
};

export default JewelryCustomizationForm;
