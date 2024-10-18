import React, { useState, useMemo } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TaskCount from './components/TaskCount';
import useFetchTodos from './customHook/useFetchTodos';
import './App.css';

const App = () => {
  const { data: todos, setData: setTodos, loading, error } = useFetchTodos();
  const [showCompleted, setShowCompleted] = useState(false);
  
  const handleToggleCompleted = () => {
    setShowCompleted(prev => !prev);
  };

  const getCompletedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  const getUndoneTaskCount = useMemo(() => {
    return todos.length - getCompletedCount;
  }, [todos, getCompletedCount]);

  const filteredTodos = useMemo(() => {
    return showCompleted ? todos.filter(todo => todo.completed) : todos;
}, [todos, showCompleted]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoInput setTodos={setTodos} />
      <label>
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={handleToggleCompleted}
        />
        Show Completed Tasks
      </label>
      
      {filteredTodos.length === 0 ? (
        <p className='no-task'>No tasks available. Please add some!</p>
      ) : (
        <TodoList setTodos={setTodos} todos={filteredTodos} />
      )}

     <TaskCount completedCount={getCompletedCount} undoneCount={getUndoneTaskCount} />
    </div>
  );
};

export default App;
