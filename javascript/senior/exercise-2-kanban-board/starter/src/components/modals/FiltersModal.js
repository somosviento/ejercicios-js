import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, resetFilters, setSortBy } from '../../store/slices/uiSlice';
import './FormStyles.css';
import './FiltersModal.css';

const FiltersModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { filters, sortBy } = useSelector(state => state.ui);
  const { entities: users } = useSelector(state => state.users);
  
  const [localFilters, setLocalFilters] = useState({
    priority: filters.priority || [],
    assignedTo: filters.assignedTo || [],
    dueDateRange: {
      start: filters.dueDateRange?.start || '',
      end: filters.dueDateRange?.end || ''
    }
  });
  
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  
  const handlePriorityChange = (priority) => {
    setLocalFilters(prev => {
      const newPriorities = prev.priority.includes(priority)
        ? prev.priority.filter(p => p !== priority)
        : [...prev.priority, priority];
      
      return {
        ...prev,
        priority: newPriorities
      };
    });
  };
  
  const handleAssigneeChange = (userId) => {
    setLocalFilters(prev => {
      const newAssignees = prev.assignedTo.includes(userId)
        ? prev.assignedTo.filter(id => id !== userId)
        : [...prev.assignedTo, userId];
      
      return {
        ...prev,
        assignedTo: newAssignees
      };
    });
  };
  
  const handleDateChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      dueDateRange: {
        ...prev.dueDateRange,
        [field]: value
      }
    }));
  };
  
  const handleSortByChange = (e) => {
    setLocalSortBy(e.target.value);
  };
  
  const handleApplyFilters = () => {
    // Apply priority filter
    dispatch(setFilter({
      filterType: 'priority',
      value: localFilters.priority
    }));
    
    // Apply assignee filter
    dispatch(setFilter({
      filterType: 'assignedTo',
      value: localFilters.assignedTo
    }));
    
    // Apply date range filter
    dispatch(setFilter({
      filterType: 'dueDateRange',
      value: localFilters.dueDateRange
    }));
    
    // Apply sort
    dispatch(setSortBy(localSortBy));
    
    onClose();
  };
  
  const handleResetFilters = () => {
    dispatch(resetFilters());
    onClose();
  };
  
  return (
    <div className="filters-modal">
      <div className="form-section">
        <h3 className="form-section-title">Sort By</h3>
        <div className="sort-options">
          <label className="sort-option">
            <input
              type="radio"
              name="sortBy"
              value="title"
              checked={localSortBy === 'title'}
              onChange={handleSortByChange}
            />
            <span>Title</span>
          </label>
          
          <label className="sort-option">
            <input
              type="radio"
              name="sortBy"
              value="priority"
              checked={localSortBy === 'priority'}
              onChange={handleSortByChange}
            />
            <span>Priority</span>
          </label>
          
          <label className="sort-option">
            <input
              type="radio"
              name="sortBy"
              value="dueDate"
              checked={localSortBy === 'dueDate'}
              onChange={handleSortByChange}
            />
            <span>Due Date</span>
          </label>
          
          <label className="sort-option">
            <input
              type="radio"
              name="sortBy"
              value="createdAt"
              checked={localSortBy === 'createdAt'}
              onChange={handleSortByChange}
            />
            <span>Created Date</span>
          </label>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="form-section-title">Filter by Priority</h3>
        <div className="filter-options">
          <label className="filter-option">
            <input
              type="checkbox"
              checked={localFilters.priority.includes('high')}
              onChange={() => handlePriorityChange('high')}
            />
            <span className="priority-badge high">High</span>
          </label>
          
          <label className="filter-option">
            <input
              type="checkbox"
              checked={localFilters.priority.includes('medium')}
              onChange={() => handlePriorityChange('medium')}
            />
            <span className="priority-badge medium">Medium</span>
          </label>
          
          <label className="filter-option">
            <input
              type="checkbox"
              checked={localFilters.priority.includes('low')}
              onChange={() => handlePriorityChange('low')}
            />
            <span className="priority-badge low">Low</span>
          </label>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="form-section-title">Filter by Due Date</h3>
        <div className="date-range">
          <div className="form-group">
            <label className="form-label">From</label>
            <input
              type="date"
              className="form-control"
              value={localFilters.dueDateRange.start}
              onChange={(e) => handleDateChange('start', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">To</label>
            <input
              type="date"
              className="form-control"
              value={localFilters.dueDateRange.end}
              onChange={(e) => handleDateChange('end', e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="form-section-title">Filter by Assignee</h3>
        <div className="assignee-list">
          <label className="filter-option">
            <input
              type="checkbox"
              checked={localFilters.assignedTo.includes('unassigned')}
              onChange={() => handleAssigneeChange('unassigned')}
            />
            <span>Unassigned</span>
          </label>
          
          {Object.values(users).map(user => (
            <label key={user.id} className="filter-option">
              <input
                type="checkbox"
                checked={localFilters.assignedTo.includes(user.id)}
                onChange={() => handleAssigneeChange(user.id)}
              />
              <div className="assignee-option">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="user-avatar-sm" 
                />
                <span>{user.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      
      <div className="form-actions">
        <button 
          type="button" 
          className="btn btn-text"
          onClick={handleResetFilters}
        >
          Reset All
        </button>
        
        <div>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;
