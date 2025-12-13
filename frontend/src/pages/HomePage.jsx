import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get('/products?featured=true&limit=8');
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to Fashion Store</h1>
          <p className="text-xl md:text-2xl mb-8">Discover the latest trends in fashion</p>
          <Link to="/men" className="btn-primary bg-white text-primary hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link to="/men" className="relative group overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"
                alt="Men"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">MEN</h2>
              </div>
            </Link>
            <Link to="/women" className="relative group overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800"
                alt="Women"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">WOMEN</h2>
              </div>
            </Link>
            <Link to="/kids" className="relative group overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800"
                alt="Kids"
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <h2 className="text-4xl font-bold text-white">KIDS</h2>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

