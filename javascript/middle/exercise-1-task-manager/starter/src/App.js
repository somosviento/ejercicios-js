import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <TaskList />
        </main>
      </div>
    </TaskProvider>
  );
}

export default App;
