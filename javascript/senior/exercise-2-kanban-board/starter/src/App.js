import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { fetchBoards, selectActiveBoard, moveTask, moveColumn } from './store/slices/boardSlice';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BoardView from './components/BoardView';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { status, error, activeBoard } = useSelector(state => state.boards);
  
  // Fetch boards on component mount
  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);
  
  // Handle drag end for tasks and columns
  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    
    // Dropped outside the list
    if (!destination) return;
    
    // Dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    
    // Handle column reordering
    if (type === 'column') {
      dispatch(moveColumn({
        sourceIndex: source.index,
        destinationIndex: destination.index,
      }));
      return;
    }
    
    // Handle task movement
    dispatch(moveTask({
      sourceColumnId: source.droppableId,
      destinationColumnId: destination.droppableId,
      sourceIndex: source.index,
      destinationIndex: destination.index,
    }));
  };
  
  // Show loading state
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  
  // Show error state
  if (status === 'failed') {
    return <ErrorMessage message={error} />;
  }
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app">
        <Header />
        <div className="app-container">
          <Sidebar />
          <main className="main-content">
            {activeBoard ? (
              <BoardView />
            ) : (
              <div className="no-board-selected">
                <h2>No board selected</h2>
                <p>Select a board from the sidebar or create a new one</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
