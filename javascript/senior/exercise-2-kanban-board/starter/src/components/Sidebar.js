import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { 
  selectBoards, 
  setActiveBoard,
  deleteBoard
} from '../store/slices/boardSlice';
import { 
  selectSidebarOpen, 
  toggleSidebar, 
  openModal 
} from '../store/slices/uiSlice';
import './Sidebar.css';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { entities, ids, activeBoard } = useSelector(state => ({
    ...state.boards.boards,
    activeBoard: state.boards.activeBoard
  }));
  const sidebarOpen = useSelector(selectSidebarOpen);
  
  const handleCreateBoard = () => {
    dispatch(openModal({
      modalType: 'createBoard',
      data: null
    }));
  };
  
  const handleEditBoard = (board) => {
    dispatch(openModal({
      modalType: 'editBoard',
      data: { board }
    }));
  };
  
  const handleDeleteBoard = (boardId) => {
    dispatch(openModal({
      modalType: 'deleteConfirmation',
      data: { 
        itemType: 'board',
        itemId: boardId,
        title: entities[boardId].title,
        onConfirm: () => dispatch(deleteBoard(boardId))
      }
    }));
  };
  
  const handleSelectBoard = (boardId) => {
    dispatch(setActiveBoard(boardId));
  };
  
  if (!sidebarOpen) {
    return (
      <div className="sidebar-collapsed">
        <button 
          className="btn-icon sidebar-expand"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Expand Sidebar"
        >
          <FaPlus />
        </button>
      </div>
    );
  }
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Your Boards</h2>
        <button 
          className="btn-icon sidebar-close"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Close Sidebar"
        >
          <FaTimes />
        </button>
      </div>
      
      <div className="boards-list">
        {ids.length === 0 ? (
          <div className="no-boards">
            <p>No boards found</p>
            <small>Create your first board to get started</small>
          </div>
        ) : (
          ids.map(boardId => {
            const board = entities[boardId];
            const isActive = activeBoard === boardId;
            
            return (
              <div 
                key={boardId}
                className={`board-item ${isActive ? 'active' : ''}`}
                onClick={() => handleSelectBoard(boardId)}
              >
                <div className="board-item-title">
                  {board.title}
                </div>
                
                <div className="board-item-actions">
                  <button 
                    className="btn-icon btn-icon-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditBoard(board);
                    }}
                    aria-label="Edit Board"
                  >
                    <FaEdit />
                  </button>
                  
                  <button 
                    className="btn-icon btn-icon-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBoard(boardId);
                    }}
                    aria-label="Delete Board"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="sidebar-footer">
        <button 
          className="btn btn-primary w-full"
          onClick={handleCreateBoard}
        >
          <FaPlus /> New Board
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
