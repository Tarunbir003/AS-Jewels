import React from "react";

const PaymentCancel = () => {
  return (
    <div className="container text-center py-10">
      <h1 className="text-3xl font-bold text-red-600">Payment Canceled</h1>
      <p className="text-lg text-gray-700 mt-4">Your payment was not completed.</p>
      <a href="/" className="mt-6 inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-700">
        Return to Shop
      </a>
    </div>
  );
};

export default PaymentCancel;
