import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Product from './models/Product.js';

dotenv.config();

// Sample products data
const products = [
  {
    name: 'Men Classic Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt perfect for everyday wear. Available in multiple colors and sizes.',
    price: 499,
    originalPrice: 799,
    category: 'Men',
    brand: 'FashionStore',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'White', code: '#FFFFFF' },
      { name: 'Navy Blue', code: '#000080' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 50,
    rating: 4.5,
    numReviews: 25,
    featured: true,
  },
  {
    name: 'Women Floral Summer Dress',
    description: 'Beautiful floral print dress perfect for summer. Lightweight and comfortable fabric.',
    price: 1299,
    originalPrice: 1999,
    category: 'Women',
    brand: 'FashionStore',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500',
    ],
    colors: [
      { name: 'Pink Floral', code: '#FF69B4' },
      { name: 'Blue Floral', code: '#4169E1' },
      { name: 'Yellow Floral', code: '#FFD700' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 30,
    rating: 4.8,
    numReviews: 42,
    featured: true,
  },
  {
    name: 'Kids Colorful Hoodie',
    description: 'Warm and cozy hoodie for kids. Soft fabric and vibrant colors.',
    price: 799,
    originalPrice: 1199,
    category: 'Kids',
    brand: 'FashionStore',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500',
      'https://images.unsplash.com/photo-1559507659-9c0b3c7b8e67?w=500',
    ],
    colors: [
      { name: 'Red', code: '#FF0000' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Green', code: '#008000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    rating: 4.6,
    numReviews: 18,
    featured: true,
  },
  {
    name: 'Men Denim Jeans',
    description: 'Classic fit denim jeans. Durable and stylish for any occasion.',
    price: 1499,
    originalPrice: 2499,
    category: 'Men',
    brand: 'FashionStore',
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=500',
    ],
    colors: [
      { name: 'Dark Blue', code: '#00008B' },
      { name: 'Light Blue', code: '#87CEEB' },
      { name: 'Black', code: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 35,
    rating: 4.7,
    numReviews: 58,
    featured: false,
  },
  {
    name: 'Women High-Waisted Leggings',
    description: 'Comfortable and stretchy leggings perfect for workouts or casual wear.',
    price: 699,
    originalPrice: 999,
    category: 'Women',
    brand: 'FashionStore',
    images: [
      'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500',
      'https://images.unsplash.com/photo-1591047135029-75364d8c03a3?w=500',
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Gray', code: '#808080' },
      { name: 'Navy', code: '#000080' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 45,
    rating: 4.4,
    numReviews: 33,
    featured: false,
  },
  {
    name: 'Kids Cartoon T-Shirt',
    description: 'Fun cartoon printed t-shirt that kids will love. Soft cotton material.',
    price: 399,
    originalPrice: 599,
    category: 'Kids',
    brand: 'FashionStore',
    images: [
      'https://images.unsplash.com/photo-1556449895-a33c9b0a4f37?w=500',
      'https://images.unsplash.com/photo-1580555285790-626d20adb8e5?w=500',
    ],
    colors: [
      { name: 'Yellow', code: '#FFFF00' },
      { name: 'Blue', code: '#0000FF' },
      { name: 'Red', code: '#FF0000' },
    ],
    sizes: ['S', 'M', 'L'],
    stock: 55,
    rating: 4.9,
    numReviews: 27,
    featured: false,
  },
  {
    name: 'Women Casual Blazer',
    description: 'Stylish blazer that can be dressed up or down. Perfect for business casual.',
    price: 1999,
    originalPrice: 2999,
    category: 'Women',
    brand: 'FashionStore',
    images: [
      'https://images.unsplash.com/photo-1594938298606-c0c5e8a1a977?w=500',
      'https://images.unsplash.com/photo-1485968579580-b6d5abe5de8e?w=500',
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Navy', code: '#000080' },
      { name: 'Beige', code: '#F5F5DC' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 22,
    rating: 4.6,
    numReviews: 36,
    featured: true,
  },
  {
    name: 'Kids Denim Shorts',
    description: 'Comfortable denim shorts for kids. Perfect for summer play.',
    price: 599,
    originalPrice: 899,
    category: 'Kids',
    brand: 'FashionStore',
    images: [
      'https://images.unsplash.com/photo-1551717743-49959800b1f6?w=500',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
    ],
    colors: [
      { name: 'Blue', code: '#0000FF' },
      { name: 'Light Blue', code: '#87CEEB' },
    ],
    sizes: ['S', 'M', 'L'],
    stock: 38,
    rating: 4.7,
    numReviews: 19,
    featured: false,
  },
  {
    name: 'Men Athletic Sneakers',
    description: 'Comfortable running shoes with excellent cushioning and support.',
    price: 2499,
    originalPrice: 3999,
    category: 'Men',
    brand: 'FashionStore',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
    ],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'White', code: '#FFFFFF' },
      { name: 'Gray', code: '#808080' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 20,
    rating: 4.8,
    numReviews: 67,
    featured: true,
  },
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/fashionstore'
    );
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@fashionstore.com',
      password: 'admin123', // Will be hashed by pre-save hook
      role: 'admin',
      phone: '+1234567890',
    });
    console.log('👑 Created admin user:', adminUser.email);

    // Create sample regular user
    const regularUser = await User.create({
      name: 'John Doe',
      email: 'user@fashionstore.com',
      password: 'user123',
      role: 'user',
      phone: '+1234567891',
    });
    console.log('👤 Created regular user:', regularUser.email);

    // Create products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Login Credentials:');
    console.log('Admin - Email: admin@fashionstore.com, Password: admin123');
    console.log('User - Email: user@fashionstore.com, Password: user123');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();

