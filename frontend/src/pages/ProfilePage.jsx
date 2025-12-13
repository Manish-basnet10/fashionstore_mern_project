import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="card p-6">
              <div className="text-center mb-4">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold mt-4">{user?.name}</h2>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">My Orders</h2>
              {orders.length === 0 ? (
                <p className="text-gray-600">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-lg font-bold">₹{order.totalPrice.toFixed(2)}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        {order.orderItems.length} item(s)
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

