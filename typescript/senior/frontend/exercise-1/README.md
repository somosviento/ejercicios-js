# Frontend Exercise 1: Advanced State Management with React Context API and TypeScript

## Overview
In this exercise, you'll build a sophisticated state management system using React Context API with TypeScript. You'll implement a shopping cart feature for an e-commerce application with advanced type safety, performance optimizations, and proper separation of concerns.

## Learning Objectives
- Implement advanced TypeScript patterns with React Context API
- Create a performant state management solution with proper memoization
- Design a type-safe API for state management
- Apply proper error handling and loading states
- Implement optimistic updates with rollback capability

## Requirements

### 1. Shopping Cart Context
Create a shopping cart context with the following features:
- Strong TypeScript typing for all state and actions
- Separation of read and write contexts for performance optimization
- Proper error handling for async operations
- Loading states for all async operations
- Persistence to localStorage with type safety

### 2. Cart Item Management
Implement the following functionality:
- Add items to cart with quantity
- Update item quantity
- Remove items from cart
- Clear entire cart
- Calculate totals (subtotal, tax, shipping, total)
- Apply discount codes

### 3. Performance Optimizations
- Implement proper memoization to prevent unnecessary re-renders
- Use the Context Selector pattern to allow components to subscribe only to specific parts of the state
- Implement batched updates for multiple state changes

### 4. Advanced Features
- Implement optimistic updates with rollback on failure
- Add a time-travel debugging feature (undo/redo)
- Create a middleware system for the context (similar to Redux middleware)
- Add proper logging for all state changes

## Project Structure
```
/src
  /context
    /cart
      CartContext.tsx        # Main context definition
      CartProvider.tsx       # Provider component
      cartReducer.ts         # State reducer
      cartActions.ts         # Action creators
      cartSelectors.ts       # Selector functions
      cartMiddleware.ts      # Middleware implementation
      cartTypes.ts           # TypeScript type definitions
  /hooks
    useCart.ts              # Custom hook for consuming cart context
    useCartItem.ts          # Hook for working with specific cart items
    useCartActions.ts       # Hook for cart actions
  /components
    /cart
      CartSummary.tsx       # Cart summary component
      CartItem.tsx          # Individual cart item component
      AddToCartButton.tsx   # Button to add items to cart
      CartDiscountForm.tsx  # Form for applying discount codes
  /services
    cartService.ts          # Service for cart API calls
  /utils
    cartUtils.ts            # Utility functions for cart calculations
```

## Getting Started
1. Set up a new React project with TypeScript
2. Implement the context structure as outlined above
3. Create the necessary components to demonstrate the functionality
4. Add proper error handling and loading states
5. Implement the advanced features

## Evaluation Criteria
Your solution will be evaluated based on:
1. Proper TypeScript usage and type safety
2. Code organization and separation of concerns
3. Performance optimizations
4. Error handling and edge cases
5. Implementation of advanced features

## Bonus Challenges
1. Add unit tests for the context and hooks
2. Implement a cart synchronization feature with a backend API
3. Add animations for cart updates
4. Create a custom dev tools panel for debugging the cart state
