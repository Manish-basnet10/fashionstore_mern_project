import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { getItem, setItem } from '../utils/storage';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Fetch cart from API
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load cart on mount and when auth changes
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (isAuthenticated) {
          await fetchCart();
        } else {
          // Load from localStorage for guest users
          const savedCart = getItem('cart');
          if (savedCart && savedCart.items && savedCart.items.length > 0) {
            // Only try to fetch if items exist and might need data
            const itemsWithData = await Promise.allSettled(
              savedCart.items.map(async (item) => {
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
              result.status === 'fulfilled' ? result.value : savedCart.items[itemsWithData.indexOf(result)]
            );
            
            setCart({ items: processedItems });
            // Only update localStorage if we got new data
            if (processedItems.some((item, idx) => item.product?.name && !savedCart.items[idx]?.product?.name)) {
              setItem('cart', { items: processedItems });
            }
          } else {
            setCart({ items: [] });
          }
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        // Fallback to empty cart on error
        setCart({ items: [] });
      }
    };
    
    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Add item to cart
  const addToCart = async (productId, quantity = 1, size, color, productData = null) => {
    if (!isAuthenticated) {
      // Save to localStorage for guest users
      const savedCart = getItem('cart') || { items: [] };
      
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
      
      // Check if item already exists with same size and color
      const existingIndex = savedCart.items.findIndex(
        (item) =>
          item.product?._id === productId &&
          item.size === size &&
          item.color?.name === color?.name
      );
      
      if (existingIndex > -1) {
        savedCart.items[existingIndex].quantity += quantity;
      } else {
        const newItem = {
          _id: `guest_${Date.now()}_${Math.random()}`,
          product: product || { _id: productId },
          quantity,
          size,
          color,
        };
        savedCart.items.push(newItem);
      }
      
      setCart(savedCart);
      setItem('cart', savedCart);
      toast.success('Added to cart');
      return;
    }

    try {
      const response = await api.post('/cart', {
        productId,
        quantity,
        size,
        color,
      });
      setCart(response.data.cart);
      toast.success('Added to cart');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId, quantity) => {
    if (!isAuthenticated) {
      const savedCart = getItem('cart') || { items: [] };
      // Try to find by _id first, then by index
      const item = savedCart.items.find(
        (i) => i._id === itemId || savedCart.items.indexOf(i).toString() === itemId.toString()
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
        setCart({ ...savedCart });
        setItem('cart', savedCart);
      }
      return;
    }

    try {
      const response = await api.put(`/cart/${itemId}`, { quantity });
      setCart(response.data.cart);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) {
      const savedCart = getItem('cart') || { items: [] };
      savedCart.items = savedCart.items.filter(
        (item, idx) => item._id !== itemId && idx.toString() !== itemId.toString()
      );
      setCart({ ...savedCart });
      setItem('cart', savedCart);
      toast.success('Item removed');
      return;
    }

    try {
      const response = await api.delete(`/cart/${itemId}`);
      setCart(response.data.cart);
      toast.success('Item removed');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item');
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!isAuthenticated) {
      setCart({ items: [] });
      setItem('cart', { items: [] });
      return;
    }

    try {
      await api.delete('/cart');
      setCart({ items: [] });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to clear cart');
    }
  };

  // Get cart item count
  const getCartCount = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.quantity || 1);
    }, 0);
  };

  // Get cart total
  const getCartTotal = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0);
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartCount,
    getCartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

