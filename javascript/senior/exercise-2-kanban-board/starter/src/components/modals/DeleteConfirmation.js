import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './DeleteConfirmation.css';

const DeleteConfirmation = ({ itemType, itemTitle, onConfirm, onClose }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };
  
  return (
    <div className="delete-confirmation">
      <div className="warning-icon">
        <FaExclamationTriangle />
      </div>
      
      <p className="confirmation-message">
        Are you sure you want to delete this {itemType}?
        <br />
        <strong>"{itemTitle}"</strong>
      </p>
      
      <p className="warning-text">
        This action cannot be undone.
      </p>
      
      <div className="confirmation-actions">
        <button 
          className="btn btn-secondary"
          onClick={onClose}
        >
          Cancel
        </button>
        
        <button 
          className="btn btn-danger"
          onClick={handleConfirm}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
