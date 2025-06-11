import React, { useState } from 'react';
import './ImageGallery.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function ImageGallery({ images }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // TODO: Implement function to handle thumbnail click
  const handleThumbnailClick = (index) => {
    // Set the current image index
  };
  
  // TODO: Implement function to navigate to previous image
  const handlePrevImage = () => {
    // Navigate to previous image
  };
  
  // TODO: Implement function to navigate to next image
  const handleNextImage = () => {
    // Navigate to next image
  };
  
  return (
    <div className="image-gallery">
      <div className="main-image-container">
        <img 
          src={images[currentImageIndex].main} 
          alt="Product" 
          className="main-image" 
        />
        
        <button className="nav-button prev-button" onClick={handlePrevImage}>
          <FaChevronLeft />
        </button>
        
        <button className="nav-button next-button" onClick={handleNextImage}>
          <FaChevronRight />
        </button>
      </div>
      
      <div className="thumbnails">
        {images.map((image, index) => (
          <div 
            key={image.id}
            className={`thumbnail-container ${currentImageIndex === index ? 'active' : ''}`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img 
              src={image.thumbnail} 
              alt={`Thumbnail ${index + 1}`} 
              className="thumbnail" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
