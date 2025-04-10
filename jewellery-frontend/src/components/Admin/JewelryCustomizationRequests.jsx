import React, { useEffect, useState } from "react";
import axios from "axios";

const JewelryCustomizationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCustomizationRequests = async () => {
      try {
        const response = await axios.get("https://as-jewels-1.onrender.com/api/jewelry_customization/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const withStatus = response.data.map(req => ({
          ...req,
          localStatus: "Pending",
        }));
        setRequests(withStatus);
      } catch (error) {
        console.error("Error fetching customization requests:", error);
        setError("Failed to fetch customization requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomizationRequests();
  }, [token]);

  const updateLocalStatus = (id, newStatus) => {
    setRequests(prev =>
      prev.map(req => req.id === id ? { ...req, localStatus: newStatus } : req)
    );
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Jewelry Customization Requests</h2>
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Material</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Engraving</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{request.jewelry_type}</td>
              <td className="border px-4 py-2">{request.material}</td>
              <td className="border px-4 py-2">{request.size}</td>
              <td className="border px-4 py-2">{request.engraving_text}</td>
              <td className="border px-4 py-2">${request.price}</td>
              <td className="border px-4 py-2">{new Date(request.created_at).toLocaleString()}</td>
              <td className="border px-4 py-2">
                <select
                  value={request.localStatus}
                  onChange={(e) => updateLocalStatus(request.id, e.target.value)}
                  className="border rounded px-2 py-1 text-xs"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Declined">Declined</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JewelryCustomizationRequests;
