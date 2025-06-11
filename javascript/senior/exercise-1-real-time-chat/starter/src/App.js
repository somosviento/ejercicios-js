import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import NotificationContainer from './components/NotificationContainer';

// Services
import { initializeSocket } from './services/socketService';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  // Initialize socket connection when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      // TODO: Initialize socket connection
      // initializeSocket(user.id, dispatch);
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/" />} />
        <Route 
          path="/*" 
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Chat />
            </ProtectedRoute>
          } 
        />
      </Routes>
      <NotificationContainer />
    </div>
  );
}

export default App;
