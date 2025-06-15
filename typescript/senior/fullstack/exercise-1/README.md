# Fullstack Exercise 1: Real-time Collaborative Task Management System

## Overview
In this exercise, you'll build a real-time collaborative task management system using TypeScript for both frontend and backend. The application will allow multiple users to collaborate on projects and tasks in real-time, with changes syncing instantly across all connected clients.

## Learning Objectives
- Implement real-time communication between frontend and backend
- Create type-safe API contracts shared between client and server
- Design a scalable WebSocket architecture with proper TypeScript typing
- Implement optimistic UI updates with conflict resolution
- Create a responsive and accessible frontend with React and TypeScript

## Requirements

### 1. Backend (Node.js with Express/NestJS)
- RESTful API for CRUD operations on projects and tasks
- WebSocket server for real-time updates
- Authentication and authorization
- Data persistence with MongoDB or PostgreSQL
- Type-safe API contracts with shared types

### 2. Frontend (React with TypeScript)
- Modern React with hooks and TypeScript
- Real-time collaboration features
- Responsive and accessible UI
- State management with Redux Toolkit or Context API
- Form handling with proper validation

### 3. Shared Code
- Type definitions shared between frontend and backend
- API contract definitions
- Validation schemas
- Utility functions

## Project Structure
```
/
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── tsconfig.json
├── server/                  # Backend Node.js application
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/          # Data models
│   │   ├── services/        # Business logic
│   │   ├── websocket/       # WebSocket handling
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── tsconfig.json
└── shared/                  # Shared code between client and server
    ├── src/
    │   ├── types/           # Shared TypeScript types
    │   ├── validation/      # Validation schemas
    │   └── utils/           # Shared utility functions
    ├── package.json
    └── tsconfig.json
```

## Key Features to Implement

### 1. Real-time Collaboration
- WebSocket connection for real-time updates
- Presence indicators showing who is viewing/editing
- Conflict resolution for simultaneous edits
- Real-time notifications for changes

### 2. Project and Task Management
- Projects with multiple tasks
- Task assignments, due dates, priorities, and statuses
- Comments and attachments
- Activity history and audit trail

### 3. User Management
- Authentication and authorization
- User profiles and avatars
- Team management and permissions
- User activity tracking

## Technical Requirements

### Backend
- Node.js with Express or NestJS
- TypeScript for type safety
- WebSocket server (Socket.io or ws)
- Database (MongoDB or PostgreSQL)
- JWT authentication
- Unit and integration tests

### Frontend
- React with TypeScript
- State management (Redux Toolkit or Context API)
- WebSocket client for real-time updates
- Form handling with validation
- Responsive design with CSS-in-JS or Tailwind
- Accessibility compliance
- Unit tests with React Testing Library

## Evaluation Criteria
Your solution will be evaluated based on:
1. TypeScript usage and type safety
2. Real-time functionality implementation
3. Code organization and architecture
4. Performance and scalability considerations
5. Error handling and edge cases
6. UI/UX design and accessibility
7. Testing coverage

## Bonus Challenges
1. Implement offline support with data synchronization
2. Add end-to-end tests with Cypress
3. Implement real-time collaborative text editing
4. Add file uploads and previews
5. Implement activity analytics and reporting
