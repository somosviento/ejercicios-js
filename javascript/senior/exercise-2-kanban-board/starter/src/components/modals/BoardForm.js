import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createBoard, updateBoard } from '../../store/slices/boardSlice';
import './FormStyles.css';

const BoardForm = ({ board, onClose }) => {
  const dispatch = useDispatch();
  const isEditMode = !!board;
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: isEditMode ? {
      title: board.title,
      description: board.description || ''
    } : {
      title: '',
      description: ''
    }
  });
  
  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await dispatch(updateBoard({
          id: board.id,
          changes: data
        })).unwrap();
      } else {
        await dispatch(createBoard(data)).unwrap();
      }
      onClose();
    } catch (error) {
      console.error('Failed to save board:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="form-group">
        <label htmlFor="title" className="form-label">Board Title</label>
        <input
          id="title"
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          placeholder="Enter board title"
          {...register('title', { 
            required: 'Board title is required',
            maxLength: {
              value: 50,
              message: 'Title cannot exceed 50 characters'
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
          placeholder="Enter board description"
          rows={4}
          {...register('description', {
            maxLength: {
              value: 200,
              message: 'Description cannot exceed 200 characters'
            }
          })}
        />
        {errors.description && (
          <div className="invalid-feedback">{errors.description.message}</div>
        )}
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
          {isSubmitting ? 'Saving...' : isEditMode ? 'Update Board' : 'Create Board'}
        </button>
      </div>
    </form>
  );
};

export default BoardForm;
