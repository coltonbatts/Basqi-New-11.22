import React from 'react';
import { loadStripe } from '@stripe/stripe-js';

const Checkout = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300"
              placeholder="Doe"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-lg border-gray-300"
              placeholder="john@example.com"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300"
              placeholder="123 Main St"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300"
              placeholder="New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code
            </label>
            <input
              type="text"
              className="w-full rounded-lg border-gray-300"
              placeholder="10001"
            />
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
        <p className="text-gray-600 mb-4">
          Payment processing will be integrated with Stripe when connected to the backend.
        </p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-500">
            For now, this is a placeholder for the Stripe Elements payment form.
          </p>
        </div>
      </div>

      <button
        className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        onClick={() => alert('Payment processing will be implemented with backend integration')}
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;