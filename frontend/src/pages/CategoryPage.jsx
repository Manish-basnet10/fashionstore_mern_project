import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
  const location = useLocation();
  const categoryPath = location.pathname.substring(1).toLowerCase(); // Remove leading slash
  const category = categoryPath.charAt(0).toUpperCase() + categoryPath.slice(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [categoryPath]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/category/${category}`);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryTitle = category;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{categoryTitle} Collection</h1>
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

