import React from 'react';
import './Cart.css';
import { useCart } from '../context/CartContext';
import { ACTIONS } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';

function Cart() {
  const { state, dispatch } = useCart();
  const { items } = state;
  
  // Calculate total price
  const totalPrice = items.reduce((total, item) => {
    return total + (item.price * (1 - item.discountPercentage / 100) * item.quantity);
  }, 0);
  
  // Handle remove item from cart
  const handleRemoveItem = (itemId) => {
    // TODO: Implement remove item functionality
  };
  
  return (
    <div className="cart">
      <div className="cart-header">
        <h3>Cart</h3>
      </div>
      
      <div className="cart-content">
        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="item-image" 
                  />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">
                      {item.currency}{(item.price * (1 - item.discountPercentage / 100)).toFixed(2)} x {item.quantity} 
                      <span className="item-total">
                        {item.currency}{(item.price * (1 - item.discountPercentage / 100) * item.quantity).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <button 
                    className="remove-item" 
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            <button className="checkout-button">
              Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
