import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { FaFlag, FaClock } from 'react-icons/fa';
import { openModal } from '../store/slices/uiSlice';
import { formatDate, isOverdue } from '../utils/mockApi';
import './Task.css';

const Task = ({ task, index }) => {
  const dispatch = useDispatch();
  const { entities: users } = useSelector(state => state.users);
  
  const handleTaskClick = () => {
    dispatch(openModal({
      modalType: 'editTask',
      data: { task }
    }));
  };
  
  const assignedUser = task.assignedTo ? users[task.assignedTo] : null;
  const isTaskOverdue = isOverdue(task.dueDate);
  
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleTaskClick}
        >
          <div className="task-header">
            <div className={`priority-indicator priority-${task.priority}`}>
              <FaFlag />
              <span className="sr-only">{task.priority} priority</span>
            </div>
            
            <h4 className="task-title">{task.title}</h4>
          </div>
          
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          <div className="task-footer">
            {task.dueDate && (
              <div className={`due-date ${isTaskOverdue ? 'overdue' : ''}`}>
                <FaClock />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
            
            {assignedUser && (
              <div className="assigned-user">
                <img 
                  src={assignedUser.avatar} 
                  alt={assignedUser.name} 
                  className="user-avatar"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
