import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/uiSlice';
import Modal from './Modal';
import BoardForm from './BoardForm';
import ColumnForm from './ColumnForm';
import TaskForm from './TaskForm';
import DeleteConfirmation from './DeleteConfirmation';
import FiltersModal from './FiltersModal';

const ModalManager = () => {
  const dispatch = useDispatch();
  const { modalType, modalProps } = useSelector(state => state.ui.modal);
  
  const handleClose = () => {
    dispatch(closeModal());
  };
  
  if (!modalType) return null;
  
  // Determine which modal to render based on modalType
  const renderModalContent = () => {
    switch (modalType) {
      case 'createBoard':
        return (
          <Modal 
            isOpen={true} 
            onClose={handleClose} 
            title="Create New Board"
          >
            <BoardForm onClose={handleClose} />
          </Modal>
        );
        
      case 'editBoard':
        return (
          <Modal 
            isOpen={true} 
            onClose={handleClose} 
            title="Edit Board"
          >
            <BoardForm 
              board={modalProps.data.board} 
              onClose={handleClose} 
            />
          </Modal>
        );
        
      case 'createColumn':
        return (
          <Modal 
            isOpen={true} 
            onClose={handleClose} 
            title="Add New Column"
            size="sm"
          >
            <ColumnForm 
              boardId={modalProps.data.boardId} 
              onClose={handleClose} 
            />
          </Modal>
        );
        
      case 'editColumn':
        return (
          <Modal 
            isOpen={true} 
            onClose={handleClose} 
            title="Edit Column"
            size="sm"
          >
            <ColumnForm 
              column={modalProps.data.column} 
              onClose={handleClose} 
            />
          </Modal>
        );
        
      case 'columnOptions':
        return (
          <Modal 
            isOpen={true} 
            onClose={handleClose} 
            title="Column Options"
            size="sm"
          >
            <ColumnForm 
              column={modalProps.data.column} 
              onClose={handleClose} 
              isOptionsView={true}
            />
          </Modal>
        );
        
      case 'createTask':
        return (
          <Modal 
            isOpen={true} 
            onClose={handleClose} 
            title="Create New Task"
          >
            <TaskForm 
              boardId={modalProps.data.boardId}
              columnId={modalProps.data.columnId}
              onClose={handleClose} 
            />
          </Modal>
        );
        
      case 'editTask':
        return (
          <Modal 
            isOpen={true} 
            onClose={handleClose} 
            title="Edit Task"
          >
            <TaskForm 
              task={modalProps.data.task} 
              onClose={handleClose} 
            />
          </Modal>
        );
        
      case 'deleteConfirmation':
        return (
          <Modal 
            isOpen={true} 
            onClose={handleClose} 
            title={`Delete ${modalProps.data.itemType}`}
            size="sm"
          >
            <DeleteConfirmation 
              itemType={modalProps.data.itemType}
              itemTitle={modalProps.data.title}
              onConfirm={modalProps.data.onConfirm}
              onClose={handleClose} 
            />
          </Modal>
        );
        
      case 'filters':
        return (
          <Modal 
            isOpen={true} 
            onClose={handleClose} 
            title="Filter Tasks"
          >
            <FiltersModal onClose={handleClose} />
          </Modal>
        );
        
      default:
        return null;
    }
  };
  
  return renderModalContent();
};

export default ModalManager;
