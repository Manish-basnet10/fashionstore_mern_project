import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { cart, updateCartItem, removeFromCart, getCartTotal, loading } = useCart();
  const { addToWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to proceed to checkout');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  const handleMoveToWishlist = (item) => {
    if (!item.product || !item.product._id) {
      toast.error('Product information missing');
      return;
    }
    addToWishlist(item.product._id, item.product);
    removeFromCart(item._id);
    toast.success('Moved to wishlist');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  // Filter out items with missing product data and ensure safe access
  const validItems = (cart?.items || []).filter(
    (item) => item && item.product && item.product._id && item.product.name
  );

  const subtotal = getCartTotal();
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (!cart?.items || cart.items.length === 0 || validItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Add some items to get started</p>
          <Link to="/home" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {validItems.map((item) => (
              <div key={item._id || `item-${item.product._id}`} className="card p-4 flex md:flex-row flex-col gap-4">
                <img
                  src={item.product?.images?.[0] || '/placeholder.jpg'}
                  alt={item.product?.name || 'Product'}
                  className="w-32 h-32 object-cover rounded"
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                <div className="flex-1">
                  <Link to={`/product/${item.product?._id}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary">
                      {item.product?.name || 'Product'}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    Size: {item.size || 'N/A'} | Color: {item.color?.name || 'N/A'}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-bold text-primary">
                      ₹{((item.product?.price || 0) * (item.quantity || 1)).toFixed(2)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartItem(item._id, Math.max(1, (item.quantity || 1) - 1))}
                        className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity || 1}</span>
                      <button
                        onClick={() => updateCartItem(item._id, (item.quantity || 1) + 1)}
                        className="px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleMoveToWishlist(item)}
                      className="text-primary hover:underline"
                    >
                      Save for Later
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
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
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="block w-full btn-primary text-center py-3"
              >
                Proceed to Checkout
              </button>
              {!isAuthenticated && (
                <p className="text-sm text-gray-500 text-center mt-2">
                  Login required for checkout
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
