import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, loading } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    if (!product || !product._id) {
      toast.error('Product information missing');
      return;
    }
    // Default size and color for quick add
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0] || { name: 'Default', code: '#000000' };
    
    // Pass full product data for guest users
    addToCart(product._id, 1, defaultSize, defaultColor, product);
    toast.success('Added to cart');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading wishlist...</p>
        </div>
      </div>
    );
  }

  // Filter out items with missing product data and ensure safe access
  const validItems = (wishlist?.items || []).filter(
    (item) => item && item.product && item.product._id && item.product.name
  );

  if (!wishlist?.items || wishlist.items.length === 0 || validItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Save items you love for later</p>
          <Link to="/home" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {validItems.map((item) => (
            <div key={item._id || `wishlist-${item.product._id}`} className="relative">
              {item.product && <ProductCard product={item.product} />}
              <div className="mt-2 space-y-2">
                <button
                  onClick={() => handleMoveToCart(item.product)}
                  className="w-full btn-primary"
                  disabled={!item.product}
                >
                  Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.product._id)}
                  className="w-full btn-secondary"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
