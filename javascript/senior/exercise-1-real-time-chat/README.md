# Exercise 1: Real-Time Chat Application

## Objective
Build a real-time chat application with multiple rooms, direct messaging, and notifications using React, WebSockets, and advanced state management. This exercise focuses on real-time data handling, complex state management, and performance optimization.

## Requirements
1. User Authentication:
   - Implement user registration and login (mock)
   - User profiles with avatars and status indicators
   - Remember user sessions

2. Chat Functionality:
   - Public chat rooms with real-time messaging
   - Direct messaging between users
   - Message status indicators (sent, delivered, read)
   - Support for text formatting, emojis, and link previews
   - Message history with infinite scrolling

3. Advanced Features:
   - Real-time notifications for new messages
   - Typing indicators
   - Online/offline status
   - Unread message counters
   - Message search functionality

4. Technical Requirements:
   - WebSocket integration for real-time communication
   - Efficient state management (Redux, Context API with optimizations)
   - Proper error handling and loading states
   - Responsive design for all device sizes
   - Performance optimizations for message rendering

## Getting Started
1. Navigate to this directory
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open the code in your favorite editor

## Tips
- Use a WebSocket library like Socket.io or a mock WebSocket service
- Implement proper state normalization for efficient updates
- Use virtualization for long message lists
- Consider using React.memo, useMemo, and useCallback for performance
- Implement proper error boundaries and fallbacks

## Bonus Challenges
- Add end-to-end encryption for messages
- Implement file sharing and image uploads
- Add voice/video call functionality
- Create a desktop notification system
- Implement message reactions and threads

## Solution
Check the `/solution` folder for a reference implementation after you've completed your own version.
