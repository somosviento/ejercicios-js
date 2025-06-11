import { v4 as uuidv4 } from 'uuid';

// Generate random dates within a range
const getRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Current date and date ranges
const now = new Date();
const pastDate = new Date(now);
pastDate.setDate(now.getDate() - 30);
const futureDate = new Date(now);
futureDate.setDate(now.getDate() + 30);

// Initial users data
export const initialUsers = {
  ids: ['user1', 'user2', 'user3', 'user4'],
  entities: {
    'user1': {
      id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'admin'
    },
    'user2': {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'developer'
    },
    'user3': {
      id: 'user3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'designer'
    },
    'user4': {
      id: 'user4',
      name: 'Alice Williams',
      email: 'alice@example.com',
      avatar: 'https://i.pravatar.cc/150?img=9',
      role: 'product'
    }
  }
};

// Initial boards data
export const initialBoards = {
  ids: ['board1', 'board2'],
  entities: {
    'board1': {
      id: 'board1',
      title: 'Project Alpha',
      description: 'Main development board for Project Alpha',
      columnOrder: ['column1', 'column2', 'column3'],
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'board2': {
      id: 'board2',
      title: 'Marketing Campaign',
      description: 'Q3 Marketing Campaign Planning',
      columnOrder: ['column4', 'column5', 'column6'],
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    }
  }
};

// Initial columns data
export const initialColumns = {
  ids: ['column1', 'column2', 'column3', 'column4', 'column5', 'column6'],
  entities: {
    'column1': {
      id: 'column1',
      title: 'To Do',
      boardId: 'board1',
      taskIds: ['task1', 'task2', 'task3'],
      wip: 0,
      createdAt: pastDate.toISOString()
    },
    'column2': {
      id: 'column2',
      title: 'In Progress',
      boardId: 'board1',
      taskIds: ['task4', 'task5'],
      wip: 3,
      createdAt: pastDate.toISOString()
    },
    'column3': {
      id: 'column3',
      title: 'Done',
      boardId: 'board1',
      taskIds: ['task6'],
      wip: 0,
      createdAt: pastDate.toISOString()
    },
    'column4': {
      id: 'column4',
      title: 'Ideas',
      boardId: 'board2',
      taskIds: ['task7', 'task8'],
      wip: 0,
      createdAt: pastDate.toISOString()
    },
    'column5': {
      id: 'column5',
      title: 'Planning',
      boardId: 'board2',
      taskIds: ['task9'],
      wip: 2,
      createdAt: pastDate.toISOString()
    },
    'column6': {
      id: 'column6',
      title: 'Completed',
      boardId: 'board2',
      taskIds: ['task10'],
      wip: 0,
      createdAt: pastDate.toISOString()
    }
  }
};

// Initial tasks data
export const initialTasks = {
  ids: ['task1', 'task2', 'task3', 'task4', 'task5', 'task6', 'task7', 'task8', 'task9', 'task10'],
  entities: {
    'task1': {
      id: 'task1',
      title: 'Research API integration options',
      description: 'Evaluate different API integration approaches and select the best one for our needs',
      priority: 'high',
      columnId: 'column1',
      boardId: 'board1',
      assignedTo: 'user2',
      dueDate: getRandomDate(now, futureDate).toISOString(),
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'task2': {
      id: 'task2',
      title: 'Design database schema',
      description: 'Create the initial database schema for the project',
      priority: 'medium',
      columnId: 'column1',
      boardId: 'board1',
      assignedTo: 'user3',
      dueDate: getRandomDate(now, futureDate).toISOString(),
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'task3': {
      id: 'task3',
      title: 'Setup CI/CD pipeline',
      description: 'Configure the CI/CD pipeline for automated testing and deployment',
      priority: 'low',
      columnId: 'column1',
      boardId: 'board1',
      assignedTo: null,
      dueDate: null,
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'task4': {
      id: 'task4',
      title: 'Implement user authentication',
      description: 'Add user authentication functionality using JWT',
      priority: 'high',
      columnId: 'column2',
      boardId: 'board1',
      assignedTo: 'user2',
      dueDate: getRandomDate(pastDate, now).toISOString(),
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'task5': {
      id: 'task5',
      title: 'Create responsive UI components',
      description: 'Develop reusable UI components that work across different screen sizes',
      priority: 'medium',
      columnId: 'column2',
      boardId: 'board1',
      assignedTo: 'user3',
      dueDate: getRandomDate(now, futureDate).toISOString(),
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'task6': {
      id: 'task6',
      title: 'Write unit tests',
      description: 'Create comprehensive unit tests for core functionality',
      priority: 'medium',
      columnId: 'column3',
      boardId: 'board1',
      assignedTo: 'user2',
      dueDate: getRandomDate(pastDate, now).toISOString(),
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'task7': {
      id: 'task7',
      title: 'Social media campaign ideas',
      description: 'Brainstorm ideas for the upcoming social media campaign',
      priority: 'medium',
      columnId: 'column4',
      boardId: 'board2',
      assignedTo: 'user4',
      dueDate: getRandomDate(now, futureDate).toISOString(),
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'task8': {
      id: 'task8',
      title: 'Email newsletter template',
      description: 'Design a new template for the monthly newsletter',
      priority: 'low',
      columnId: 'column4',
      boardId: 'board2',
      assignedTo: 'user3',
      dueDate: getRandomDate(now, futureDate).toISOString(),
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'task9': {
      id: 'task9',
      title: 'Budget allocation',
      description: 'Allocate budget for different marketing channels',
      priority: 'high',
      columnId: 'column5',
      boardId: 'board2',
      assignedTo: 'user1',
      dueDate: getRandomDate(pastDate, now).toISOString(),
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    },
    'task10': {
      id: 'task10',
      title: 'Competitor analysis',
      description: 'Complete analysis of top 5 competitors',
      priority: 'high',
      columnId: 'column6',
      boardId: 'board2',
      assignedTo: 'user4',
      dueDate: getRandomDate(pastDate, now).toISOString(),
      createdAt: pastDate.toISOString(),
      updatedAt: now.toISOString()
    }
  }
};

// Function to generate a new task
export const generateTask = (data) => {
  const id = uuidv4();
  const now = new Date().toISOString();
  
  return {
    id,
    title: data.title,
    description: data.description || '',
    priority: data.priority || 'medium',
    columnId: data.columnId,
    boardId: data.boardId,
    assignedTo: data.assignedTo || null,
    dueDate: data.dueDate || null,
    createdAt: now,
    updatedAt: now
  };
};

// Function to generate a new column
export const generateColumn = (data) => {
  const id = uuidv4();
  const now = new Date().toISOString();
  
  return {
    id,
    title: data.title,
    boardId: data.boardId,
    taskIds: [],
    wip: data.wip || 0,
    createdAt: now
  };
};

// Function to generate a new board
export const generateBoard = (data) => {
  const id = uuidv4();
  const now = new Date().toISOString();
  
  return {
    id,
    title: data.title,
    description: data.description || '',
    columnOrder: [],
    createdAt: now,
    updatedAt: now
  };
};
