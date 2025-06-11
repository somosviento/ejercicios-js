import React, { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  tasks: [],
  projects: [
    { id: 'inbox', name: 'Inbox' },
    { id: 'work', name: 'Work' },
    { id: 'personal', name: 'Personal' }
  ],
  activeProject: 'inbox'
};

// Create context
const TaskContext = createContext();

// Actions
export const ACTIONS = {
  ADD_TASK: 'add_task',
  EDIT_TASK: 'edit_task',
  DELETE_TASK: 'delete_task',
  TOGGLE_TASK_COMPLETE: 'toggle_task_complete',
  ADD_PROJECT: 'add_project',
  SET_ACTIVE_PROJECT: 'set_active_project'
};

// Reducer function
function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      // TODO: Implement adding a new task to the state
      return state;
      
    case ACTIONS.EDIT_TASK:
      // TODO: Implement editing an existing task
      return state;
      
    case ACTIONS.DELETE_TASK:
      // TODO: Implement deleting a task
      return state;
      
    case ACTIONS.TOGGLE_TASK_COMPLETE:
      // TODO: Implement toggling a task's completed status
      return state;
      
    case ACTIONS.ADD_PROJECT:
      // TODO: Implement adding a new project
      return state;
      
    case ACTIONS.SET_ACTIVE_PROJECT:
      // TODO: Implement setting the active project
      return state;
      
    default:
      return state;
  }
}

// Provider component
export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook to use the task context
export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
