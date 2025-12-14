import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, user } = useAuth(); // ADD user here

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please login to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please add a comment');
      return;
    }

    try {
      setSubmitting(true);
      console.log('Submitting review for product:', productId);
      console.log('User token exists:', !!localStorage.getItem('token'));
      
      const response = await api.post(`/products/${productId}/reviews`, {
        rating,
        comment: comment.trim()
      });

      console.log('Review submitted successfully:', response.data);
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
      if (onReviewAdded) {
        onReviewAdded(response.data);
      }
    } catch (error) {
      console.error('Review submission failed:', error);
      console.error('Error status:', error.response?.status);
      console.error('Error data:', error.response?.data);
      
      let message = 'Failed to submit review';
      if (error.response?.status === 400) {
        message = error.response?.data?.message || 'You have already reviewed this product';
      } else if (error.response?.status === 401) {
        message = 'Please login again';
      } else if (error.response?.status === 404) {
        message = 'Product not found';
      }
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Check if user already reviewed this product (optional - you can add this)
  // You would need to fetch user's reviews and check

  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-gray-50 rounded-xl text-center">
        <p className="text-gray-600 mb-3">Login to leave a review</p>
        <a 
          href="/login" 
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Login
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
      
      {/* Star Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating *
        </label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="text-3xl focus:outline-none transition-transform hover:scale-110 p-1"
              aria-label={`Rate ${star} stars`}
            >
              <span className={`${
                star <= (hoverRating || rating) 
                  ? 'text-yellow-400' 
                  : 'text-gray-300'
              }`}>
                ★
              </span>
            </button>
          ))}
          <span className="ml-3 text-base font-medium text-gray-700">
            {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select rating'}
          </span>
        </div>
      </div>

      {/* Comment */}
      <div className="mb-6">
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
          Your Review *
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
          placeholder="Share your experience with this product..."
          maxLength="500"
          required
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {comment.length}/500 characters
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting || rating === 0 || !comment.trim()}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {submitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </span>
        ) : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;