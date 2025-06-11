import React, { useState, useEffect } from 'react';
import './ProductGallery.css';
import products from '../data/products';
import ProductItem from './ProductItem';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';

function ProductGallery() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Filter products based on category and search query
  useEffect(() => {
    let result = products;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle search change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="product-gallery">
      <div className="controls">
        <CategoryFilter 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        <SearchBar 
          searchQuery={searchQuery} 
          onSearchChange={handleSearchChange} 
        />
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="no-products">No products found matching your criteria</div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
      
      <div className="product-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  );
}

export default ProductGallery;
