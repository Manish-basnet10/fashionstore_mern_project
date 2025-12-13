import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { getItem, setItem, removeItem } from '../utils/storage';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Update derived states whenever user or token changes
  useEffect(() => {
    const auth = !!(token && user);
    setIsAuthenticated(auth);
    setIsAdmin(user?.role === 'admin');
  }, [token, user]);

  // Check if user is authenticated on mount
  const initAuth = useCallback(async () => {
    try {
      const savedToken = getItem('token');
      const savedUser = getItem('user');

      console.log('🔍 initAuth - savedToken:', !!savedToken, 'savedUser:', !!savedUser);

      if (savedToken && savedUser) {
        // Set token header for API calls
        api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
        
        // Verify token by fetching profile
        try {
          console.log('🔍 Verifying token...');
          const response = await api.get('/auth/profile');
          if (response.data && response.data.user) {
            const verifiedUser = response.data.user;
            console.log('✅ Token verified, user:', verifiedUser.email);
            setUser(verifiedUser);
            setToken(savedToken);
            setItem('user', verifiedUser);
          } else {
            throw new Error('Invalid user data');
          }
        } catch (error) {
          console.error('❌ Token verification failed:', error.message);
          removeItem('token');
          removeItem('user');
          delete api.defaults.headers.common['Authorization'];
          setToken(null);
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setLoading(false);
      console.log('🔍 Auth initialization complete');
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Register function
  const register = async (userData) => {
    try {
      console.log('🔍 Registering user:', userData.email);
      const response = await api.post('/auth/register', userData);
      const { token: newToken, user: newUser } = response.data;
      
      // Set token header
      api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      setToken(newToken);
      setUser(newUser);
      setItem('token', newToken);
      setItem('user', newUser);
      
      console.log('✅ Registration successful:', newUser.email);
      return { success: true };
    } catch (error) {
      console.error('❌ Registration failed:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  // Login function - FIXED with synchronous updates
  const login = async (email, password) => {
    try {
      console.log('🔍 Attempting login:', email);
      const response = await api.post('/auth/login', { email, password });
      
      if (response.data && response.data.token && response.data.user) {
        const { token: newToken, user: newUser } = response.data;
        
        console.log('✅ Login API success, user:', newUser.email, 'role:', newUser.role);
        
        // Set token header FIRST
        api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        // Save to localStorage FIRST (synchronous)
        setItem('token', newToken);
        setItem('user', newUser);
        
        // Then update React state
        setToken(newToken);
        setUser(newUser);
        
        // Force immediate update
        setTimeout(() => {
          console.log('🔄 State update forced');
        }, 0);
        
        console.log('✅ Login process complete');
        return { 
          success: true,
          token: newToken,
          user: newUser
        };
      } else {
        console.error('❌ Invalid response from server');
        return {
          success: false,
          message: 'Invalid response from server',
        };
      }
    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed',
      };
    }
  };

  // Logout function
  const logout = () => {
    console.log('🔍 Logging out');
    setToken(null);
    setUser(null);
    removeItem('token');
    removeItem('user');
    delete api.defaults.headers.common['Authorization'];
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await api.put('/auth/profile', userData);
      const updatedUser = response.data.user;
      setUser(updatedUser);
      setItem('user', updatedUser);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed',
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};