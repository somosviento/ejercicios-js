# Fullstack Exercise 2: Advanced E-commerce Platform with Microservices

## Overview
In this exercise, you'll build a modern e-commerce platform using a microservices architecture with TypeScript. The system will include a product catalog, shopping cart, order processing, and user management, all connected through type-safe APIs and event-driven communication.

## Learning Objectives
- Design and implement a microservices architecture with TypeScript
- Create type-safe API contracts between services
- Implement event-driven communication between microservices
- Build a responsive and performant frontend with React and TypeScript
- Apply advanced state management patterns for complex UIs

## Requirements

### 1. Backend Microservices
Implement the following microservices:
- Product Service: Manages product catalog and inventory
- Cart Service: Handles shopping cart operations
- Order Service: Processes orders and payments
- User Service: Manages user accounts and authentication
- Gateway Service: API gateway for client communication

### 2. Frontend Application
Build a React application with:
- Product browsing and search
- Shopping cart management
- Checkout process
- User account management
- Order history and tracking

### 3. Shared Infrastructure
- Type definitions shared across services
- Event schemas for message passing
- API contract definitions
- Common utilities and middleware

## Project Structure
```
/
├── services/
│   ├── product-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── events/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── cart-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── events/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── order-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── events/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── user-service/
│   │   ├── src/
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── services/
│   │   │   └── events/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── gateway-service/
│       ├── src/
│       │   ├── routes/
│       │   ├── middleware/
│       │   └── services/
│       ├── package.json
│       └── tsconfig.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── store/
│   │   └── types/
│   ├── package.json
│   └── tsconfig.json
└── shared/
    ├── src/
    │   ├── types/
    │   ├── events/
    │   └── utils/
    ├── package.json
    └── tsconfig.json
```

## Key Features to Implement

### 1. Product Management
- Product catalog with categories and filters
- Product search with advanced filtering
- Product recommendations
- Inventory management
- Product reviews and ratings

### 2. Shopping Experience
- Shopping cart with persistent storage
- Wishlist functionality
- Product comparisons
- Recently viewed products
- Personalized recommendations

### 3. Order Processing
- Multi-step checkout process
- Payment processing integration
- Order confirmation and tracking
- Order history and details
- Returns and refunds handling

### 4. User Management
- Authentication and authorization
- User profiles and preferences
- Address book management
- Order history
- Loyalty program

## Technical Requirements

### Backend
- Node.js with Express or NestJS
- TypeScript for all services
- MongoDB or PostgreSQL for data storage
- Redis for caching and session management
- RabbitMQ or Kafka for event-driven communication
- Docker and Docker Compose for containerization
- API Gateway pattern for client communication

### Frontend
- React with TypeScript
- Redux Toolkit or Context API for state management
- React Query for data fetching and caching
- Styled Components or Tailwind CSS for styling
- Form handling with React Hook Form and Zod
- Responsive design for mobile and desktop
- Accessibility compliance (WCAG 2.1)

## Implementation Tasks

### Task 1: Type-Safe Event Communication
Implement type-safe event communication between microservices:

```typescript
// shared/src/events/product-events.ts
export interface ProductCreatedEvent {
  type: 'product.created';
  payload: {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
    categoryId: string;
  };
}

export interface ProductUpdatedEvent {
  type: 'product.updated';
  payload: {
    id: string;
    changes: {
      name?: string;
      price?: number;
      stockQuantity?: number;
      categoryId?: string;
    };
  };
}

export type ProductEvent = ProductCreatedEvent | ProductUpdatedEvent;

// services/product-service/src/events/product-publisher.ts
import { ProductEvent } from '@shared/events/product-events';

export class ProductEventPublisher {
  // Implementation details...
  
  async publishEvent(event: ProductEvent): Promise<void> {
    // Publish event to message broker
  }
}

// services/cart-service/src/events/product-subscriber.ts
import { ProductEvent } from '@shared/events/product-events';

export class ProductEventSubscriber {
  // Implementation details...
  
  handleProductEvent(event: ProductEvent): void {
    switch (event.type) {
      case 'product.created':
        // Handle product created
        break;
      case 'product.updated':
        // Handle product updated
        break;
    }
  }
}
```

### Task 2: API Gateway with Type Safety
Implement a type-safe API gateway:

```typescript
// shared/src/types/api-contracts.ts
export namespace ProductAPI {
  export interface GetProductRequest {
    id: string;
  }
  
  export interface GetProductResponse {
    id: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    categoryId: string;
    images: string[];
    ratings: {
      average: number;
      count: number;
    };
  }
  
  // Other product API contracts...
}

// services/gateway-service/src/routes/product-routes.ts
import { Router, Request, Response } from 'express';
import { ProductAPI } from '@shared/types/api-contracts';
import { ProductService } from '../services/product-service';

export const productRouter = Router();

productRouter.get('/:id', async (req: Request, res: Response) => {
  const productId = req.params.id;
  
  try {
    const product = await ProductService.getProduct({ id: productId });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Other product routes...
```

### Task 3: Frontend State Management
Implement type-safe state management for the shopping cart:

```typescript
// client/src/store/cart/cart-slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  isLoading: false,
  error: null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        item => item.productId === action.payload.productId
      );
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(item => item.productId === productId);
      
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        item => item.productId !== action.payload
      );
    },
    clearCart: state => {
      state.items = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  setLoading,
  setError
} = cartSlice.actions;

export default cartSlice.reducer;
```

## Evaluation Criteria
Your solution will be evaluated based on:
1. Microservices architecture design and implementation
2. TypeScript usage and type safety across services
3. Event-driven communication implementation
4. Frontend state management and UI implementation
5. Code organization and maintainability
6. Error handling and resilience
7. Performance optimization techniques

## Bonus Challenges
1. Implement service discovery and load balancing
2. Add comprehensive monitoring and logging
3. Implement CI/CD pipeline for the project
4. Add A/B testing capabilities for the frontend
5. Implement internationalization and localization
