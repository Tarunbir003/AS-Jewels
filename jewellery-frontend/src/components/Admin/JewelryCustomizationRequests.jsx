import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JewelryCustomizationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCustomizationRequests = async () => {
      try {
        const response = await axios.get('https://as-jewels-1.onrender.com/api/jewelry_customization/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching customization requests:", error);
        setError("Failed to fetch customization requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomizationRequests();
  }, [token]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-700">Jewelry Customization Requests</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Material</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Engraving</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Creator</th>
            <th className="border px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr
              key={request.id}
              className="cursor-pointer hover:bg-gray-100 transition"
              onClick={() => navigate(`/admin/customization/${request.id}`)}
            >
              <td className="border px-4 py-2">{request.jewelry_type}</td>
              <td className="border px-4 py-2">{request.material}</td>
              <td className="border px-4 py-2">{request.size}</td>
              <td className="border px-4 py-2">{request.engraving_text}</td>
              <td className="border px-4 py-2">${request.price}</td>
              <td className="border px-4 py-2">{request.creator}</td>
              <td className="border px-4 py-2">{new Date(request.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JewelryCustomizationRequests;
