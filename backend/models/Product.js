import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      required: [true, 'Please provide original price'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: ['Men', 'Women', 'Kids'],
    },
    brand: {
      type: String,
      required: [true, 'Please provide a brand'],
    },
    images: [
      {
        type: String, // URL or path to image
        required: true,
      },
    ],
    colors: [
      {
        name: { type: String, required: true },
        code: { type: String, required: true }, // Hex color code
      },
    ],
    sizes: [
      {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
      },
    ],
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
          trim: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });

const Product = mongoose.model('Product', productSchema);
export default Product;

