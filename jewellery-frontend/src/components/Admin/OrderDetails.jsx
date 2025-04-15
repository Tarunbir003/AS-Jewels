import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`https://as-jewels-1.onrender.com/api/orders/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
        setStatus(res.data.status);
      } catch (err) {
        console.error("Failed to fetch order", err);
      }
    };
    fetchOrder();
  }, [id, token]);

  const updateStatus = async () => {
    try {
      const res = await axios.put(
        `https://as-jewels-1.onrender.com/api/orders/${id}/`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrder(res.data);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (!order) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <button onClick={() => navigate("/admin/orders")} className="mb-4 text-blue-600 underline">
        ← Back to Orders
      </button>

      <h2 className="text-2xl font-bold mb-2">Order #{order.id}</h2>
      <p><strong>Name:</strong> {order.name}</p>
      <p><strong>Phone:</strong> {order.phone_number}</p>
      <p><strong>Billing Address:</strong> {order.billing_address}</p>
      <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
      <p><strong>Payment Method:</strong> {order.payment_method}</p>
      <p><strong>Total Price:</strong> ₹{order.total_price}</p>
      <p><strong>Coupon Applied:</strong> {order.coupon_applied || "None"}</p>
      <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
      <p className="mb-2"><strong>Status:</strong> {order.status}</p>

      {/* Status Update */}
      <div className="mt-4 mb-6">
        <label className="block mb-1">Update Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded-md"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          onClick={updateStatus}
          className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Order Items:</h3>
      <ul className="list-disc ml-6 space-y-2">
        {order.order_items.map((item, i) => (
          <li key={i}>
            <p><strong>{item.product.name}</strong></p>
            <p>Qty: {item.quantity}</p>
            <p>Price: ${item.product.price}</p>
            <img
              src={`https://as-jewels-1.onrender.com${item.product.image}`}
              alt={item.product.name}
              className="w-20 h-20 mt-1 rounded shadow"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
