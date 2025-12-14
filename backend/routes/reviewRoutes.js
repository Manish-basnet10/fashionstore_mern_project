import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/products/:id/reviews
// @desc    Add a review to a product
// @access  Private
router.post('/:id/reviews', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;

    // Validate input
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both rating and comment',
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5',
      });
    }

    // Find product
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user already reviewed this product
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product',
      });
    }

    // Add review
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment: comment.trim(),
      createdAt: new Date(),
    };

    product.reviews.push(review);

    // Update rating and numReviews
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      product,
    });
  } catch (error) {
    console.error('Add review error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   GET /api/products/:id/reviews
// @desc    Get all reviews for a product
// @access  Public
router.get('/:id/reviews', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select('reviews rating numReviews');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Populate user details for each review
    const reviewsWithUser = await Product.populate(product, {
      path: 'reviews.user',
      select: 'name email',
    });

    res.json({
      success: true,
      reviews: reviewsWithUser.reviews,
      rating: reviewsWithUser.rating,
      numReviews: reviewsWithUser.numReviews,
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   DELETE /api/products/:productId/reviews/:reviewId
// @desc    Delete a review (Admin only)
// @access  Private/Admin
router.delete('/:productId/reviews/:reviewId', protect, admin, async (req, res) => {
  try {
    const { productId, reviewId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Find and remove review
    const review = product.reviews.id(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    review.remove();

    // Update rating and numReviews
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, item) => item.rating + acc, 0) /
          product.reviews.length
        : 0;

    await product.save();

    res.json({
      success: true,
      message: 'Review deleted successfully',
      product,
    });
  } catch (error) {
    console.error('Delete review error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Product or review not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

export default router;
