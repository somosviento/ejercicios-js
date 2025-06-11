import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { featuredPosts, recentPosts, categories } from '../data/blogData';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Welcome to DevBlog</h1>
            <p>
              A blog for developers, by developers. Stay up to date with the latest
              trends in web development, programming, and design.
            </p>
            <Link to="/blog" className="btn btn-primary">
              Explore Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts Section */}
      <section className="featured-posts">
        <div className="container">
          <h2 className="section-title">Featured Posts</h2>
          <div className="posts-grid">
            {featuredPosts.map(post => (
              <BlogCard key={post.id} post={post} featured={true} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="recent-posts">
        <div className="container">
          <h2 className="section-title">Recent Posts</h2>
          <div className="posts-grid">
            {recentPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div className="view-all">
            <Link to="/blog" className="btn btn-outline">
              View All Posts
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                to={`/category/${category.id}`} 
                key={category.id} 
                className="category-card"
              >
                <h3>{category.name}</h3>
                <span className="post-count">{category.count} posts</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest articles and resources sent straight to your inbox.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
