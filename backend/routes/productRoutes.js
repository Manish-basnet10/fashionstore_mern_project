import express from 'express';
import Product from '../models/Product.js';
import { protect, admin } from '../middleware/auth.js';
import { uploadMultiple } from '../middleware/upload.js';

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products (with optional filters)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 100, page = 1 } = req.query;
    const query = { isActive: true };

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Filter featured products if provided
    if (featured === 'true') {
      query.featured = true;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      count: products.length,
      total,
      products,
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Get product error:', error);
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

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 100, page = 1 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const products = await Product.find({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isActive: true,
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Product.countDocuments({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      isActive: true,
    });

    res.json({
      success: true,
      count: products.length,
      total,
      products,
    });
  } catch (error) {
    console.error('Get category products error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   POST /api/products
// @desc    Create new product (Admin only)
// @access  Private/Admin
router.post('/', protect, admin, uploadMultiple, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      originalPrice,
      category,
      brand,
      colors,
      sizes,
      stock,
      featured,
    } = req.body;

    // Handle images
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(
        (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      );
    }

    // Parse colors and sizes if they are strings
    const parsedColors = typeof colors === 'string' ? JSON.parse(colors) : colors;
    const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;

    const product = await Product.create({
      name,
      description,
      price: parseFloat(price),
      originalPrice: parseFloat(originalPrice),
      category,
      brand,
      images,
      colors: parsedColors,
      sizes: parsedSizes,
      stock: parseInt(stock),
      featured: featured === 'true' || featured === true,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   PUT /api/products/:id
// @desc    Update product (Admin only)
// @access  Private/Admin
router.put('/:id', protect, admin, uploadMultiple, async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const {
      name,
      description,
      price,
      originalPrice,
      category,
      brand,
      colors,
      sizes,
      stock,
      featured,
      images: existingImages,
    } = req.body;

    // Handle new images
    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(
        (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      );
      // Merge with existing images if provided
      product.images = existingImages
        ? [...JSON.parse(existingImages), ...newImages]
        : newImages;
    } else if (existingImages) {
      product.images = JSON.parse(existingImages);
    }

    // Update other fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = parseFloat(price);
    if (originalPrice) product.originalPrice = parseFloat(originalPrice);
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (colors) {
      product.colors =
        typeof colors === 'string' ? JSON.parse(colors) : colors;
    }
    if (sizes) {
      product.sizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
    }
    if (stock !== undefined) product.stock = parseInt(stock);
    if (featured !== undefined)
      product.featured = featured === 'true' || featured === true;

    await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete product (Admin only)
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Soft delete by setting isActive to false
    product.isActive = false;
    await product.save();

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
});

export default router;

