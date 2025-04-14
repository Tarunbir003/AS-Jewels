import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const JewelryCustomizationDetail = () => {
  const { id } = useParams();
  const [customization, setCustomization] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCustomization = async () => {
      try {
        const response = await axios.get(
          `https://as-jewels-1.onrender.com/api/jewelry_customization/${id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCustomization(response.data);
      } catch (err) {
        console.error("Error fetching detail:", err.response || err.message);
        setError("Could not fetch customization details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomization();
  }, [id, token]);

  if (loading) return <p className="text-center mt-10">Loading customization details...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h1 className="text-2xl font-bold mb-4">Customization Detail</h1>

      <div className="space-y-3">
        <p><strong>Jewelry Type:</strong> {customization.jewelry_type}</p>
        <p><strong>Material:</strong> {customization.material}</p>
        <p><strong>Size:</strong> {customization.size || "N/A"}</p>
        <p><strong>Description:</strong> {customization.engraving_text || "N/A"}</p>
        <p><strong>Price:</strong> ${customization.price}</p>
        <p><strong>Creator:</strong> {customization.creator}</p>
        <p><strong>Created At:</strong> {new Date(customization.created_at).toLocaleString()}</p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
};

export default JewelryCustomizationDetail;
