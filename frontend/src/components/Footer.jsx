import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-300 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Main Footer Grid - 5 columns (including social media) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          
          {/* Column 1: SHOP */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">SHOP</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/men" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/women" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/kids" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Kids
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: QUICK LINKS */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cart" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: FOLLOW US - SOCIAL MEDIA */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">FOLLOW US</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Stay connected with latest fashion trends
            </p>
            
            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3 mb-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/fashionstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
                title="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Facebook */}
              <a
                href="https://facebook.com/fashionstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* Twitter/X */}
              <a
                href="https://twitter.com/fashionstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Twitter/X"
                title="Twitter/X"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a
                href="https://youtube.com/@fashionstore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white text-lg transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="YouTube"
                title="YouTube"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            
            {/* Special Offer */}
            <div className="mt-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                🎉 Get 10% off your first order!
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Use code: WELCOME10
              </p>
            </div>
          </div>

          {/* Column 5: CONTACT */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4">CONTACT US</h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                📧 support@fashionstore.com
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                📞 +91 98765 43210
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                ⏰ 9:00 AM - 9:00 PM (Mon-Sun)
              </p>
            </div>
          </div>

        </div>

        {/* Brand Logo & Payment Section */}
<div className="border-t border-gray-200 dark:border-gray-800 pt-6 mb-6">
  <div className="flex flex-col lg:flex-row items-center justify-between">
    
    {/* Brand Logo with Description - Left Side */}
    <div className="text-center lg:text-left mb-6 lg:mb-0 max-w-md">
      <Link to="/home" className="text-3xl font-bold text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
        FashionStore
      </Link>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 mb-2">Trendy Fashion at Your Fingertips</p>
      <p className="text-gray-500 dark:text-gray-500 text-xs">
        Your premier destination for contemporary fashion. Discover the latest trends 
        in men's, women's, and kids clothing with premium quality and exceptional style.
      </p>
    </div>

    {/* We Accept - Moved slightly to the right */}
    <div className="flex flex-col items-center lg:ml-auto lg:mr-12">
      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4">We Accept</h4>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center shadow-md hover:shadow-lg transition-shadow">
          VISA
        </div>
        <div className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
          <span className="text-lg"></span> Pay
        </div>
        <div className="bg-gray-800 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow">
          <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">G</span> Pay
        </div>
        <div className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold text-sm flex items-center shadow-md hover:shadow-lg transition-shadow">
          PayPal
        </div>
      </div>
    </div>

  </div>
</div>
        {/* Bottom Copyright Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © {currentYear} FashionStore. All rights reserved.
            </div>

            {/* Policy Links */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/returns" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors">
                Returns Policy
              </Link>
            </div>

            {/* Made in India */}
            <div className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
              <span className="text-lg">🇮🇳</span> Made in India
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;