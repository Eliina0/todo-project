import React, { useState } from 'react';
import TodoItem from './TodoItem';

const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error('Request failed');
    }
    if (response.status === 204) {
        return; 
    }
    return await response.json();
};

const TodoList = ({ setTodos, todos }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await fetchData(`http://localhost:8080/todos/${id}`, {
                method: 'DELETE',
            });
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id, updatedTask) => {
        try {
            const data = await fetchData(`http://localhost:8080/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? data : todo)));
        } catch (error) {
            setError(error.message);
        }
    };

    const toggleCompleted = async (id, completed) => {
        const updatedTask = { completed: !completed };
        try {
            const data = await fetchData(`http://localhost:8080/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });
            setTodos(prevTodos => prevTodos.map(todo => (todo.id === id ? data : todo)));
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            {error && <p className="error">{error}</p>}
            <ul>
                {todos.length === 0 ? (
                    <p>No tasks to display</p>
                ) : (
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            toggleCompleted={toggleCompleted}
                        />
                    ))
                )}
            </ul>
            {loading && <p>Loading...</p>}
        </>
    );
};

export default TodoList;
