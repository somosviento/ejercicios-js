import React from 'react';
import './TaskList.css';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

function TaskList() {
  const { state, dispatch } = useTaskContext();
  const { tasks, activeProject } = state;

  // TODO: Filter tasks based on active project
  const filteredTasks = tasks.filter(task => task.projectId === activeProject);

  // TODO: Implement function to add a new task
  const handleAddTask = () => {
    // Show form or modal to add new task
  };

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>{state.projects.find(p => p.id === activeProject)?.name || 'Tasks'}</h2>
        <button className="add-task-button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks in this project yet.</p>
        </div>
      ) : (
        <div className="tasks">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
