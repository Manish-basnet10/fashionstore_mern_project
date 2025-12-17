import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginPage = () => {
  // ==========================================
  // 🔒 BACKEND LOGIC (100% PRESERVED)
  // ==========================================
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, isAuthenticated, user, token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/home';

  useEffect(() => {
    console.log('🔍 LoginPage - Auth state:', { 
      isAuthenticated, 
      user: user?.email, 
      hasToken: !!token 
    });
  }, [isAuthenticated, user, token]);

  useEffect(() => {
    if (isAuthenticated && user && token) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, token, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success('Login successful');
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 300);
      } else {
        toast.error(result.message || 'Login failed');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('An error occurred during login');
      setLoading(false);
    }
  };

  // ==========================================
  // 🎨 UI SECTION (Left Image, Right Form)
  // ==========================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-4 font-sans">
      
      {/* Main Card Container */}
      <div className="bg-white rounded-[2rem] shadow-xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden min-h-[600px]">

        {/* --- LEFT COLUMN: IMAGE / VISUAL PANEL --- */}
        <div className="w-full md:w-1/2 relative overflow-hidden flex items-end bg-slate-900">
          
          {/* 🚨 NEW IMAGE (Provided by me) */}
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
            alt="Fashion Model"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Gradient Overlay for text readability and style */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-indigo-900/50 to-transparent"></div>
          
          {/* Content Overlay */}
          <div className="relative z-10 p-12 text-white">
            <h2 className="text-4xl font-extrabold leading-tight mb-4">
              Redefine <br />Your Style.
            </h2>
            <p className="text-indigo-100 text-lg max-w-sm opacity-90 font-light">
              Discover the latest trends and curate your perfect wardrobe with FashionStore.
            </p>
          </div>
        </div>

        {/* --- RIGHT COLUMN: LOGIN FORM --- */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
          
          <div className="w-full max-w-md mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-10">
              <div className="bg-slate-900 text-white p-2 rounded-lg">
                <FaShoppingBag size={18} />
              </div>
              <span className="text-xl font-bold tracking-wide text-slate-900">FashionStore</span>
            </div>

            {/* Headlines */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
              <p className="text-slate-500">Sign in to continue shopping.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 placeholder-gray-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200 transition-all"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-slate-900 placeholder-gray-400 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-200 transition-all pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg shadow-slate-200 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    Sign In <FaArrowRight size={14} />
                  </>
                )}
              </button>
            </form>

            {/* Social Divider */}
            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <span className="relative bg-white px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Or continue with
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <FcGoogle size={20} />
                <span className="text-sm font-semibold text-slate-700">Google</span>
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <FaFacebook size={20} className="text-[#1877F2]" />
                <span className="text-sm font-semibold text-slate-700">Facebook</span>
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-bold text-slate-900 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;