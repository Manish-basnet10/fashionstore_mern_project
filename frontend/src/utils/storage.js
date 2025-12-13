// Utility functions for localStorage operations

export const setItem = (key, value) => {
  try {
    // Store token as plain string, everything else as JSON
    if (key === 'token' && typeof value === 'string') {
      localStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    // Special handling for JWT token (don't parse JSON)
    if (key === 'token') {
      return item; // Return token as plain string
    }
    
    // For everything else, try to parse as JSON
    try {
      return JSON.parse(item);
    } catch (e) {
      // If parsing fails, return raw string
      return item;
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return null;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};