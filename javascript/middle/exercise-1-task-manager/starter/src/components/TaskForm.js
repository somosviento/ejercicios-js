import React, { useState } from 'react';
import './TaskForm.css';
import { useTaskContext } from '../context/TaskContext';
import { ACTIONS } from '../context/TaskContext';

function TaskForm({ task = null, onClose }) {
  const { state, dispatch } = useTaskContext();
  const { projects } = state;
  
  // Initialize form state with existing task data or defaults
  const [formData, setFormData] = useState({
    id: task?.id || Date.now().toString(),
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'medium',
    projectId: task?.projectId || state.activeProject,
    completed: task?.completed || false
  });
  
  // TODO: Implement form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.title.trim()) {
      alert('Title is required');
      return;
    }
    
    // Dispatch appropriate action based on whether we're editing or creating
    // if (task) {
    //   dispatch({ type: ACTIONS.EDIT_TASK, payload: formData });
    // } else {
    //   dispatch({ type: ACTIONS.ADD_TASK, payload: formData });
    // }
    
    // Close the form
    onClose();
  };
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="task-form-container">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
        
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task title"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task description (optional)"
            rows="3"
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="projectId">Project</label>
          <select
            id="projectId"
            name="projectId"
            value={formData.projectId}
            onChange={handleChange}
          >
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {task ? 'Save Changes' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
