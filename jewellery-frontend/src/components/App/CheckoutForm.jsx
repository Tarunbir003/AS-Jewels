import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddAddressForm from './Addresses';
import CartSummary from './CartSummary';

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState('');
  const [selectedShippingAddress, setSelectedShippingAddress] = useState('');
  const [subTotal, setSubTotal] = useState(0);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [orderItems, setOrderItems] = useState([]);
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('https://as-jewels-1.onrender.com/api/addresses/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setError('Failed to fetch addresses.');
      }
    };

    fetchAddresses();
  }, [token]);

  const calculateTotalCost = () => {
    const validSubTotal = typeof subTotal === 'number' ? subTotal : 0;
    const discountedPrice = validSubTotal - (validSubTotal * (discount / 100));
    return Math.max(discountedPrice, 0);
  };

  const handleRazorpayPayment = async () => {
    try {
      // Step 1: Create an order directly on the client side
      const orderData = {
        amount: calculateTotalCost() * 100, // Amount in paise
        currency: 'INR',
        receipt: `receipt_${Math.random().toString(36).substring(7)}`, // Random receipt ID
      };

      const options = {
        key: 'rzp_test_6IDr1AeGNZgUbK', // Replace with your Razorpay test key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'AS Jewels',
        description: 'Order Payment',
        handler: async function (response) {
          console.log('Payment Successful:', response);
          alert('Payment Successful!');
          await placeOrder(response.razorpay_payment_id); // Pass payment ID to place the order
        },
        prefill: {
          name: name,
          contact: phone,
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment:', error);
      setError('Failed to initiate payment. Please try again.');
    }
  };

  const placeOrder = async (paymentId) => {
    if (!name || !phone || !selectedBillingAddress || !selectedShippingAddress) {
      setError('Please fill in all required fields.');
      return;
    }

    const orderData = {
      total_price: calculateTotalCost(),
      name,
      phone_number: phone,
      shipping_address: selectedShippingAddress,
      billing_address: selectedBillingAddress,
      coupon_applied: couponCode,
      order_items: orderItems,
      payment_method: 'RAZORPAY',
      payment_id: paymentId, // Include the Razorpay payment ID
    };

    try {
      const response = await axios.post('https://as-jewels-1.onrender.com/api/orders/', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Order placed successfully:', response.data);

      setName('');
      setPhone('');
      setSelectedBillingAddress('');
      setSelectedShippingAddress('');
      setCouponCode('');
      setDiscount(0);
      setOrderItems([]);

      navigate('/thank-you', { state: { orderSummary: response.data } });
    } catch (error) {
      console.error('Error placing order:', error);
      setError('Failed to place order. Please try again later.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold">Checkout</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form id="checkout-form">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <h2 className="text-lg font-medium mt-4">Select Billing Address</h2>
          <select
            value={selectedBillingAddress}
            onChange={(e) => setSelectedBillingAddress(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Billing Address</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.street}, {address.city}, {address.state}, {address.postal_code}, {address.country}
              </option>
            ))}
          </select>
          <h2 className="text-lg font-medium mt-4">Select Shipping Address</h2>
          <select
            value={selectedShippingAddress}
            onChange={(e) => setSelectedShippingAddress(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select Shipping Address</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.street}, {address.city}, {address.state}, {address.postal_code}, {address.country}
              </option>
            ))}
          </select>
        </form>

        <div className="mt-4">
          <button
            onClick={() => setShowAddAddress(!showAddAddress)}
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add New Address
          </button>
          {showAddAddress && (
            <AddAddressForm
              token={token}
              setAddresses={setAddresses}
              setShowAddAddress={setShowAddAddress}
            />
          )}
        </div>
        <button
          onClick={handleRazorpayPayment}
          className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Pay with Razorpay
        </button>
      </div>

      <CartSummary
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        discount={discount}
        setDiscount={setDiscount}
        subtotal={subTotal}
        setSubtotal={setSubTotal}
        setOrderItems={setOrderItems}
      />
    </div>
  );
};

export default CheckoutForm;
