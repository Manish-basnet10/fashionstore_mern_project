import express from 'express';
import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get('/', async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate(
      'items.product'
    );

    if (!wishlist) {
      // Create empty wishlist if it doesn't exist
      wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    }

    res.json({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   POST /api/wishlist
// @desc    Add product to wishlist
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide productId',
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Find or create wishlist
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, items: [] });
    }

    // Check if product already in wishlist
    const existingItem = wishlist.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: 'Product already in wishlist',
      });
    }

    // Add product to wishlist
    wishlist.items.push({ product: productId });
    await wishlist.save();
    await wishlist.populate('items.product');

    res.json({
      success: true,
      message: 'Product added to wishlist',
      wishlist,
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   DELETE /api/wishlist/:id
// @desc    Remove product from wishlist
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found',
      });
    }

    // Remove item by product ID
    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== req.params.id
    );

    await wishlist.save();
    await wishlist.populate('items.product');

    res.json({
      success: true,
      message: 'Product removed from wishlist',
      wishlist,
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

export default router;

