import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts, categories } from '../data/blogData';
import BlogCard from '../components/BlogCard';
import './CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with setTimeout
    setLoading(true);
    setTimeout(() => {
      try {
        // Find the category
        const foundCategory = categories.find(c => c.id === categoryId);
        
        if (foundCategory) {
          setCategory(foundCategory);
          
          // Filter posts by category
          const filteredPosts = blogPosts.filter(post => post.category === foundCategory.name);
          setPosts(filteredPosts);
        } else {
          setError('Category not found');
        }
      } catch (err) {
        console.error('Error loading category:', err);
        setError('Error loading category');
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [categoryId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading category...</p>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'Category not found'}</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="container">
        <header className="category-header">
          <h1>{category.name}</h1>
          <p>{category.description || `Explore all articles in the ${category.name} category`}</p>
        </header>
        
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="no-posts">
            <h3>No posts in this category</h3>
            <p>Check back later for new content</p>
            <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
