import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">
        <FaExclamationTriangle />
      </div>
      <h2 className="error-title">Something went wrong</h2>
      <p className="error-message">{message || 'An unexpected error occurred'}</p>
      
      {onRetry && (
        <button 
          className="btn btn-primary"
          onClick={onRetry}
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
