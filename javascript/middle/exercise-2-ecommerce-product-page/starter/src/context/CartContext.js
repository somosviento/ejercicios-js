import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  items: [],
  isOpen: false
};

// Create context
const CartContext = createContext();

// Actions
export const ACTIONS = {
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  UPDATE_QUANTITY: 'update_quantity',
  TOGGLE_CART: 'toggle_cart'
};

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      // TODO: Implement adding a product to the cart
      // If the product already exists, update its quantity
      return state;
      
    case ACTIONS.REMOVE_FROM_CART:
      // TODO: Implement removing a product from the cart
      return state;
      
    case ACTIONS.UPDATE_QUANTITY:
      // TODO: Implement updating the quantity of a product in the cart
      return state;
      
    case ACTIONS.TOGGLE_CART:
      // TODO: Implement toggling the cart open/closed
      return state;
      
    default:
      return state;
  }
}

// Provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
