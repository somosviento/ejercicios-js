import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { mockApiCall } from '../../utils/mockApi';

// Sample initial data
const initialData = {
  boards: {
    'board-1': {
      id: 'board-1',
      title: 'Project Alpha',
      description: 'Main development board for Project Alpha',
      columnOrder: ['column-1', 'column-2', 'column-3'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      boardId: 'board-1',
      taskIds: ['task-1', 'task-2', 'task-3'],
      createdAt: new Date().toISOString(),
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      boardId: 'board-1',
      taskIds: ['task-4'],
      createdAt: new Date().toISOString(),
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      boardId: 'board-1',
      taskIds: ['task-5'],
      createdAt: new Date().toISOString(),
    },
  },
  tasks: {
    'task-1': {
      id: 'task-1',
      title: 'Research API options',
      description: 'Evaluate different API options for the backend',
      priority: 'high',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: 'user-1',
      columnId: 'column-1',
      boardId: 'board-1',
      createdAt: new Date().toISOString(),
    },
    'task-2': {
      id: 'task-2',
      title: 'Create wireframes',
      description: 'Design initial wireframes for the dashboard',
      priority: 'medium',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: 'user-2',
      columnId: 'column-1',
      boardId: 'board-1',
      createdAt: new Date().toISOString(),
    },
    'task-3': {
      id: 'task-3',
      title: 'Setup development environment',
      description: 'Configure development environment and tools',
      priority: 'low',
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: null,
      columnId: 'column-1',
      boardId: 'board-1',
      createdAt: new Date().toISOString(),
    },
    'task-4': {
      id: 'task-4',
      title: 'Implement authentication',
      description: 'Create user authentication system with JWT',
      priority: 'high',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: 'user-1',
      columnId: 'column-2',
      boardId: 'board-1',
      createdAt: new Date().toISOString(),
    },
    'task-5': {
      id: 'task-5',
      title: 'Project setup',
      description: 'Initialize project repository and documentation',
      priority: 'medium',
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      assignedTo: 'user-2',
      columnId: 'column-3',
      boardId: 'board-1',
      createdAt: new Date().toISOString(),
    },
  },
};

// Create entity adapters
const boardsAdapter = createEntityAdapter();
const columnsAdapter = createEntityAdapter();
const tasksAdapter = createEntityAdapter();

// Async thunks
export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      const data = await mockApiCall(() => initialData, 1000);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (boardData, { rejectWithValue }) => {
    try {
      const newBoard = {
        id: `board-${uuidv4()}`,
        ...boardData,
        columnOrder: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Simulate API call
      await mockApiCall(() => {}, 500);
      return newBoard;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async (boardData, { rejectWithValue }) => {
    try {
      const updatedBoard = {
        ...boardData,
        updatedAt: new Date().toISOString(),
      };
      
      // Simulate API call
      await mockApiCall(() => {}, 500);
      return updatedBoard;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId, { rejectWithValue }) => {
    try {
      // Simulate API call
      await mockApiCall(() => {}, 500);
      return boardId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createColumn = createAsyncThunk(
  'boards/createColumn',
  async ({ boardId, title }, { rejectWithValue }) => {
    try {
      const newColumn = {
        id: `column-${uuidv4()}`,
        title,
        boardId,
        taskIds: [],
        createdAt: new Date().toISOString(),
      };
      
      // Simulate API call
      await mockApiCall(() => {}, 500);
      return newColumn;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateColumn = createAsyncThunk(
  'boards/updateColumn',
  async (columnData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await mockApiCall(() => {}, 500);
      return columnData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteColumn = createAsyncThunk(
  'boards/deleteColumn',
  async ({ columnId, boardId }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await mockApiCall(() => {}, 500);
      return { columnId, boardId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTask = createAsyncThunk(
  'boards/createTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const newTask = {
        id: `task-${uuidv4()}`,
        ...taskData,
        createdAt: new Date().toISOString(),
      };
      
      // Simulate API call
      await mockApiCall(() => {}, 500);
      return newTask;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'boards/updateTask',
  async (taskData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await mockApiCall(() => {}, 500);
      return taskData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'boards/deleteTask',
  async ({ taskId, columnId }, { rejectWithValue }) => {
    try {
      // Simulate API call
      await mockApiCall(() => {}, 500);
      return { taskId, columnId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the slice
const boardSlice = createSlice({
  name: 'boards',
  initialState: {
    boards: boardsAdapter.getInitialState(),
    columns: columnsAdapter.getInitialState(),
    tasks: tasksAdapter.getInitialState(),
    activeBoard: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    setActiveBoard: (state, action) => {
      state.activeBoard = action.payload;
    },
    moveTask: (state, action) => {
      const { sourceColumnId, destinationColumnId, sourceIndex, destinationIndex } = action.payload;
      
      // Get the source and destination columns
      const sourceColumn = state.columns.entities[sourceColumnId];
      const destinationColumn = state.columns.entities[destinationColumnId];
      
      if (!sourceColumn || !destinationColumn) return;
      
      // Create new taskIds arrays
      const sourceTaskIds = [...sourceColumn.taskIds];
      const destinationTaskIds = sourceColumnId === destinationColumnId 
        ? sourceTaskIds 
        : [...destinationColumn.taskIds];
      
      // Remove the task from source
      const [removedTaskId] = sourceTaskIds.splice(sourceIndex, 1);
      
      // Insert the task at the destination
      destinationTaskIds.splice(destinationIndex, 0, removedTaskId);
      
      // Update the columns
      state.columns.entities[sourceColumnId].taskIds = sourceTaskIds;
      
      if (sourceColumnId !== destinationColumnId) {
        state.columns.entities[destinationColumnId].taskIds = destinationTaskIds;
        // Update the task's columnId
        state.tasks.entities[removedTaskId].columnId = destinationColumnId;
      }
    },
    moveColumn: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      
      if (!state.activeBoard) return;
      
      const board = state.boards.entities[state.activeBoard];
      if (!board) return;
      
      // Create a new column order array
      const newColumnOrder = [...board.columnOrder];
      
      // Remove the column from source
      const [removedColumnId] = newColumnOrder.splice(sourceIndex, 1);
      
      // Insert the column at the destination
      newColumnOrder.splice(destinationIndex, 0, removedColumnId);
      
      // Update the board
      state.boards.entities[state.activeBoard].columnOrder = newColumnOrder;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchBoards
      .addCase(fetchBoards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
        // Initialize with the fetched data
        boardsAdapter.setAll(state.boards, action.payload.boards);
        columnsAdapter.setAll(state.columns, action.payload.columns);
        tasksAdapter.setAll(state.tasks, action.payload.tasks);
        
        // Set the first board as active if no active board
        if (!state.activeBoard && state.boards.ids.length > 0) {
          state.activeBoard = state.boards.ids[0];
        }
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch boards';
      })
      
      // Handle createBoard
      .addCase(createBoard.fulfilled, (state, action) => {
        boardsAdapter.addOne(state.boards, action.payload);
        state.activeBoard = action.payload.id;
      })
      
      // Handle updateBoard
      .addCase(updateBoard.fulfilled, (state, action) => {
        boardsAdapter.upsertOne(state.boards, action.payload);
      })
      
      // Handle deleteBoard
      .addCase(deleteBoard.fulfilled, (state, action) => {
        const boardId = action.payload;
        
        // Get all columns for this board
        const columnsToDelete = Object.values(state.columns.entities)
          .filter(column => column.boardId === boardId)
          .map(column => column.id);
        
        // Get all tasks for this board
        const tasksToDelete = Object.values(state.tasks.entities)
          .filter(task => task.boardId === boardId)
          .map(task => task.id);
        
        // Remove tasks and columns
        tasksAdapter.removeMany(state.tasks, tasksToDelete);
        columnsAdapter.removeMany(state.columns, columnsToDelete);
        
        // Remove board
        boardsAdapter.removeOne(state.boards, boardId);
        
        // Set a new active board if needed
        if (state.activeBoard === boardId) {
          state.activeBoard = state.boards.ids.length > 0 ? state.boards.ids[0] : null;
        }
      })
      
      // Handle createColumn
      .addCase(createColumn.fulfilled, (state, action) => {
        const newColumn = action.payload;
        
        // Add the column
        columnsAdapter.addOne(state.columns, newColumn);
        
        // Update the board's columnOrder
        const board = state.boards.entities[newColumn.boardId];
        if (board) {
          board.columnOrder.push(newColumn.id);
        }
      })
      
      // Handle updateColumn
      .addCase(updateColumn.fulfilled, (state, action) => {
        columnsAdapter.upsertOne(state.columns, action.payload);
      })
      
      // Handle deleteColumn
      .addCase(deleteColumn.fulfilled, (state, action) => {
        const { columnId, boardId } = action.payload;
        
        // Get all tasks in this column
        const tasksToDelete = Object.values(state.tasks.entities)
          .filter(task => task.columnId === columnId)
          .map(task => task.id);
        
        // Remove tasks
        tasksAdapter.removeMany(state.tasks, tasksToDelete);
        
        // Remove column
        columnsAdapter.removeOne(state.columns, columnId);
        
        // Update the board's columnOrder
        const board = state.boards.entities[boardId];
        if (board) {
          board.columnOrder = board.columnOrder.filter(id => id !== columnId);
        }
      })
      
      // Handle createTask
      .addCase(createTask.fulfilled, (state, action) => {
        const newTask = action.payload;
        
        // Add the task
        tasksAdapter.addOne(state.tasks, newTask);
        
        // Update the column's taskIds
        const column = state.columns.entities[newTask.columnId];
        if (column) {
          column.taskIds.push(newTask.id);
        }
      })
      
      // Handle updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const oldTask = state.tasks.entities[updatedTask.id];
        
        // If the column changed
        if (oldTask && oldTask.columnId !== updatedTask.columnId) {
          // Remove from old column
          const oldColumn = state.columns.entities[oldTask.columnId];
          if (oldColumn) {
            oldColumn.taskIds = oldColumn.taskIds.filter(id => id !== updatedTask.id);
          }
          
          // Add to new column
          const newColumn = state.columns.entities[updatedTask.columnId];
          if (newColumn) {
            newColumn.taskIds.push(updatedTask.id);
          }
        }
        
        // Update the task
        tasksAdapter.upsertOne(state.tasks, updatedTask);
      })
      
      // Handle deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { taskId, columnId } = action.payload;
        
        // Remove task
        tasksAdapter.removeOne(state.tasks, taskId);
        
        // Update the column's taskIds
        const column = state.columns.entities[columnId];
        if (column) {
          column.taskIds = column.taskIds.filter(id => id !== taskId);
        }
      });
  },
});

// Export actions
export const { setActiveBoard, moveTask, moveColumn } = boardSlice.actions;

// Export selectors
export const selectBoards = state => state.boards.boards;
export const selectColumns = state => state.boards.columns;
export const selectTasks = state => state.boards.tasks;
export const selectActiveBoard = state => {
  const { activeBoard, boards } = state.boards;
  return activeBoard ? boards.entities[activeBoard] : null;
};
export const selectActiveBoardColumns = state => {
  const activeBoard = selectActiveBoard(state);
  if (!activeBoard) return [];
  
  return activeBoard.columnOrder
    .map(columnId => state.boards.columns.entities[columnId])
    .filter(Boolean);
};

// Export reducer
export default boardSlice.reducer;
