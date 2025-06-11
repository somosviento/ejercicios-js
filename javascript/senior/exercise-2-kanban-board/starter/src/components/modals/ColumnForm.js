import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { 
  createColumn, 
  updateColumn, 
  deleteColumn 
} from '../../store/slices/boardSlice';
import { openModal } from '../../store/slices/uiSlice';
import './FormStyles.css';

const ColumnForm = ({ column, boardId, onClose, isOptionsView = false }) => {
  const dispatch = useDispatch();
  const isEditMode = !!column;
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: isEditMode ? {
      title: column.title,
      wip: column.wip || 0
    } : {
      title: '',
      wip: 0
    }
  });
  
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await dispatch(updateColumn({
          id: column.id,
          changes: data
        })).unwrap();
      } else {
        await dispatch(createColumn({
          boardId,
          ...data
        })).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save column:', error);
    }
  };
  
  const handleDelete = () => {
    dispatch(openModal({
      modalType: 'deleteConfirmation',
      data: {
        itemType: 'column',
        itemId: column.id,
        title: column.title,
        onConfirm: () => dispatch(deleteColumn(column.id))
      }
    }));
    onClose();
  };
  
  // If this is just the options view, show edit and delete buttons
  if (isOptionsView) {
    return (
      <div className="column-options">
        <button 
          className="btn btn-block btn-with-icon"
          onClick={() => {
            onClose();
            dispatch(openModal({
              modalType: 'editColumn',
              data: { column }
            }));
          }}
        >
          <FaEdit /> Edit Column
        </button>
        
        <button 
          className="btn btn-block btn-danger btn-with-icon"
          onClick={handleDelete}
        >
          <FaTrash /> Delete Column
        </button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">Column Title</label>
        <input
          id="title"
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          placeholder="Enter column title"
          {...register('title', { 
            required: 'Column title is required',
            maxLength: {
              value: 30,
              message: 'Title cannot exceed 30 characters'
            }
          })}
        />
        {errors.title && (
          <div className="invalid-feedback">{errors.title.message}</div>
        )}
      </div>
      
      <div className="form-group">
        <label htmlFor="wip" className="form-label">WIP Limit (0 = no limit)</label>
        <input
          id="wip"
          type="number"
          min="0"
          className={`form-control ${errors.wip ? 'is-invalid' : ''}`}
          {...register('wip', {
            valueAsNumber: true,
            min: {
              value: 0,
              message: 'WIP limit cannot be negative'
            }
          })}
        />
        {errors.wip && (
          <div className="invalid-feedback">{errors.wip.message}</div>
        )}
        <div className="form-hint">
          Work-in-Progress limit restricts the number of tasks in this column
        </div>
      </div>
      
      <div className="form-actions">
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
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Column' : 'Create Column'}
        </button>
      </div>
    </form>
  );
};

export default ColumnForm;
