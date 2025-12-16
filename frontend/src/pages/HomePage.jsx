import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { FaShoppingBag, FaArrowRight, FaStar } from 'react-icons/fa'; // Make sure react-icons is installed

const HomePage = () => {
  // ==========================================
  // 🔒 BACKEND LOGIC (PRESERVED)
  // ==========================================
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const featuredProductsRef = useRef(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // FIX #1: Increased limit from 8 to 12 to show more products
      const response = await api.get('/products?featured=true&limit=12');
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToFeaturedProducts = () => {
    featuredProductsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // ==========================================
  // 📸 IMAGE CONFIGURATION
  // ==========================================
  // Paste your image links inside the quotes below
  const HERO_IMAGE = "/home_logo.png";
  
  const CATEGORY_IMAGES = {
    men: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2148&auto=format&fit=crop",   // Men's Image
    women: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1974&auto=format&fit=crop", // Women's Image
    kids: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1972&auto=format&fit=crop"    // Kids' Image
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      {/* ==================== 1. ENHANCED HERO SECTION ==================== */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-600 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-pink-600 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* LEFT: Text & Buttons */}
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-4">
                <span className="text-sm font-semibold tracking-wide uppercase text-indigo-200">✨ New Collection 2024</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Fashion Store
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Discover premium fashion that blends timeless style with modern comfort. Elevate your wardrobe today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link 
                  to="/men" 
                  className="px-8 py-4 bg-white text-indigo-900 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  <FaShoppingBag /> Shop Now
                </Link>
                <button 
                  onClick={scrollToFeaturedProducts}
                  className="px-8 py-4 bg-transparent border-2 border-white/30 hover:bg-white/10 text-white rounded-full font-semibold text-lg backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  View Products <FaArrowRight />
                </button>
              </div>
            </div>

            {/* RIGHT: Rounded Visual (The "Pizza" Style) */}
            <div className="hidden lg:flex justify-center items-center relative">
              {/* Circular Container */}
              <div className="w-[500px] h-[500px] bg-white/5 border border-white/10 rounded-full flex items-center justify-center relative shadow-2xl shadow-black/50 backdrop-blur-sm p-4">
                
                {/* 🚨 PLACE YOUR HERO IMAGE HERE */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-inner relative z-10">
                  <img 
                    src={HERO_IMAGE} 
                    alt="Hero Fashion" 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Floating Elements (Badges) */}
                {/* Badge 1: Discount */}
                <div className="absolute top-10 right-0 z-20 animate-bounce-slow">
                  <div className="bg-red-500 text-white w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-indigo-900">
                    <span className="text-xl font-bold leading-none">30%</span>
                    <span className="text-xs uppercase font-bold">OFF</span>
                  </div>
                </div>

                {/* Badge 2: Rating */}
                <div className="absolute bottom-10 left-0 z-20 animate-pulse">
                  <div className="bg-white text-indigo-900 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 border border-gray-100">
                    <div className="bg-yellow-400 text-white p-1.5 rounded-full text-xs">
                      <FaStar />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Top Rated</p>
                      <p className="text-sm font-bold">Premium Quality</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Blobs */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-500/50 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-pink-500/50 rounded-full blur-xl animate-pulse delay-75"></div>
              
              </div>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToFeaturedProducts}>
          <svg className="w-6 h-6 text-white/50 hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ==================== 2. CATEGORY SECTION ==================== */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Shop by Category
            </h2>
            <div className="h-1 w-24 bg-indigo-600 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Curated collections for every style and occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* MEN */}
            <Link to="/men" className="group relative h-[500px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src={CATEGORY_IMAGES.men} // Using variable from top
                alt="Men's Fashion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-2">Men</h3>
                <div className="h-1 w-12 bg-white rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2">
                  Explore Collection <FaArrowRight />
                </p>
              </div>
            </Link>
            
            {/* WOMEN */}
            <Link to="/women" className="group relative h-[500px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 md:-translate-y-8">
              <img
                src={CATEGORY_IMAGES.women}
                alt="Women's Fashion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-2">Women</h3>
                <div className="h-1 w-12 bg-white rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2">
                  Explore Collection <FaArrowRight />
                </p>
              </div>
            </Link>
            
            {/* KIDS */}
            <Link to="/kids" className="group relative h-[500px] rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
              <img
                src={CATEGORY_IMAGES.kids}
                alt="Kids Fashion"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-2">Kids</h3>
                <div className="h-1 w-12 bg-white rounded-full mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 flex items-center gap-2">
                  Explore Collection <FaArrowRight />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== 3. FEATURED PRODUCTS ==================== */}
      <section ref={featuredProductsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-500 text-lg">
                Handpicked items just for you
              </p>
            </div>
            <Link 
              to="/products?featured=true" 
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-700 rounded-full font-semibold hover:bg-indigo-100 transition-colors"
            >
              View All <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 aspect-[3/4] rounded-2xl mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link 
              to="/products?featured=true" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors"
            >
              View All Products <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;