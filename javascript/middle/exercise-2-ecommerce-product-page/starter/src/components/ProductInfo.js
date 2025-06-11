import React from 'react';
import './ProductInfo.css';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';

function ProductInfo({ 
  product, 
  selectedColor, 
  selectedSize, 
  quantity, 
  onColorSelect, 
  onSizeSelect, 
  onQuantityChange, 
  onAddToCart 
}) {
  // Calculate discounted price
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);
  
  return (
    <div className="product-info">
      <div className="product-brand">{product.brand}</div>
      <h1 className="product-name">{product.name}</h1>
      <p className="product-description">{product.description}</p>
      
      <div className="price-container">
        <div className="price-row">
          <span className="current-price">
            {product.currency}{discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="discount-badge">
              {product.discountPercentage}%
            </span>
          )}
        </div>
        
        {product.discountPercentage > 0 && (
          <div className="original-price">
            {product.currency}{product.price.toFixed(2)}
          </div>
        )}
      </div>
      
      <div className="product-options">
        <div className="color-options">
          <label>Color</label>
          <div className="color-selector">
            {product.colors.map(color => (
              <button
                key={color.id}
                className={`color-option ${selectedColor.id === color.id ? 'active' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => onColorSelect(color)}
                aria-label={color.name}
                title={color.name}
              />
            ))}
          </div>
        </div>
        
        <div className="size-options">
          <label>Size</label>
          <div className="size-selector">
            {product.sizes.map(size => (
              <button
                key={size}
                className={`size-option ${selectedSize === size ? 'active' : ''}`}
                onClick={() => onSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="add-to-cart-container">
        <div className="quantity-selector">
          <button 
            className="quantity-button"
            onClick={() => onQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <FaMinus />
          </button>
          <span className="quantity">{quantity}</span>
          <button 
            className="quantity-button"
            onClick={() => onQuantityChange(1)}
          >
            <FaPlus />
          </button>
        </div>
        
        <button className="add-to-cart-button" onClick={onAddToCart}>
          <FaShoppingCart />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}

export default ProductInfo;
