import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { blogPosts, tags } from '../data/blogData';
import './BlogListPage.css';

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeTag, setActiveTag] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Initialize posts
  useEffect(() => {
    setPosts(blogPosts);
    setFilteredPosts(blogPosts);
  }, []);

  // Filter and sort posts when dependencies change
  useEffect(() => {
    let result = [...posts];
    
    // Filter by tag
    if (activeTag !== 'All') {
      result = result.filter(post => post.tags.includes(activeTag));
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(term) || 
        post.excerpt.toLowerCase().includes(term) ||
        post.content.toLowerCase().includes(term)
      );
    }
    
    // Sort posts
    result = sortPosts(result, sortBy);
    
    setFilteredPosts(result);
  }, [posts, activeTag, searchTerm, sortBy]);

  // Sort posts based on selected option
  const sortPosts = (postsToSort, sortOption) => {
    switch (sortOption) {
      case 'newest':
        return [...postsToSort].sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'oldest':
        return [...postsToSort].sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'a-z':
        return [...postsToSort].sort((a, b) => a.title.localeCompare(b.title));
      case 'z-a':
        return [...postsToSort].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return postsToSort;
    }
  };

  // Handle tag selection
  const handleTagClick = (tag) => {
    setActiveTag(tag);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort selection change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="blog-list-page">
      <div className="container">
        <header className="page-header">
          <h1>Blog Articles</h1>
          <p>Explore our latest articles and tutorials on web development</p>
        </header>
        
        <div className="filters-container">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          
          <div className="sort-container">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>
        
        <div className="tags-container">
          <button
            className={`tag-button ${activeTag === 'All' ? 'active' : ''}`}
            onClick={() => handleTagClick('All')}
          >
            All
          </button>
          {tags.map(tag => (
            <button
              key={tag}
              className={`tag-button ${activeTag === tag ? 'active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {filteredPosts.length > 0 ? (
          <div className="posts-grid">
            {filteredPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="no-posts">
            <h3>No posts found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogListPage;
