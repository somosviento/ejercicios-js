import React from 'react';
import './TaskItem.css';
import { useTaskContext } from '../context/TaskContext';
import { ACTIONS } from '../context/TaskContext';

function TaskItem({ task }) {
  const { dispatch } = useTaskContext();

  // TODO: Implement function to toggle task completion
  const handleToggleComplete = () => {
    // Dispatch action to toggle task completion
  };

  // TODO: Implement function to edit task
  const handleEditTask = () => {
    // Show form or modal to edit task
  };

  // TODO: Implement function to delete task
  const handleDeleteTask = () => {
    // Dispatch action to delete task
  };

  // Format the due date
  const formatDueDate = (dateString) => {
    if (!dateString) return 'No due date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggleComplete}
        />
      </div>
      
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        <div className="task-meta">
          <span className={`task-priority priority-${task.priority}`}>
            {task.priority}
          </span>
          <span className="task-due-date">
            {formatDueDate(task.dueDate)}
          </span>
        </div>
      </div>
      
      <div className="task-actions">
        <button className="edit-button" onClick={handleEditTask}>
          Edit
        </button>
        <button className="delete-button" onClick={handleDeleteTask}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
