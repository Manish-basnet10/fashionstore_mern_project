import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { getItem, setItem } from '../utils/storage';
import toast from 'react-hot-toast';

const WishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch wishlist from API
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await api.get('/wishlist');
      setWishlist(response.data.wishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load wishlist on mount and when auth changes
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        if (isAuthenticated) {
          await fetchWishlist();
        } else {
          // Load from localStorage for guest users
          const savedWishlist = getItem('wishlist');
          if (savedWishlist && savedWishlist.items && savedWishlist.items.length > 0) {
            // Only try to fetch if items exist and might need data
            const itemsWithData = await Promise.allSettled(
              savedWishlist.items.map(async (item) => {
                // If product only has _id, try to fetch full product data
                if (item.product && item.product._id && !item.product.name) {
                  try {
                    const response = await api.get(`/products/${item.product._id}`);
                    return { ...item, product: response.data.product };
                  } catch (error) {
                    // Silently fail - return original item
                    return item;
                  }
                }
                return item;
              })
            );
            
            // Extract successful results, keep failed ones as-is
            const processedItems = itemsWithData.map((result) => 
              result.status === 'fulfilled' ? result.value : savedWishlist.items[itemsWithData.indexOf(result)]
            );
            
            setWishlist({ items: processedItems });
            // Only update localStorage if we got new data
            if (processedItems.some((item, idx) => item.product?.name && !savedWishlist.items[idx]?.product?.name)) {
              setItem('wishlist', { items: processedItems });
            }
          } else {
            setWishlist({ items: [] });
          }
        }
      } catch (error) {
        console.error('Error loading wishlist:', error);
        // Fallback to empty wishlist on error
        setWishlist({ items: [] });
      }
    };
    
    loadWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Add item to wishlist
  const addToWishlist = async (productId, productData = null) => {
    if (!isAuthenticated) {
      // Save to localStorage for guest users
      const savedWishlist = getItem('wishlist') || { items: [] };
      
      // Check if already exists
      if (savedWishlist.items.find((item) => item.product?._id === productId)) {
        toast.error('Already in wishlist');
        return;
      }
      
      // Fetch product data if not provided
      let product = productData;
      if (!product) {
        try {
          const response = await api.get(`/products/${productId}`);
          product = response.data.product;
        } catch (error) {
          console.error('Error fetching product:', error);
          toast.error('Failed to load product details');
          return;
        }
      }
      
      const newItem = {
        _id: `guest_${Date.now()}_${Math.random()}`,
        product: product || { _id: productId },
        addedAt: new Date().toISOString(),
      };
      
      savedWishlist.items.push(newItem);
      setWishlist(savedWishlist);
      setItem('wishlist', savedWishlist);
      toast.success('Added to wishlist');
      return;
    }

    try {
      const response = await api.post('/wishlist', { productId });
      setWishlist(response.data.wishlist);
      toast.success('Added to wishlist');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (productId) => {
    if (!isAuthenticated) {
      const savedWishlist = getItem('wishlist') || { items: [] };
      savedWishlist.items = savedWishlist.items.filter(
        (item) => item.product?._id !== productId
      );
      setWishlist(savedWishlist);
      setItem('wishlist', savedWishlist);
      toast.success('Removed from wishlist');
      return;
    }

    try {
      const response = await api.delete(`/wishlist/${productId}`);
      setWishlist(response.data.wishlist);
      toast.success('Removed from wishlist');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
    }
  };

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlist.items.some((item) => item.product?._id === productId);
  };

  // Get wishlist count
  const getWishlistCount = () => {
    if (!wishlist?.items) return 0;
    return wishlist.items.filter(
      (item) => item && item.product && item.product._id
    ).length;
  };

  const value = {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist,
    isInWishlist,
    getWishlistCount,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};
