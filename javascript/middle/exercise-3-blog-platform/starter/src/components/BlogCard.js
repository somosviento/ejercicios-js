import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import './BlogCard.css';

const BlogCard = ({ post, featured = false }) => {
  return (
    <article className={`blog-card ${featured ? 'featured' : ''}`}>
      <div className="blog-card-image">
        <Link to={`/blog/${post.id}`}>
          <img src={post.imageUrl} alt={post.title} />
        </Link>
        {featured && <span className="featured-badge">Featured</span>}
      </div>
      
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="category">
            <Link to={`/category/${post.category}`}>{post.category}</Link>
          </span>
          <span className="date">{formatDate(post.date)}</span>
        </div>
        
        <h2 className="blog-card-title">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h2>
        
        <p className="blog-card-excerpt">{post.excerpt}</p>
        
        <div className="blog-card-footer">
          <div className="author">
            <span>By {post.author}</span>
          </div>
          <Link to={`/blog/${post.id}`} className="read-more">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
