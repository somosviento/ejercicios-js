import React from 'react';
import './UserAvatar.css';

/**
 * User avatar component with optional status indicator
 * @param {string} src - Image source URL
 * @param {string} alt - Alternative text for the image
 * @param {string} status - User status ('online', 'away', 'offline')
 * @param {string} size - Avatar size ('sm', 'md', 'lg')
 */
const UserAvatar = ({ src, alt, status, size = 'md' }) => {
  return (
    <div className={`user-avatar ${size}`}>
      <img src={src} alt={alt} className="avatar-img" />
      {status && <span className={`status-indicator ${status}`}></span>}
    </div>
  );
};

export default UserAvatar;
