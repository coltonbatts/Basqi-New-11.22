import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  // This will be connected to your state management later
  const cartItems = [
    {
      id: 1,
      name: 'Premium Headphones',
      price: 199.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center p-6 border-b">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 ml-6">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={item.quantity}
                    className="rounded-lg border-gray-300"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">Free</span>
            </div>
            <div className="flex justify-between mb-8">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-bold">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;