import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaBars, FaPlus, FaSearch, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { toggleSidebar, openModal, setFilter, toggleSortDirection } from '../store/slices/uiSlice';
import { selectActiveBoard } from '../store/slices/boardSlice';
import { selectCurrentUser } from '../store/slices/userSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const activeBoard = useSelector(selectActiveBoard);
  const currentUser = useSelector(selectCurrentUser);
  const { sortDirection, filters } = useSelector(state => ({
    sortDirection: state.ui.sortDirection,
    filters: state.ui.filters
  }));
  
  const handleSearchChange = (e) => {
    dispatch(setFilter({
      filterType: 'searchTerm',
      value: e.target.value
    }));
  };
  
  const handleCreateTask = () => {
    if (!activeBoard) return;
    
    dispatch(openModal({
      modalType: 'createTask',
      data: { boardId: activeBoard.id }
    }));
  };
  
  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          className="btn-icon sidebar-toggle" 
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>
        <h1 className="app-title">Kanban Board</h1>
      </div>
      
      <div className="header-center">
        {activeBoard && (
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks..."
              className="search-input"
              value={filters.searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        )}
      </div>
      
      <div className="header-right">
        {activeBoard && (
          <>
            <button 
              className="btn-icon"
              onClick={() => dispatch(toggleSortDirection())}
              aria-label={`Sort ${sortDirection === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
            </button>
            
            <button 
              className="btn-icon"
              onClick={() => dispatch(openModal({ modalType: 'filters', data: null }))}
              aria-label="Filter Tasks"
            >
              <FaFilter />
            </button>
            
            <button 
              className="btn btn-primary create-task-btn"
              onClick={handleCreateTask}
            >
              <FaPlus /> New Task
            </button>
          </>
        )}
        
        <div className="user-profile">
          <img 
            src={currentUser?.avatar} 
            alt={currentUser?.name} 
            className="avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
