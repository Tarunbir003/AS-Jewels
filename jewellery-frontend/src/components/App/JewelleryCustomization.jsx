import React, { useState } from "react";
import axios from "axios";

const JewelryCustomization = () => {
  const [formData, setFormData] = useState({
    jewelry_type: "",
    material: "",
    size: "",
    engraving_text: "",
    price: 0,
    creator_name: "",
    contact_info: "",
  });

  const [file, setFile] = useState(null); // File upload
  const [filePreview, setFilePreview] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("accessToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });

    if (file) {
      submissionData.append("image", file); // Assuming your backend accepts 'image' field
    }

    try {
      const response = await axios.post(
        "https://as-jewels-1.onrender.com/api/jewelry_customization/",
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Customization submitted:", response.data);
      setSuccessMessage("Your customization request has been submitted!");
      setFormData({
        jewelry_type: "",
        material: "",
        size: "",
        engraving_text: "",
        price: 0,
        creator_name: "",
        contact_info: "",
      });
      setFile(null);
      setFilePreview(null);
    } catch (err) {
      console.error("Error submitting customization:", err);
      setError("Failed to submit customization. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#70193D]">
        Customize Your Jewelry
      </h2>

      {successMessage && <div className="text-green-600 text-center mb-4">{successMessage}</div>}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Jewelry Type */}
        <div>
          <label className="block text-sm font-medium">Jewelry Type</label>
          <select
            name="jewelry_type"
            value={formData.jewelry_type}
            onChange={handleChange}
            required
            className="block w-full border rounded px-3 py-2"
          >
            <option value="">Select Jewelry Type</option>
            <option value="Ring">Ring</option>
            <option value="Necklace">Necklace</option>
            <option value="Bracelet">Bracelet</option>
            <option value="Earrings">Earrings</option>
          </select>
        </div>

        {/* Material */}
        <div>
          <label className="block text-sm font-medium">Material</label>
          <select
            name="material"
            value={formData.material}
            onChange={handleChange}
            required
            className="block w-full border rounded px-3 py-2"
          >
            <option value="">Select Material</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Platinum">Platinum</option>
          </select>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium">Size (Optional)</label>
          <input
            name="size"
            type="text"
            value={formData.size}
            onChange={handleChange}
            className="block w-full border rounded px-3 py-2"
          />
        </div>

        {/* Engraving */}
        <div>
          <label className="block text-sm font-medium">Engraving (Optional)</label>
          <input
            name="engraving_text"
            type="text"
            value={formData.engraving_text}
            onChange={handleChange}
            className="block w-full border rounded px-3 py-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
            className="block w-full border rounded px-3 py-2"
          />
        </div>

        {/* Creator Name */}
        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            name="creator_name"
            type="text"
            value={formData.creator_name}
            onChange={handleChange}
            required
            className="block w-full border rounded px-3 py-2"
          />
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-sm font-medium">Contact Info</label>
          <input
            name="contact_info"
            type="text"
            value={formData.contact_info}
            onChange={handleChange}
            required
            placeholder="Email / Phone / Instagram"
            className="block w-full border rounded px-3 py-2"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium">Upload Reference Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm border rounded px-3 py-2"
          />
          {filePreview && (
            <img
              src={filePreview}
              alt="Preview"
              className="mt-2 h-24 rounded border shadow"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700"
        >
          Submit Customization
        </button>
      </form>
    </div>
  );
};

export default JewelryCustomization;
