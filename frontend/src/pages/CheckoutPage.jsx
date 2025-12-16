import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');
  const [loading, setLoading] = useState(false);

  // Safe calculation to prevent crashes
  const subtotal = getCartTotal();
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateUPI = (id) => {
    // UPI ID format: name@paytm, name@phonepe, name@ybl, etc.
    const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    return upiPattern.test(id);
  };

  const handleUPIChange = (e) => {
    const value = e.target.value;
    setUpiId(value);
    if (value && !validateUPI(value)) {
      setUpiError('Invalid UPI ID format. Example: name@paytm');
    } else {
      setUpiError('');
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setUpiId('');
    setUpiError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      navigate('/login');
      return;
    }

    if (cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Validate UPI if selected
    if (paymentMethod === 'UPI' && (!upiId || !validateUPI(upiId))) {
      setUpiError('Please enter a valid UPI ID');
      return;
    }

    setLoading(true);

    try {
      // 1. Safety Filter for Ghost Items
      const validItems = cart.items.filter(item => item && item.product && item.product._id);

      if (validItems.length === 0) {
        toast.error("Your cart contains invalid items. Please clear cart.");
        setLoading(false);
        return;
      }

      // 2. Prepare Order Data
      const orderData = {
        orderItems: validItems.map(item => ({
          product: item.product._id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.images?.[0] || '',
          qty: item.quantity,
          size: item.size || 'M',
          color: item.color || 'Black'
        })),
        shippingAddress: formData,
        paymentMethod,
        upiId: paymentMethod === 'UPI' ? upiId : undefined,
        itemsPrice: subtotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total
      };

      const response = await api.post('/orders', orderData);
      
      toast.success('Order placed successfully!');
      clearCart();
      
      // ✅ Redirect to order confirmation page
      navigate(`/order/${response.data.order._id}`);
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    rows="3"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                  <div className="space-y-4">
                    {/* Cash on Delivery Option */}
                    <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-500 dark:hover:border-purple-400" style={{ borderColor: paymentMethod === 'COD' ? '#9333ea' : '#e5e7eb' }}>
                      <input
                        type="radio"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={(e) => handlePaymentMethodChange(e.target.value)}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 dark:text-white">Cash on Delivery</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Pay when you receive</div>
                      </div>
                    </label>
                    
                    {/* UPI Option */}
                    <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-500 dark:hover:border-purple-400" style={{ borderColor: paymentMethod === 'UPI' ? '#9333ea' : '#e5e7eb' }}>
                      <input
                        type="radio"
                        value="UPI"
                        checked={paymentMethod === 'UPI'}
                        onChange={(e) => handlePaymentMethodChange(e.target.value)}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center">
                          <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                          </svg>
                          UPI Payment
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Pay via UPI (PhonePe, Google Pay, Paytm)</div>
                      </div>
                    </label>

                    {/* UPI Expanded Section */}
                    {paymentMethod === 'UPI' && (
                      <div className="ml-8 mt-2 space-y-2">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">
                            UPI ID <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={handleUPIChange}
                            placeholder="yourname@paytm or yourname@ybl"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                              upiError
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-300 dark:border-slate-600 focus:ring-purple-500 dark:bg-slate-700 dark:text-white'
                            }`}
                          />
                          {upiError && (
                            <p className="mt-1 text-sm text-red-500">{upiError}</p>
                          )}
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Enter your UPI ID (e.g., name@paytm, name@phonepe, name@ybl)
                          </p>
                        </div>
                        
                        {/* 🚨 UPI QR Code Integration (Using Public Image) */}
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                          <div className="text-center">
                            <div className="inline-block p-2 bg-white rounded-lg mb-2 shadow-sm">
                              {/* This loads the 'upi.jpg' file from your 'public' folder. 
                                Make sure your file is named exactly 'upi.jpg' inside 'frontend/public/'
                              */}
                              <div className="w-40 h-40 bg-white flex items-center justify-center overflow-hidden">
                                <img 
                                  src="/upi.jpeg" 
                                  alt="Scan to Pay"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                            
                            <p className="text-sm font-bold text-slate-900 dark:text-white">Scan with any UPI App</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              GPay / PhonePe / Paytm
                            </p>
                            <div className="mt-2 inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-bold border border-indigo-200 dark:border-indigo-700">
                              Amount: ₹{total.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <label className="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-500 dark:hover:border-purple-400" style={{ borderColor: paymentMethod === 'CARD' ? '#9333ea' : '#e5e7eb' }}>
                      <input
                        type="radio"
                        value="CARD"
                        checked={paymentMethod === 'CARD'}
                        onChange={(e) => handlePaymentMethodChange(e.target.value)}
                        className="mt-1 mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 dark:text-white">Card Payment</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Debit/Credit Card (Simulated)</div>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-3 mt-6"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                {/* 🛡️ Added safety check (?.name) to prevent crash on null items */}
                {cart.items.map((item) => (
                  item.product && (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  )
                ))}
              </div>
              <div className="border-t pt-2 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 