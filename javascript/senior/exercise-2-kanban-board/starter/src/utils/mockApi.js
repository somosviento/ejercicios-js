/**
 * Mock API call function to simulate network requests
 * @param {Function} callback - Function that returns the data to be resolved
 * @param {number} delay - Delay in milliseconds before resolving
 * @param {boolean} shouldFail - Whether the request should fail (for testing error handling)
 * @returns {Promise} - Promise that resolves with the data or rejects with an error
 */
export const mockApiCall = (callback, delay = 500, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('API request failed'));
      } else {
        resolve(callback());
      }
    }, delay);
  });
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Check if a date is overdue
 * @param {string} dateString - ISO date string
 * @returns {boolean} - Whether the date is overdue
 */
export const isOverdue = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Check if a date is today
 * @param {string} dateString - ISO date string
 * @returns {boolean} - Whether the date is today
 */
export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is within the next week
 * @param {string} dateString - ISO date string
 * @returns {boolean} - Whether the date is within the next week
 */
export const isThisWeek = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  return date >= today && date <= nextWeek;
};

/**
 * Check if a date is within the next month
 * @param {string} dateString - ISO date string
 * @returns {boolean} - Whether the date is within the next month
 */
export const isThisMonth = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);
  return date >= today && date <= nextMonth;
};

/**
 * Filter tasks based on filters
 * @param {Object} task - Task object
 * @param {Object} filters - Filter options
 * @returns {boolean} - Whether the task matches the filters
 */
export const filterTask = (task, filters) => {
  const { priority, assignee, dueDate, searchTerm } = filters;
  
  // Filter by priority
  if (priority && task.priority !== priority) {
    return false;
  }
  
  // Filter by assignee
  if (assignee && task.assignedTo !== assignee) {
    return false;
  }
  
  // Filter by due date
  if (dueDate) {
    if (dueDate === 'overdue' && !isOverdue(task.dueDate)) {
      return false;
    } else if (dueDate === 'today' && !isToday(task.dueDate)) {
      return false;
    } else if (dueDate === 'week' && !isThisWeek(task.dueDate)) {
      return false;
    } else if (dueDate === 'month' && !isThisMonth(task.dueDate)) {
      return false;
    }
  }
  
  // Filter by search term
  if (searchTerm && !task.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !task.description.toLowerCase().includes(searchTerm.toLowerCase())) {
    return false;
  }
  
  return true;
};

/**
 * Sort tasks based on sort options
 * @param {Array} tasks - Array of task objects
 * @param {string} sortBy - Field to sort by
 * @param {string} sortDirection - Sort direction ('asc' or 'desc')
 * @returns {Array} - Sorted array of tasks
 */
export const sortTasks = (tasks, sortBy, sortDirection) => {
  return [...tasks].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'createdAt') {
      comparison = new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'dueDate') {
      comparison = new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortBy === 'priority') {
      const priorityValues = { low: 1, medium: 2, high: 3 };
      comparison = priorityValues[a.priority] - priorityValues[b.priority];
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
};
