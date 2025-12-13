import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const { getCartCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  // Dark mode toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary font-semibold' : '';
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-lg sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary">FASHION STORE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
            <Link to="/" className={`hover:text-primary transition-colors ${isActive('/')}`}>
              HOME
            </Link>
            <Link to="/men" className={`hover:text-primary transition-colors ${isActive('/men')}`}>
              MEN
            </Link>
            <Link to="/women" className={`hover:text-primary transition-colors ${isActive('/women')}`}>
              WOMEN
            </Link>
            <Link to="/kids" className={`hover:text-primary transition-colors ${isActive('/kids')}`}>
              KIDS
            </Link>
            <Link to="/about" className={`hover:text-primary transition-colors ${isActive('/about')}`}>
              ABOUT
            </Link>
            <Link to="/contact" className={`hover:text-primary transition-colors ${isActive('/contact')}`}>
              CONTACT
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:block flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="relative">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {getWishlistCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300 hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-300 hover:text-primary">
              {isDark ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden md:block">{user?.name}</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:text-primary">
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">HOME</Link>
              <Link to="/men" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">MEN</Link>
              <Link to="/women" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">WOMEN</Link>
              <Link to="/kids" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">KIDS</Link>
              <Link to="/about" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">ABOUT</Link>
              <Link to="/contact" className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">CONTACT</Link>
              <form onSubmit={handleSearch} className="px-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

