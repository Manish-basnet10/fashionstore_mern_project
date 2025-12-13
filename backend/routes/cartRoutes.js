import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product'
    );

    if (!cart) {
      // Create empty cart if it doesn't exist
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    res.json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   POST /api/cart
// @desc    Add item to cart or update quantity
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;

    // Validation
    if (!productId || !quantity || !size || !color) {
      return res.status(400).json({
        success: false,
        message: 'Please provide productId, quantity, size, and color',
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

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    // Check if item already exists in cart with same size and color
    const existingItemIndex = cart.items.findIndex(
      (item) =>
        item.product.toString() === productId &&
        item.size === size &&
        item.color.name === color.name
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += parseInt(quantity);
    } else {
      // Add new item
      cart.items.push({
        product: productId,
        quantity: parseInt(quantity),
        size,
        color,
      });
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Item added to cart',
      cart,
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const item = cart.items.id(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found',
      });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      cart.items.pull(req.params.id);
    } else {
      item.quantity = parseInt(quantity);
    }

    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Cart updated',
      cart,
    });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items.pull(req.params.id);
    await cart.save();
    await cart.populate('items.product');

    res.json({
      success: true,
      message: 'Item removed from cart',
      cart,
    });
  } catch (error) {
    console.error('Delete cart item error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Private
router.delete('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared',
      cart,
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

export default router;

