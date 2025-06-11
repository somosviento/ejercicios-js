import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  if (todos.length === 0) {
    return <div className="empty-list">No todos yet. Add one above!</div>;
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
      <div className="todo-count">
        {todos.length} {todos.length === 1 ? 'todo' : 'todos'} ({todos.filter(todo => todo.completed).length} completed)
      </div>
    </div>
  );
}

export default TodoList;
