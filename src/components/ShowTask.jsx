import { useState, useEffect } from "react";

const ShowTask = () => {
    const [todos, setTodos] = useState([]);
    const url = 'http://localhost:4500/api/v1/todo';

    const fetchTodos = async () => {
        const res = await fetch(url);
        const myData = await res.json();
        setTodos(myData.data.todos);
    }

    useEffect(() => {
        fetchTodos()
    }, []);

    const handleDelete = async (id) => {
        await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
				"Content-Type": "application/json"
			},
        });

        setTodos(todos.filter(todo => todo._id !== id));
    }

    return (
        <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">Taches:</h2>
            <ul className="w-full">
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <li key={todo._id} className="mb-1">
                            <span className="inline-block w-full text-start bg-blue-200 text-blue-800 px-2 py-1 rounded-md mr-2 relative">
                                <button onClick={() => handleDelete(todo._id)} className="absolute inset-y-0 right-0 bg-red-500 text-white px-2 py-1 rounded-md">
                                    Delete
                                </button>
                                {todo.text}
                            </span>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">Aucune tâche pour le moment.</li>
                )}
            </ul>
        </div>
    );
};

export default ShowTask;
