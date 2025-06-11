import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Droppable } from 'react-beautiful-dnd';
import { FaPlus } from 'react-icons/fa';
import { selectActiveBoard, selectActiveBoardColumns, selectTasks } from '../store/slices/boardSlice';
import { openModal } from '../store/slices/uiSlice';
import { filterTask, sortTasks } from '../utils/mockApi';
import Column from './Column';
import './BoardView.css';

const BoardView = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  const columns = useSelector(selectActiveBoardColumns);
  const { entities: tasks } = useSelector(selectTasks);
  const { filters, sortBy, sortDirection } = useSelector(state => ({
    filters: state.ui.filters,
    sortBy: state.ui.sortBy,
    sortDirection: state.ui.sortDirection
  }));
  
  // Get filtered and sorted tasks for each column
  const processedColumns = useMemo(() => {
    if (!columns) return [];
    
    return columns.map(column => {
      // Get tasks for this column
      const columnTasks = column.taskIds
        .map(taskId => tasks[taskId])
        .filter(Boolean);
      
      // Apply filters
      const filteredTasks = columnTasks.filter(task => 
        filterTask(task, filters)
      );
      
      // Apply sorting
      const sortedTasks = sortTasks(filteredTasks, sortBy, sortDirection);
      
      return {
        ...column,
        tasks: sortedTasks
      };
    });
  }, [columns, tasks, filters, sortBy, sortDirection]);
  
  const handleAddColumn = () => {
    dispatch(openModal({
      modalType: 'createColumn',
      data: { boardId: activeBoard.id }
    }));
  };
  
  if (!activeBoard) return null;
  
  return (
    <div className="board-view">
      <div className="board-header">
        <div className="board-info">
          <h2 className="board-title">{activeBoard.title}</h2>
          {activeBoard.description && (
            <p className="board-description">{activeBoard.description}</p>
          )}
        </div>
      </div>
      
      <Droppable 
        droppableId="all-columns" 
        direction="horizontal" 
        type="column"
      >
        {(provided) => (
          <div 
            className="board-columns"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {processedColumns.map((column, index) => (
              <Column 
                key={column.id} 
                column={column} 
                index={index} 
              />
            ))}
            {provided.placeholder}
            
            <div className="add-column">
              <button 
                className="add-column-button"
                onClick={handleAddColumn}
              >
                <FaPlus />
                <span>Add Column</span>
              </button>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BoardView;
