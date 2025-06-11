# Senior Exercise 2: Kanban Board

## Overview
In this exercise, you will build a Kanban board application that allows users to manage tasks across different stages of completion. This exercise focuses on advanced state management, drag-and-drop functionality, and optimizing performance in React applications.

## Learning Objectives
- Implement drag-and-drop functionality using React DnD or a similar library
- Create a complex state management system with Redux Toolkit
- Implement optimistic UI updates for a responsive user experience
- Apply performance optimization techniques for React components
- Build custom hooks for reusable functionality
- Implement form validation and error handling

## Requirements

### Core Features
1. **Board Management**
   - Create, edit, and delete boards
   - Each board has a title and optional description

2. **Column Management**
   - Each board contains multiple columns (e.g., "To Do", "In Progress", "Done")
   - Users can add, edit, rename, and delete columns
   - Column order can be changed via drag-and-drop

3. **Task Management**
   - Create, edit, and delete tasks within columns
   - Tasks can be moved between columns via drag-and-drop
   - Tasks should have: title, description, priority level, due date, and assigned user
   - Tasks can be filtered and sorted by different criteria

4. **User Interface**
   - Clean, intuitive interface with responsive design
   - Visual indicators for task priority and status
   - Loading states and error handling for all operations

### Technical Requirements
1. **State Management**
   - Use Redux Toolkit for global state management
   - Implement proper normalization of data
   - Use selectors for derived data

2. **Drag and Drop**
   - Implement smooth drag-and-drop for tasks and columns
   - Provide visual feedback during drag operations
   - Ensure accessibility for keyboard users

3. **Performance Optimization**
   - Implement virtualization for large lists of tasks
   - Use memoization to prevent unnecessary re-renders
   - Implement code splitting for different board views

4. **Data Persistence**
   - Store board data in localStorage
   - Implement mock API calls with simulated network delays
   - Handle loading, error, and success states

## Getting Started
1. Review the starter code to understand the project structure
2. Implement the Redux store and slices
3. Create the basic UI components
4. Add drag-and-drop functionality
5. Implement CRUD operations for boards, columns, and tasks
6. Add filtering, sorting, and search functionality
7. Optimize performance for large boards

## Bonus Challenges
- Add user authentication and multi-user support
- Implement real-time collaboration features
- Add task comments and activity history
- Create custom themes and board backgrounds
- Add keyboard shortcuts for common actions
- Implement undo/redo functionality

## Solution
The solution code demonstrates a complete implementation of all requirements. Compare your solution with the provided code to learn different approaches and best practices.

Good luck and happy coding!
