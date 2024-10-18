import React, { useState, useRef, useEffect } from 'react';
import { IoAddSharp } from "react-icons/io5";

const TodoInput = ({ setTodos }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const titleRef = useRef(null);

    console.log("re-render");
    
    useEffect(() => {
        titleRef.current.focus();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            setError('Both title and description are required');
            return;
        }

        const newTask = { title, description };

        try {
            const response = await fetch('http://localhost:8080/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });

            if (!response.ok) {
                throw new Error('Failed to add the task');
            }

            const addedTask = await response.json();
            setTodos((prevTodos) => [...prevTodos, addedTask]);

            setTitle('');
            setDescription('');
            setError(''); 
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={titleRef}
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => { setTitle(e.target.value); setError(''); }}
                />
                <input
                    type="text"
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => { setDescription(e.target.value); setError(''); }}
                />
                <button type='submit'>
                    <IoAddSharp className='icon' />
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default TodoInput;
