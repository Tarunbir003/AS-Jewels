import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [couponFilter, setCouponFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setError("Authorization token is missing. Please log in again.");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://as-jewels-1.onrender.com/allorders/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      }
    };

    fetchOrders();
  }, [token]);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone_number.includes(searchTerm) ||
        order.billing_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shipping_address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (paymentFilter) {
      filtered = filtered.filter((order) => order.payment_method === paymentFilter);
    }

    if (couponFilter) {
      filtered = filtered.filter((order) =>
        couponFilter === "No Coupon"
          ? !order.coupon_applied
          : order.coupon_applied === couponFilter
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, paymentFilter, couponFilter, statusFilter, orders]);

  const updateOrderStatus = async (orderId, newStatus) => {
    if (!token) {
      setError("Authorization token is missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.put(
        `https://as-jewels-1.onrender.com/api/orders/${orderId}/`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        setFilteredOrders((prevFilteredOrders) =>
          prevFilteredOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        setError("Failed to update order status. Please try again.");
      }
    } catch (err) {
      setError("Failed to update order status.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name, phone, or address"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        />
        <select
          value={paymentFilter}
          onChange={(e) => setPaymentFilter(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        >
          <option value="">All Payment Methods</option>
          <option value="CARD">Credit/Debit Card</option>
          <option value="PAYPAL">PayPal</option>
          <option value="COD">Cash on Delivery</option>
        </select>
        <select
          value={couponFilter}
          onChange={(e) => setCouponFilter(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        >
          <option value="">All Coupons</option>
          <option value="No Coupon">No Coupon</option>
          <option value="DISCOUNT10">DISCOUNT10</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/4"
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <div key={order.id} className="mb-6 p-4 border rounded shadow-md bg-white">
            <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone Number:</strong> {order.phone_number}</p>
            <p><strong>Billing Address:</strong> {order.billing_address}</p>
            <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
            <p><strong>Payment Method:</strong> {order.payment_method}</p>
            <p><strong>Total Price:</strong> ${order.total_price}</p>
            <p><strong>Coupon Applied:</strong> {order.coupon_applied || "No coupon applied"}</p>
            <p><strong>Created At:</strong> {new Date(order.created_at).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status || "To Do"}</p>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Update Status:</label>
              <select
                value={order.status || "Pending"}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                className="border p-2 rounded-md w-full md:w-1/3"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <h4 className="mt-4 font-medium">Order Items:</h4>
            <ul className="list-disc list-inside">
              {order.order_items.map((item, index) => (
                <li key={index} className="ml-4 mb-2">
                  <p><strong>Product Name:</strong> {item.product.name}</p>
                  <p><strong>Description:</strong> {item.product.description}</p>
                  <p><strong>Price:</strong> ${item.product.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <div className="flex items-center mt-2">
                    <img
                      src={
                        item.product.image
                          ? `https://as-jewels-1.onrender.com${item.product.image}`
                          : "/placeholder.png"
                      }
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-md mr-2"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;
