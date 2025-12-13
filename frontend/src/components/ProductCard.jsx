import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Safety check - don't render if product data is missing
  if (!product || !product._id) {
    return null;
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product || !product._id) {
      toast.error('Product information missing');
      return;
    }
    
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      // Pass full product data for guest users
      addToWishlist(product._id, product);
    }
  };

  const discountPercentage = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product._id}`} className="card group">
      <div className="relative">
        <img
          src={product.images?.[0] || '/placeholder.jpg'}
          alt={product.name || 'Product'}
          className="w-full h-64 object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/placeholder.jpg';
          }}
        />
        {discountPercentage > 0 && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            {discountPercentage}% OFF
          </span>
        )}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {isInWishlist(product._id) ? (
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name || 'Product'}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{product.brand || ''}</p>
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            ₹{product.price || 0}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
          )}
        </div>
        {product.rating > 0 && (
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-gray-500">({product.numReviews || 0})</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
