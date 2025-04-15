import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JewelryCustomizationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // assuming you save this in localStorage

  const fetchCustomizationRequests = async () => {
    try {
      const response = await axios.get(
        "https://as-jewels-1.onrender.com/api/jewelry_customization/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching customization requests:", error);
      setError("Failed to fetch customization requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(
        `https://as-jewels-1.onrender.com/api/jewelry_customization/${id}/`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCustomizationRequests(); // Refresh list after update
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  useEffect(() => {
    fetchCustomizationRequests();
  }, []);

  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter((req) => req.status === filter);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-red-700">
        Jewelry Customization Requests
      </h2>

      {/* Filter Dropdown */}
      <div className="mb-4 flex gap-2 items-center">
        <label className="font-semibold">Filter by Status:</label>
        <select
          className="border px-3 py-1 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <table className="min-w-full bg-white border border-gray-200 shadow-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Material</th>
            <th className="border px-4 py-2">Size</th>
            <th className="border px-4 py-2">Engraving</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Creator</th>
            <th className="border px-4 py-2">Created At</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr
              key={request.id}
              className="hover:bg-gray-50 transition"
              onClick={() => navigate(`/admin/customization/${request.id}`)}
            >
              <td className="border px-4 py-2">{request.jewelry_type}</td>
              <td className="border px-4 py-2">{request.material}</td>
              <td className="border px-4 py-2">{request.size}</td>
              <td className="border px-4 py-2">{request.engraving_text}</td>
              <td className="border px-4 py-2">${request.price}</td>
              <td className="border px-4 py-2">{request.creator}</td>
              <td className="border px-4 py-2">
                {new Date(request.created_at).toLocaleString()}
              </td>
              <td className="border px-4 py-2">
                {isAdmin ? (
                  <select
                    value={request.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) =>
                      handleStatusChange(request.id, e.target.value)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                ) : (
                  <span>{request.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JewelryCustomizationRequests;
