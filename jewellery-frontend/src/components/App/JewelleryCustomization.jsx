import React, { useState } from 'react';
import axios from 'axios';

const JewelryCustomizationForm = () => {
  const [formData, setFormData] = useState({
    jewelry_type: '',
    material: '',
    size: '',
    engraving_text: '',
    price: '',
    creator_name: ''
  });
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('accessToken');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post(
        'https://as-jewels-1.onrender.com/api/jewelry_customization/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Customization submitted:', response.data);
      setSuccess('Customization request submitted successfully!');
      setFormData({
        jewelry_type: '',
        material: '',
        size: '',
        engraving_text: '',
        price: '',
        creator_name: ''
      });
    } catch (err) {
      console.error('Error submitting customization:', err);
      setError('Failed to submit customization. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-purple-900 mb-6">Customize Your Jewelry</h2>

      {success && <p className="text-green-600 text-center mb-4">{success}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Jewelry Type</label>
          <select
            name="jewelry_type"
            value={formData.jewelry_type}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Jewelry Type</option>
            <option value="Necklace">Necklace</option>
            <option value="Ring">Ring</option>
            <option value="Bracelet">Bracelet</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Material</label>
          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Material</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Size (Optional)</label>
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Engraving (Optional)</label>
          <input
            type="text"
            name="engraving_text"
            value={formData.engraving_text}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Your Name</label>
          <input
            type="text"
            name="creator_name"
            value={formData.creator_name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Submit Customization
        </button>
      </form>
    </div>
  );
};

export default JewelryCustomizationForm;
