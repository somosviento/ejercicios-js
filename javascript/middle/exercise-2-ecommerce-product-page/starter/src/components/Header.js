import React from 'react';
import './Header.css';
import { useCart } from '../context/CartContext';
import { ACTIONS } from '../context/CartContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import Cart from './Cart';

function Header() {
  const { state, dispatch } = useCart();
  const { items, isOpen } = state;
  
  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Toggle cart visibility
  const toggleCart = () => {
    // TODO: Implement toggle cart functionality
  };
  
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <h1>sneakers</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#collections">Collections</a></li>
            <li><a href="#men">Men</a></li>
            <li><a href="#women">Women</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
      
      <div className="header-right">
        <div className="cart-icon" onClick={toggleCart}>
          <FaShoppingCart />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </div>
        <div className="user-icon">
          <FaUser />
        </div>
      </div>
      
      {isOpen && <Cart />}
    </header>
  );
}

export default Header;
