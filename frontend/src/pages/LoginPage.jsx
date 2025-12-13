import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, user, token } = useAuth(); // Get all auth states
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state, or default to /home
  const from = location.state?.from || '/home';

  // Debug: Check auth state
  useEffect(() => {
    console.log('🔍 LoginPage - Auth state:', { 
      isAuthenticated, 
      user: user?.email, 
      hasToken: !!token 
    });
  }, [isAuthenticated, user, token]);

  // If already authenticated, redirect - BUT with a condition
  useEffect(() => {
    // Only redirect if we have BOTH user and token
    if (isAuthenticated && user && token) {
      console.log('✅ Already authenticated, redirecting to:', from);
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, token, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('🔍 LoginPage: Attempting login with:', email);

    try {
      const result = await login(email, password);
      
      console.log('🔍 LoginPage: Login result:', result);
      
      if (result.success) {
        toast.success('Login successful');
        
        // Check localStorage immediately
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        console.log('🔍 LoginPage: localStorage - token:', !!savedToken, 'user:', !!savedUser);
        
        // Give AuthContext time to update its state (300ms should be enough)
        setTimeout(() => {
          console.log('🔍 LoginPage: Timeout - Checking auth state before redirect');
          console.log('🔍 LoginPage: Current auth - isAuthenticated:', isAuthenticated);
          
          // Force a small delay and then navigate
          // Using navigate instead of window.location to keep React Router state
          navigate(from, { replace: true });
        }, 300);
        
      } else {
        toast.error(result.message || 'Login failed');
        setLoading(false);
      }
    } catch (error) {
      console.error('❌ LoginPage: Error:', error);
      toast.error('An error occurred during login');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Register
            </Link>
          </p>
          <div className="mt-6 pt-6 border-t">
            <p className="text-xs text-center text-gray-500">
              Demo Credentials:<br />
              Admin: admin@fashionstore.com / admin123<br />
              User: user@fashionstore.com / user123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;