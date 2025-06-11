import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { 
  createTask, 
  updateTask,
  deleteTask,
  selectActiveBoardColumns
} from '../../store/slices/boardSlice';
import { openModal } from '../../store/slices/uiSlice';
import { FaTrash } from 'react-icons/fa';
import './FormStyles.css';

const TaskForm = ({ task, boardId, columnId, onClose }) => {
  const dispatch = useDispatch();
  const isEditMode = !!task;
  const columns = useSelector(selectActiveBoardColumns);
  const { entities: users } = useSelector(state => state.users);
  
  // If editing, use the task's boardId
  const activeBoardId = isEditMode ? task.boardId : boardId;
  
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: isEditMode ? {
      title: task.title,
      description: task.description || '',
      columnId: task.columnId,
      priority: task.priority || 'medium',
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      assignedTo: task.assignedTo || ''
    } : {
      title: '',
      description: '',
      columnId: columnId || '',
      priority: 'medium',
      dueDate: '',
      assignedTo: ''
    }
  });
  
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await dispatch(updateTask({
          id: task.id,
          changes: data
        })).unwrap();
      } else {
        await dispatch(createTask({
          boardId: activeBoardId,
          ...data
        })).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };
  
  const handleDelete = () => {
    dispatch(openModal({
      modalType: 'deleteConfirmation',
      data: {
        itemType: 'task',
        itemId: task.id,
        title: task.title,
        onConfirm: () => dispatch(deleteTask(task.id))
      }
    }));
    onClose();
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">Task Title</label>
        <input
          id="title"
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          placeholder="Enter task title"
          {...register('title', { 
            required: 'Task title is required',
            maxLength: {
              value: 100,
              message: 'Title cannot exceed 100 characters'
            }
          })}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="description" className="form-label">Description (optional)</label>
        <textarea
          id="description"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          placeholder="Enter task description"
          rows={3}
          {...register('description', {
            maxLength: {
              value: 500,
              message: 'Description cannot exceed 500 characters'
            }
          })}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="columnId" className="form-label">Status</label>
          <select
            id="columnId"
            className={`form-control ${errors.columnId ? 'is-invalid' : ''}`}
            {...register('columnId', { 
              required: 'Column is required' 
            })}
          >
            <option value="">Select status</option>
            {columns?.map(column => (
              <option key={column.id} value={column.id}>
                {column.title}
              </option>
            ))}
          </select>
          {errors.columnId && (
            <div className="invalid-feedback">{errors.columnId.message}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="priority" className="form-label">Priority</label>
          <select
            id="priority"
            className="form-control"
            {...register('priority')}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dueDate" className="form-label">Due Date (optional)</label>
          <input
            id="dueDate"
            type="date"
            className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
            {...register('dueDate')}
          />
          {errors.dueDate && (
            <div className="invalid-feedback">{errors.dueDate.message}</div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="assignedTo" className="form-label">Assigned To (optional)</label>
          <select
            id="assignedTo"
            className="form-control"
            {...register('assignedTo')}
          >
            <option value="">Unassigned</option>
            {Object.values(users).map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="form-actions">
        {isEditMode && (
          <button 
            type="button" 
            className="btn btn-danger mr-auto"
            onClick={handleDelete}
          >
            <FaTrash /> Delete
          </button>
        )}
        
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={onClose}
        >
          Cancel
        </button>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
