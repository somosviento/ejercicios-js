import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <h1>DevBlog</h1>
          </Link>
        </div>
        
        <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
        
        <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={({ isActive }) => isActive ? 'active' : ''}>
                Blog
              </NavLink>
            </li>
            <li className="dropdown">
              <span>Categories</span>
              <div className="dropdown-content">
                <NavLink to="/category/React">React</NavLink>
                <NavLink to="/category/JavaScript">JavaScript</NavLink>
                <NavLink to="/category/CSS">CSS</NavLink>
                <NavLink to="/category/Web Design">Web Design</NavLink>
                <NavLink to="/category/Node.js">Node.js</NavLink>
              </div>
            </li>
          </ul>
        </nav>
        
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <button type="submit" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
