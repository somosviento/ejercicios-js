import React, { useState } from 'react';
import './ProductPage.css';
import product from '../data/product';
import { useCart } from '../context/CartContext';
import { ACTIONS } from '../context/CartContext';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';
import ProductReviews from './ProductReviews';

function ProductPage() {
  const { dispatch } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]); // Default to Medium
  const [quantity, setQuantity] = useState(1);
  
  // Handle color selection
  const handleColorSelect = (color) => {
    // TODO: Implement color selection
  };
  
  // Handle size selection
  const handleSizeSelect = (size) => {
    // TODO: Implement size selection
  };
  
  // Handle quantity change
  const handleQuantityChange = (change) => {
    // TODO: Implement quantity change
    // Make sure quantity doesn't go below 1
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    // Create a cart item with selected options and dispatch to cart context
  };
  
  return (
    <div className="product-page">
      <div className="product-container">
        <ImageGallery images={product.images} />
        
        <ProductInfo 
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          quantity={quantity}
          onColorSelect={handleColorSelect}
          onSizeSelect={handleSizeSelect}
          onQuantityChange={handleQuantityChange}
          onAddToCart={handleAddToCart}
        />
      </div>
      
      <ProductReviews reviews={product.reviews} />
    </div>
  );
}

export default ProductPage;
