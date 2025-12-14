import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import StarRating from '../components/StarRating';
import ImageSlider from '../components/ImageSlider';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
      
      // Set default color
      if (response.data.product.colors && response.data.product.colors.length > 0) {
        setSelectedColor(response.data.product.colors[0]);
      }
      
      // Fetch related products
      const relatedResponse = await api.get(
        `/products/category/${response.data.product.category}?limit=4`
      );
      setRelatedProducts(
        relatedResponse.data.products.filter((p) => p._id !== id)
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      setReviewLoading(true);
      const response = await api.get(`/products/${id}/reviews`);
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setReviewLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!reviewRating) {
      toast.error('Please select a rating');
      return;
    }
    
    if (!reviewComment.trim()) {
      toast.error('Please write a comment');
      return;
    }

    try {
      setSubmittingReview(true);
      const response = await api.post(`/products/${id}/reviews`, {
        rating: reviewRating,
        comment: reviewComment.trim(),
      });
      
      toast.success('Review added successfully! Thank you for your feedback.');
      setReviewRating(0);
      setReviewComment('');
      
      // Update product with new rating
      setProduct(response.data.product);
      
      // Refresh reviews
      await fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(
        error.response?.data?.message || 'Failed to submit review'
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await api.delete(`/products/${id}/reviews/${reviewId}`);
      toast.success('Review deleted successfully');
      
      // Update product with new rating
      setProduct(response.data.product);
      
      // Refresh reviews
      await fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const hasUserReviewed = () => {
    if (!isAuthenticated || !user) return false;
    return reviews.some((review) => {
      const reviewUserId = review.user?._id || review.user;
      const currentUserId = user._id || user;
      return reviewUserId?.toString() === currentUserId?.toString();
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    // Pass full product data for guest users
    addToCart(product._id, quantity, selectedSize, selectedColor, product);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }
    // Pass full product data for guest users
    addToCart(product._id, quantity, selectedSize, selectedColor, product);
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      // Pass full product data for guest users
      addToWishlist(product._id, product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  const discountPercentage = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Slider */}
          <div>
            <ImageSlider images={product.images || []} productName={product.name} />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{product.brand}</p>
            
            <div className="flex items-center space-x-3 mb-4">
              <StarRating rating={product.rating || 0} size="md" />
              <span className="text-gray-700 dark:text-gray-300">
                {product.rating > 0 ? (
                  <>
                    <span className="font-semibold">{product.rating.toFixed(1)}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {' '}({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">No reviews yet</span>
                )}
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                    <span className="bg-accent text-white px-2 py-1 rounded text-sm font-bold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Color:</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor?.name === color.name
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Size:</h3>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 border-2 rounded ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity:</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {product.stock} available in stock
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleWishlistToggle}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
                  isInWishlist(product._id)
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary py-3"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-accent text-gray-900 py-3 rounded-lg font-semibold hover:bg-accent-dark"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

          {/* Write Review Form - Only for authenticated users who haven't reviewed */}
          {isAuthenticated && !hasUserReviewed() && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
              <form onSubmit={handleSubmitReview}>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <StarRating
                    rating={reviewRating}
                    onRatingChange={setReviewRating}
                    interactive={true}
                    size="md"
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="review-comment"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="review-comment"
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-gray-100"
                    placeholder="Share your experience..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingReview || !reviewRating || !reviewComment.trim()}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}

          {isAuthenticated && hasUserReviewed() && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-200">
                You have already reviewed this product.
              </p>
            </div>
          )}

          {!isAuthenticated && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                Please{' '}
                <button
                  onClick={() => navigate('/login', { state: { from: `/product/${id}` } })}
                  className="text-primary hover:underline font-semibold"
                >
                  login
                </button>
                {' '}to write a review.
              </p>
            </div>
          )}

          {/* Reviews List */}
          {reviewLoading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : reviews.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {reviews.map((review) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onDelete={handleDeleteReview}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <p className="text-sm">No reviews yet. Be the first to review this product!</p>
            </div>
          )}
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;

