import React, { useState } from 'react';
import './ProductReviews.css';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function ProductReviews({ reviews }) {
  const [sortBy, setSortBy] = useState('date');
  
  // Calculate average rating
  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  
  // TODO: Implement function to sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    // Sort by selected criteria
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    }
    // Add more sorting options
    return 0;
  });
  
  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" />);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    
    return stars;
  };
  
  return (
    <div className="product-reviews">
      <h2>Customer Reviews</h2>
      
      <div className="reviews-summary">
        <div className="average-rating">
          <div className="rating-stars">
            {renderStars(averageRating)}
          </div>
          <div className="rating-number">
            {averageRating.toFixed(1)} out of 5
          </div>
        </div>
        
        <div className="sort-options">
          <label htmlFor="sort-select">Sort by:</label>
          <select 
            id="sort-select" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Most Recent</option>
            <option value="rating-high">Highest Rating</option>
            <option value="rating-low">Lowest Rating</option>
          </select>
        </div>
      </div>
      
      <div className="reviews-list">
        {sortedReviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="review-user">{review.user}</div>
              <div className="review-date">
                {new Date(review.date).toLocaleDateString()}
              </div>
            </div>
            
            <div className="review-rating">
              {renderStars(review.rating)}
            </div>
            
            <h3 className="review-title">{review.title}</h3>
            <p className="review-comment">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductReviews;
