import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
      
      // Set default color
      if (response.data.product.colors && response.data.product.colors.length > 0) {
        setSelectedColor(response.data.product.colors[0]);
      }
      
      // Fetch related products
      const relatedResponse = await api.get(
        `/products/category/${response.data.product.category}?limit=4`
      );
      setRelatedProducts(
        relatedResponse.data.products.filter((p) => p._id !== id)
      );
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (!selectedColor) {
      toast.error('Please select a color');
      return;
    }
    // Pass full product data for guest users
    addToCart(product._id, quantity, selectedSize, selectedColor, product);
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select size and color');
      return;
    }
    // Pass full product data for guest users
    addToCart(product._id, quantity, selectedSize, selectedColor, product);
    navigate('/cart');
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      // Pass full product data for guest users
      addToWishlist(product._id, product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Product not found</p>
      </div>
    );
  }

  const discountPercentage = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[selectedImage] || '/placeholder.jpg'}
                alt={product.name}
                className="w-full h-[600px] object-cover rounded-lg"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`flex-shrink-0 w-24 h-24 border-2 rounded ${
                      selectedImage === idx ? 'border-primary' : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{product.brand}</p>
            
            {product.rating > 0 && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span>{product.rating} ({product.numReviews} reviews)</span>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-primary">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
                    <span className="bg-accent text-white px-2 py-1 rounded text-sm font-bold">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Color:</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor?.name === color.name
                          ? 'border-primary ring-2 ring-primary'
                          : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.code }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Size:</h3>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 border-2 rounded ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantity:</h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {product.stock} available in stock
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleWishlistToggle}
                className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 ${
                  isInWishlist(product._id)
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
              </button>

              <button
                onClick={handleAddToCart}
                className="w-full btn-primary py-3"
              >
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-accent text-gray-900 py-3 rounded-lg font-semibold hover:bg-accent-dark"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;

