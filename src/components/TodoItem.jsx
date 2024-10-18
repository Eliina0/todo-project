import React, { useState } from 'react';
import Button from './Button'; 

const TodoItem = ({ todo, handleDelete, handleEdit, toggleCompleted }) => {
    const [isBeingUpdated, setIsBeingUpdated] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(todo.title);
    const [updatedDescription, setUpdatedDescription] = useState(todo.description);

    const handleSave = () => {
        const updatedTask = {
            title: updatedTitle,
            description: updatedDescription,
            completed: todo.completed,
        };
        handleEdit(todo.id, updatedTask);
        setIsBeingUpdated(false);
    };

    return (
        <li>
            {isBeingUpdated ? (
                <div className='todo-item'>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <Button onClick={handleSave} style={{ color: 'green' }}>Save</Button>
                    <Button onClick={() => setIsBeingUpdated(false)} style={{ color: '#FF6347' }}>Cancel</Button>
                </div>
            ) : (
                <div className='todo-item'>
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleCompleted(todo.id, todo.completed)}
                    />
                    <div className="info">
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                    </div>
                    <div>
                        <Button onClick={() => setIsBeingUpdated(true)} style={{ color: 'green' }}>Edit</Button>
                        <Button onClick={() => handleDelete(todo.id)} style={{ color: '#FF6347' }}>Delete</Button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default TodoItem;
