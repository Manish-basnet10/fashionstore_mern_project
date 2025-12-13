import express from 'express';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Validation
    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Please provide shipping address and payment method',
      });
    }

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      'items.product'
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    // Calculate prices
    const itemsPrice = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const shippingPrice = itemsPrice > 1000 ? 0 : 50; // Free shipping above 1000
    const taxPrice = itemsPrice * 0.18; // 18% tax
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    // Create order items
    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      size: item.size,
      color: item.color,
      price: item.product.price,
      image: item.product.images[0] || '',
    }));

    // Create order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      paymentResult: {
        paymentMethod,
        status: paymentMethod === 'COD' ? 'Pending' : 'Completed',
      },
    });

    // Clear cart after order creation
    cart.items = [];
    await cart.save();

    // Populate order
    await order.populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   GET /api/orders
// @desc    Get user's orders
// @access  Private
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('orderItems.product')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'orderItems.product'
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Check if order belongs to user (unless admin)
    if (
      order.user.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Get order error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

export default router;

