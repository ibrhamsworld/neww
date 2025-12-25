"use client"
import React, { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, FileText } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  minOrder: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CustomerInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Titanium Dioxide (Rutile Grade)",
    category: "Pigments",
    description: "High-quality white pigment with excellent opacity and brightness. Ideal for all paint formulations.",
    price: 2850,
    unit: "per ton",
    minOrder: 1,
    image: "🎨"
  },
  {
    id: 2,
    name: "Acrylic Resin (Emulsion)",
    category: "Resins",
    description: "Water-based acrylic emulsion for interior and exterior paints. Excellent durability and adhesion.",
    price: 3200,
    unit: "per ton",
    minOrder: 0.5,
    image: "💧"
  },
  {
    id: 3,
    name: "Iron Oxide Red",
    category: "Pigments",
    description: "Synthetic iron oxide pigment offering excellent color strength and weather resistance.",
    price: 1450,
    unit: "per ton",
    minOrder: 0.25,
    image: "🔴"
  },
  {
    id: 4,
    name: "Calcium Carbonate",
    category: "Fillers",
    description: "Ground calcium carbonate extender for cost-effective paint formulations.",
    price: 180,
    unit: "per ton",
    minOrder: 5,
    image: "⚪"
  },
  {
    id: 5,
    name: "Butyl Glycol",
    category: "Solvents",
    description: "Coalescing solvent for water-based paints. Improves film formation and flow.",
    price: 1850,
    unit: "per ton",
    minOrder: 0.2,
    image: "🧪"
  },
  {
    id: 6,
    name: "Dispersing Agent",
    category: "Additives",
    description: "High-performance dispersant for pigment grinding. Reduces viscosity and improves stability.",
    price: 4200,
    unit: "per ton",
    minOrder: 0.1,
    image: "⚗️"
  }
];

export default function PaintChemicalSales() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    company: '',
    email: '',
    phone: ''
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + product.minOrder }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: product.minOrder }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(item.minOrder, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const generateReceipt = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    if (!customerInfo.name || !customerInfo.company || !customerInfo.email) {
      alert('Please fill in all customer information fields.');
      return;
    }
    setShowReceipt(true);
    setShowCart(false);
  };

  const Receipt = () => {
    const subtotal = getTotalPrice();
    const tax = subtotal * 0.075; // 7.5% tax
    const total = subtotal + tax;
    const receiptNumber = `RCP-${Date.now().toString().slice(-8)}`;
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">INVOICE</h2>
                <p className="text-gray-600 mt-1">Receipt #{receiptNumber}</p>
                <p className="text-gray-600">{date}</p>
              </div>
              <button
                onClick={() => setShowReceipt(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Company Info */}
            <div className="mb-8 pb-8 border-b-2">
              <h3 className="font-bold text-lg mb-2">Paint Chemical Trading Co.</h3>
              <p className="text-sm text-gray-600">123 Industrial Avenue</p>
              <p className="text-sm text-gray-600">Chemical District, Lagos</p>
              <p className="text-sm text-gray-600">info@paintchemical.com</p>
            </div>

            {/* Customer Info */}
            <div className="mb-8 pb-8 border-b">
              <h3 className="font-bold text-lg mb-2">Bill To:</h3>
              <p className="text-gray-900 font-medium">{customerInfo.name}</p>
              <p className="text-gray-600">{customerInfo.company}</p>
              <p className="text-gray-600">{customerInfo.email}</p>
              <p className="text-gray-600">{customerInfo.phone}</p>
            </div>

            {/* Items */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left py-3 font-semibold">Item</th>
                  <th className="text-center py-3 font-semibold">Qty</th>
                  <th className="text-right py-3 font-semibold">Price</th>
                  <th className="text-right py-3 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-600">{item.category}</div>
                    </td>
                    <td className="text-center py-3">{item.quantity} tons</td>
                    <td className="text-right py-3">${item.price.toLocaleString()}</td>
                    <td className="text-right py-3 font-medium">
                      ${(item.price * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="space-y-2 mb-8">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (7.5%):</span>
                <span>${tax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t-2 pt-2">
                <span>Total:</span>
                <span>${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600 pt-8 border-t">
              <p className="mb-2">Thank you for your business!</p>
              <p>Payment terms: Net 30 days from invoice date</p>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Paint Chemical Products</h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Cart ({cart.length})
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
              </div>
              <div className="p-6">
                <div className="mb-2">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 h-12">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{product.unit}</p>
                    <p className="text-xs text-gray-500 mt-1">Min order: {product.minOrder} tons</p>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">${item.price.toLocaleString()} per ton</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -item.minOrder)}
                            className="bg-white border rounded p-1 hover:bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-medium">{item.quantity} tons</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.minOrder)}
                            className="bg-white border rounded p-1 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-lg">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-6 space-y-4">
                <div className="space-y-2 mb-4">
                  <input
                    type="text"
                    placeholder="Your Name *"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Company Name *"
                    value={customerInfo.company}
                    onChange={(e) => setCustomerInfo({...customerInfo, company: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex justify-between items-center text-xl font-bold mb-4">
                  <span>Total:</span>
                  <span>${getTotalPrice().toLocaleString()}</span>
                </div>
                <button
                  onClick={generateReceipt}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FileText size={20} />
                  Generate Receipt
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showReceipt && <Receipt />}
    </div>
  );
}