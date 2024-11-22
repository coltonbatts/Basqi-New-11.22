import React from 'react';
import { ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Premium Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    description: 'High-quality wireless headphones with noise cancellation'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80',
    description: 'Feature-rich smartwatch with health tracking'
  },
  {
    id: 3,
    name: 'Laptop Stand',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    description: 'Ergonomic aluminum laptop stand'
  },
];

const Products = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-indigo-600">
                  ${product.price}
                </span>
                <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;