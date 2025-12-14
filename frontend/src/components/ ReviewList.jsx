import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast'; // ADD THIS IMPORT

const ReviewList = ({ productId, onReviewDeleted }) => { // ADD onReviewDeleted prop
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      console.log('Fetching reviews for product:', productId); // DEBUG
      const response = await api.get(`/products/${productId}/reviews`);
      console.log('Reviews fetched:', response.data); // DEBUG
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      console.log('Deleting review:', reviewId); // DEBUG
      
      // TRY DIFFERENT PATHS - Test which one works
      let deleteSuccessful = false;
      let errorMessage = '';
      
      try {
        // Try path 1: What your reviewRoutes.js actually uses
        await api.delete(`/reviews/${reviewId}`);
        deleteSuccessful = true;
      } catch (err1) {
        errorMessage = `Path 1 failed: ${err1.message}`;
        console.log('Path 1 failed, trying path 2...');
        
        try {
          // Try path 2: Under products route
          await api.delete(`/products/reviews/${reviewId}`);
          deleteSuccessful = true;
        } catch (err2) {
          errorMessage += ` | Path 2 failed: ${err2.message}`;
          console.log('Path 2 failed, trying path 3...');
          
          try {
            // Try path 3: What might actually be correct
            await api.delete(`/api/reviews/${reviewId}`);
            deleteSuccessful = true;
          } catch (err3) {
            errorMessage += ` | Path 3 failed: ${err3.message}`;
            console.log('All paths failed');
          }
        }
      }

      if (deleteSuccessful) {
        setReviews(reviews.filter(review => review._id !== reviewId));
        toast.success('Review deleted successfully');
        
        // Call callback if provided
        if (onReviewDeleted) {
          onReviewDeleted();
        }
      } else {
        toast.error(`Failed to delete review: ${errorMessage}`);
        console.error('All delete attempts failed');
      }
      
    } catch (error) {
      console.error('Failed to delete review:', error);
      console.error('Error details:', error.response?.data);
      toast.error('Failed to delete review');
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Recent';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-100 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">
          Customer Reviews ({reviews.length})
        </h3>
        <button
          onClick={fetchReviews}
          className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>
      
      {reviews.map((review) => (
        <div key={review._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold mr-3">
                {review.user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h4 className="font-medium text-gray-900">
                  {review.user?.name || 'Anonymous'}
                </h4>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-lg ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {formatDate(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Delete button for review owner or admin */}
            {(user?._id === review.user?._id || user?.role === 'admin') && (
              <button
                onClick={() => handleDeleteReview(review._id)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded"
                aria-label="Delete review"
                title="Delete review"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            {review.comment}
          </p>
          
          {/* Show review ID for debugging */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 text-xs text-gray-400">
              Review ID: {review._id}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;