import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://as-jewels-1.onrender.com/allorders/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders", err);
      }
    };
    fetchOrders();
  }, [token]);

  const filteredOrders = orders.filter((order) => {
    return (
      (order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone_number?.includes(searchTerm)) &&
      (!statusFilter || order.status === statusFilter)
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-red-800">All Orders</h2>

      {/* Filters */}
      <div className="flex gap-4 flex-wrap mb-6">
        <input
          type="text"
          placeholder="Search name or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders */}
      {filteredOrders.length ? (
        filteredOrders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded-md shadow mb-4 bg-white hover:bg-gray-50 transition"
          >
            <h3 className="text-xl font-semibold">Order #{order.id}</h3>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phone_number}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <button
              className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => navigate(`/admin/orders/${order.id}`)}
            >
              View Details
            </button>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
