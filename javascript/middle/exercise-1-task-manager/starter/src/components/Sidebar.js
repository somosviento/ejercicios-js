import React from 'react';
import './Sidebar.css';
import { useTaskContext } from '../context/TaskContext';

function Sidebar() {
  const { state, dispatch } = useTaskContext();
  const { projects, activeProject } = state;

  // TODO: Implement function to handle project selection
  const handleProjectSelect = (projectId) => {
    // Dispatch action to set active project
  };

  // TODO: Implement function to add a new project
  const handleAddProject = () => {
    // Show form or modal to add new project
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>Task Manager</h1>
      </div>
      
      <div className="projects-section">
        <div className="section-header">
          <h2>Projects</h2>
          <button className="add-button" onClick={handleAddProject}>+</button>
        </div>
        
        <ul className="project-list">
          {projects.map(project => (
            <li 
              key={project.id}
              className={`project-item ${activeProject === project.id ? 'active' : ''}`}
              onClick={() => handleProjectSelect(project.id)}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
