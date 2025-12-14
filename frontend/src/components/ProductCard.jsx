import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import toast from 'react-hot-toast';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imageIndex, setImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  if (!product || !product._id) {
    return null;
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product._id, product);
      toast.success('Added to wishlist');
    }
  };


  const discountPercentage = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const hasMultipleImages = product.images && product.images.length > 1;
  const currentImage = product.images?.[imageIndex] || product.images?.[0] || '/placeholder.jpg';
  const nextImage = hasMultipleImages && imageIndex < product.images.length - 1 
    ? product.images[imageIndex + 1] 
    : product.images?.[0];

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-700">
      <Link to={`/product/${product._id}`} className="block">
        {/* Image Container with Hover Effect */}
        <div 
          className="relative overflow-hidden bg-gray-100 dark:bg-slate-900 aspect-square"
          onMouseEnter={() => {
            setIsHovered(true);
            if (hasMultipleImages) {
              setTimeout(() => setImageIndex(1), 200);
            }
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            setImageIndex(0);
          }}
        >
          <img
            src={currentImage}
            alt={product.name || 'Product'}
            className={`w-full h-full object-cover transition-all duration-500 ${
              isHovered && hasMultipleImages ? 'scale-110' : 'scale-100'
            }`}
            loading="lazy"
            onError={(e) => {
              e.target.src = '/placeholder.jpg';
            }}
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                {discountPercentage}% OFF
              </span>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 ${
              isInWishlist(product._id)
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/90 dark:bg-slate-800/90 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>

        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Brand */}
          <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">
            {product.brand || 'FashionStore'}
          </p>

          {/* Product Name */}
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2 min-h-[2.5rem] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {product.name || 'Product'}
          </h3>

          {/* Rating */}
          {product.rating > 0 && (
            <div className="flex items-center space-x-2">
              <StarRating rating={product.rating} size="sm" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                ({product.numReviews || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2 pt-1">
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ₹{product.price?.toLocaleString() || 0}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ₹{product.originalPrice?.toLocaleString()}
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 font-semibold">
                  Save ₹{(product.originalPrice - product.price)?.toLocaleString()}
                </span>
              </>
            )}
          </div>

        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
