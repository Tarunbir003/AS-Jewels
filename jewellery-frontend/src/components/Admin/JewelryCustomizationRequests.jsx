import React, { useEffect, useState } from "react";
import axios from "axios";

const JewelryCustomizationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCustomizationRequests = async () => {
      try {
        const response = await axios.get("https://as-jewels-1.onrender.com/api/jewelry_customization/", {
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

  const filteredRequests = requests
    .filter((req) => {
      const term = searchTerm.toLowerCase();
      const createdAt = new Date(req.created_at).toISOString().split("T")[0];
      return (
        (req.jewelry_type.toLowerCase().includes(term) ||
          req.material.toLowerCase().includes(term) ||
          (req.engraving_text && req.engraving_text.toLowerCase().includes(term)) ||
          req.price.toString().includes(term)) &&
        (dateFilter === "" || createdAt === dateFilter)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return sortOrder === "oldest" ? dateA - dateB : dateB - dateA;
    });

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Jewelry Customization Requests</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by type, material, engraving, or price..."
          className="w-full sm:w-1/3 border px-3 py-2 rounded"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full sm:w-1/3 border px-3 py-2 rounded"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full sm:w-1/3 border px-3 py-2 rounded"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

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
          {filteredRequests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{request.jewelry_type}</td>
              <td className="border px-4 py-2">{request.material}</td>
              <td className="border px-4 py-2">{request.size}</td>
              <td className="border px-4 py-2">{request.engraving_text}</td>
              <td className="border px-4 py-2">${request.price}</td>
              <td className="border px-4 py-2">{request.creator_name}</td>
              <td className="border px-4 py-2">{new Date(request.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JewelryCustomizationRequests;
