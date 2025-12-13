import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// @route   GET /api/search?q=query
// @desc    Search products by name, brand, or category
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.json({
        success: true,
        count: 0,
        products: [],
      });
    }

    // Search in name, brand, category, and description
    const searchRegex = new RegExp(q, 'i'); // Case-insensitive search

    const products = await Product.find({
      isActive: true,
      $or: [
        { name: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { description: searchRegex },
      ],
    }).limit(50);

    res.json({
      success: true,
      count: products.length,
      query: q,
      products,
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

export default router;

