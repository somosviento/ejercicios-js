import React from 'react';
import './ProductItem.css';

function ProductItem({ product }) {
  // Format price to include currency symbol
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="product-item">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatPrice(product.price)}</p>
        <span className="product-category">{product.category}</span>
      </div>
    </div>
  );
}

export default ProductItem;
