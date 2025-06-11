import React, { useState } from 'react';
import './ProjectForm.css';
import { useTaskContext } from '../context/TaskContext';
import { ACTIONS } from '../context/TaskContext';

function ProjectForm({ onClose }) {
  const { dispatch } = useTaskContext();
  const [projectName, setProjectName] = useState('');
  
  // TODO: Implement form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!projectName.trim()) {
      alert('Project name is required');
      return;
    }
    
    // Create a new project object
    const newProject = {
      id: projectName.toLowerCase().replace(/\s+/g, '-'),
      name: projectName.trim()
    };
    
    // Dispatch action to add the project
    // dispatch({ type: ACTIONS.ADD_PROJECT, payload: newProject });
    
    // Close the form
    onClose();
  };
  
  return (
    <div className="project-form-container">
      <form className="project-form" onSubmit={handleSubmit}>
        <h2>Add New Project</h2>
        
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name"
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Add Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectForm;
