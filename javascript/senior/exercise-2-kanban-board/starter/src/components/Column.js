import React from 'react';
import { useDispatch } from 'react-redux';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { FaEllipsisH, FaPlus } from 'react-icons/fa';
import { openModal } from '../store/slices/uiSlice';
import Task from './Task';
import './Column.css';

const Column = ({ column, index }) => {
  const dispatch = useDispatch();
  
  const handleColumnOptions = () => {
    dispatch(openModal({
      modalType: 'columnOptions',
      data: { column }
    }));
  };
  
  const handleAddTask = () => {
    dispatch(openModal({
      modalType: 'createTask',
      data: { columnId: column.id, boardId: column.boardId }
    }));
  };
  
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className="column"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div 
            className="column-header"
            {...provided.dragHandleProps}
          >
            <div className="column-title-container">
              <h3 className="column-title">{column.title}</h3>
              <div className="task-count">{column.tasks.length}</div>
            </div>
            <button 
              className="btn-icon"
              onClick={handleColumnOptions}
              aria-label="Column Options"
            >
              <FaEllipsisH />
            </button>
          </div>
          
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.tasks.map((task, taskIndex) => (
                  <Task 
                    key={task.id} 
                    task={task} 
                    index={taskIndex} 
                  />
                ))}
                {provided.placeholder}
                
                {column.tasks.length === 0 && (
                  <div className="empty-column">
                    <p>No tasks</p>
                  </div>
                )}
              </div>
            )}
          </Droppable>
          
          <div className="column-footer">
            <button 
              className="add-task-button"
              onClick={handleAddTask}
            >
              <FaPlus />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
