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
  const [loading, setLoading] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    setLoading(true);

    try {
      const response = await api.post('/orders', {
        shippingAddress: formData,
        paymentMethod,
      });
      
      toast.success('Order placed successfully!');
      clearCart();
      
      // ✅ Redirect to order confirmation page
      navigate(`/order/${response.data.order._id}`);
      
    } catch (error) {
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
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="COD"
                        checked={paymentMethod === 'COD'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      Cash on Delivery
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="CARD"
                        checked={paymentMethod === 'CARD'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      Card Payment (Simulated)
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
                {cart.items.map((item) => (
                  <div key={item._id} className="flex justify-between text-sm">
                    <span>{item.product?.name} x {item.quantity}</span>
                    <span>₹{(item.product?.price * item.quantity).toFixed(2)}</span>
                  </div>
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