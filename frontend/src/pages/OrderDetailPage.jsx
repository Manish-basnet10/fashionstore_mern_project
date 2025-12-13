import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${id}`);
        setOrder(response.data.order);
      } catch (error) {
        toast.error('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
          <Link to="/profile" className="btn-primary">
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Thank you for shopping with FashionStore. Your order has been placed successfully.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Order ID: <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{order._id.slice(-8).toUpperCase()}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Items</h2>
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium">
                  {order.items?.length} {order.items?.length === 1 ? 'Item' : 'Items'}
                </span>
              </div>
              
              <div className="space-y-4">
                {order.items?.map((item, index) => (
                  <div key={item._id || index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl transition-colors">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                      {item.product?.images?.[0] ? (
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{item.product?.name}</h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600 dark:text-gray-300">
                        <span>Qty: {item.quantity}</span>
                        <span>Size: {item.size || 'M'}</span>
                        <span>Color: {item.color || 'Default'}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900 dark:text-white">
                        ₹{(item.product?.price * item.quantity)?.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ₹{item.product?.price?.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Billing Card */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Shipping Address */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Shipping Address</h3>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-900 dark:text-white">{order.shippingAddress?.name}</p>
                  <p className="text-gray-600 dark:text-gray-300">{order.shippingAddress?.address}</p>
                  <p className="text-gray-600 dark:text-gray-300">{order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}</p>
                  <p className="text-gray-600 dark:text-gray-300">📱 {order.shippingAddress?.phone}</p>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-purple-600 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Status</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {order.status === 'Shipped' || order.status === 'Delivered' ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : null}
                    </div>
                    <div>
                      <p className={`font-medium ${order.status === 'Processing' ? 'text-gray-400' : ''}`}>Processing</p>
                      <p className="text-sm text-gray-500">Estimated 1-2 days</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {order.status === 'Shipped' || order.status === 'Delivered' ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : null}
                    </div>
                    <div>
                      <p className={`font-medium ${order.status === 'Shipped' || order.status === 'Delivered' ? '' : 'text-gray-400'}`}>Shipped</p>
                      <p className="text-sm text-gray-500">With delivery partner</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {order.status === 'Delivered' ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : null}
                    </div>
                    <div>
                      <p className={`font-medium ${order.status === 'Delivered' ? '' : 'text-gray-400'}`}>Delivered</p>
                      <p className="text-sm text-gray-500">At your doorstep</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{order.itemsTotal?.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice?.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 dark:text-gray-300">Tax (18%)</span>
                  <span className="font-medium text-gray-900 dark:text-white">₹{order.taxPrice?.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between py-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      ₹{order.totalPrice?.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Inclusive of all taxes</p>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Payment Method</span>
                      <span className="font-medium text-gray-900 dark:text-white">{order.paymentMethod}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Order Date</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {new Date(order.createdAt).toLocaleDateString('en-IN', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Estimated Delivery</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 space-y-3">
                  <Link
                    to="/profile"
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-center"
                  >
                    View All Orders
                  </Link>
                  
                  <Link
                    to="/"
                    className="block w-full bg-white dark:bg-gray-700 border border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-600 font-semibold py-3 px-4 rounded-xl transition-colors text-center"
                  >
                    Continue Shopping
                  </Link>
                  
                  <button className="block w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold py-3 px-4 rounded-xl transition-colors">
                    Download Invoice
                  </button>
                </div>

                {/* Help Section */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Need help with your order?{' '}
                    <Link to="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      Contact Support
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            A confirmation email has been sent to your registered email address.
            You can track your order in your profile page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;