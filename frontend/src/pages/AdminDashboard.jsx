import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'Men',
    brand: '',
    colors: [],
    sizes: [],
    stock: '',
    featured: false,
    images: [],
  });
  const [imageFiles, setImageFiles] = useState([]); // KEEP THIS ONE - line 28

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchStats();
    fetchProducts();
    fetchOrders();
    fetchContactMessages();
  }, [isAdmin, navigate]);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products?limit=100');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await api.get('/admin/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const response = await api.get('/contact');
      setContactMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching contact messages:', error);
    }
  };

  const handleUpdateMessageStatus = async (messageId, status) => {
    try {
      await api.put(`/contact/${messageId}/status`, { status });
      toast.success('Message status updated');
      fetchContactMessages();
    } catch (error) {
      toast.error('Failed to update message status');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm({
      ...productForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleColorAdd = () => {
    const name = prompt('Color name:');
    const code = prompt('Color code (hex):');
    if (name && code) {
      setProductForm({
        ...productForm,
        colors: [...productForm.colors, { name, code }],
      });
    }
  };

  const handleSizeToggle = (size) => {
    setProductForm({
      ...productForm,
      sizes: productForm.sizes.includes(size)
        ? productForm.sizes.filter((s) => s !== size)
        : [...productForm.sizes, size],
    });
  };

  // REMOVE THIS DUPLICATE LINE (currently line 61):
  // const [imageFiles, setImageFiles] = useState([]);

  const handleImageUpload = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Append all form fields
    formData.append('name', productForm.name);
    formData.append('description', productForm.description);
    formData.append('price', productForm.price);
    formData.append('originalPrice', productForm.originalPrice);
    formData.append('category', productForm.category);
    formData.append('brand', productForm.brand);
    formData.append('stock', productForm.stock);
    formData.append('featured', productForm.featured);
    formData.append('colors', JSON.stringify(productForm.colors));
    formData.append('sizes', JSON.stringify(productForm.sizes));
    
    // Append image files if editing and no new files, keep existing images
    if (editingProduct && imageFiles.length === 0 && productForm.images.length > 0) {
      formData.append('images', JSON.stringify(productForm.images));
    }
    
    // Append new image files
    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated successfully');
      } else {
        await api.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product added successfully');
      }
      
      setShowProductForm(false);
      setEditingProduct(null);
      setImageFiles([]);
      setProductForm({
        name: '',
        description: '',
        price: '',
        originalPrice: '',
        category: 'Men',
        brand: '',
        colors: [],
        sizes: [],
        stock: '',
        featured: false,
        images: [],
      });
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await api.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setImageFiles([]);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice,
      category: product.category,
      brand: product.brand,
      colors: product.colors,
      sizes: product.sizes,
      stock: product.stock,
      featured: product.featured,
      images: product.images,
    });
    setShowProductForm(true);
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="flex space-x-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 ${activeTab === 'dashboard' ? 'border-b-2 border-primary' : ''}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 ${activeTab === 'products' ? 'border-b-2 border-primary' : ''}`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 ${activeTab === 'orders' ? 'border-b-2 border-primary' : ''}`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 ${activeTab === 'messages' ? 'border-b-2 border-primary' : ''}`}
          >
            Contact Messages
            {contactMessages.filter(m => m.status === 'new').length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {contactMessages.filter(m => m.status === 'new').length}
              </span>
            )}
          </button>
        </div>

        {activeTab === 'dashboard' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <h3 className="text-gray-600 mb-2">Total Users</h3>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-600 mb-2">Total Products</h3>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-600 mb-2">Total Orders</h3>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-gray-600 mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold">₹{stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Products</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setImageFiles([]);
                  setProductForm({
                    name: '',
                    description: '',
                    price: '',
                    originalPrice: '',
                    category: 'Men',
                    brand: '',
                    colors: [],
                    sizes: [],
                    stock: '',
                    featured: false,
                    images: [],
                  });
                  setShowProductForm(true);
                }}
                className="btn-primary"
              >
                Add New Product
              </button>
            </div>

            {showProductForm && (
              <div className="card p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <form onSubmit={handleSubmitProduct} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={productForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={productForm.brand}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleInputChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={productForm.price}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Original Price</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={productForm.originalPrice}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={productForm.stock}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-lg"
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sizes</label>
                    <div className="flex space-x-2">
                      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeToggle(size)}
                          className={`px-4 py-2 border rounded ${
                            productForm.sizes.includes(size)
                              ? 'bg-primary text-white'
                              : ''
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Colors</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {productForm.colors.map((color, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: color.code }}
                          />
                          <span>{color.name}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setProductForm({
                                ...productForm,
                                colors: productForm.colors.filter((_, i) => i !== idx),
                              });
                            }}
                            className="text-red-500"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleColorAdd}
                      className="btn-secondary"
                    >
                      Add Color
                    </button>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Images</label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 border rounded-lg"
                      required={!editingProduct}
                    />
                    {imageFiles.length > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        {imageFiles.length} file(s) selected
                      </p>
                    )}
                    {editingProduct && productForm.images.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium mb-2">Current Images:</p>
                        <div className="flex space-x-2 overflow-x-auto">
                          {productForm.images.map((img, idx) => (
                            <img key={idx} src={img} alt={`Product ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={productForm.featured}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Featured Product
                    </label>
                  </div>
                  <div className="flex space-x-4">
                    <button type="submit" className="btn-primary" disabled={!imageFiles.length && !editingProduct}>
                      {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProductForm(false);
                        setEditingProduct(null);
                        setImageFiles([]);
                      }}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="card p-4">
                  <img
                    src={product.images[0] || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-primary font-bold mb-4">₹{product.price}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="btn-secondary flex-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded flex-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-semibold">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-600">
                        {order.user?.name} - {order.user?.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                        className="px-4 py-2 border rounded-lg"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="font-semibold">Items:</p>
                    {order.orderItems.map((item, idx) => (
                      <p key={idx} className="text-sm">
                        {item.name} x {item.quantity} - ₹{item.price}
                      </p>
                    ))}
                  </div>
                  <p className="text-lg font-bold">Total: ₹{order.totalPrice.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Messages</h2>
            {contactMessages.length === 0 ? (
              <div className="card p-12 text-center">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600 dark:text-gray-400">No contact messages yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contactMessages.map((message) => (
                  <div
                    key={message._id}
                    className={`card p-6 border-l-4 ${
                      message.status === 'new'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : message.status === 'read'
                        ? 'border-gray-400'
                        : 'border-green-500'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{message.name}</h3>
                          {message.status === 'new' && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                          )}
                          {message.status === 'replied' && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Replied</span>
                          )}
                        </div>
                        <div className="mb-2">
                          <p className="text-purple-600 dark:text-purple-400">{message.email}</p>
                          {message.phone && (
                            <p className="text-purple-600 dark:text-purple-400 text-sm">
                              📞 {message.phone}
                            </p>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-white dark:bg-slate-800 p-4 rounded-lg border border-gray-200 dark:border-slate-700">
                          {message.message}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <a
                        href={`mailto:${message.email}?subject=Re: Your Contact Form Submission&body=Dear ${message.name},%0D%0A%0D%0AThank you for contacting us.`}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                      >
                        Reply via Email
                      </a>
                      {message.phone && (
                        <a
                          href={`tel:${message.phone}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-all"
                        >
                          Call
                        </a>
                      )}
                      {message.status === 'new' && (
                        <button
                          onClick={() => handleUpdateMessageStatus(message._id, 'read')}
                          className="bg-gray-200 dark:bg-slate-700 text-slate-900 dark:text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 dark:hover:bg-slate-600 transition-all"
                        >
                          Mark as Read
                        </button>
                      )}
                      {message.status !== 'replied' && (
                        <button
                          onClick={() => handleUpdateMessageStatus(message._id, 'replied')}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-all"
                        >
                          Mark as Replied
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;