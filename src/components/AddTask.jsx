import { useState } from "react"
import { Link } from "react-router-dom";
const AddTask = ()=>{
    const [todos, setTodos] = useState([]);
    const [newTodo,setNewTodo] = useState("")

    
    console.log(newTodo)


    const addNewTodo = async () =>{
        // Vérifier si le champ est vide
        if (!newTodo.trim()) {
            return; // Ne rien faire si le champ est vide
        }
    
        const data =  await fetch('http://localhost:4500/api/v1/todo',{
            method : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text : newTodo
            })
        }).then(res => res.json());
        setTodos([...todos, data]);
        setNewTodo("");
    }
    
    return (

        <>
        <div className="bg-gray-200 flex flex-col p-10 w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto my-10 rounded shadow-md">
            <label htmlFor="task">Ajouter une tache ici!!</label>
            <input type="text" name="task" value={newTodo} id="task" placeholder="Ajoute une tache" onChange={(e)=>{setNewTodo(e.target.value)}}/>
            <button> <Link to = '/' className="bg-green-300" onClick={addNewTodo} >
            Ajouter</Link> 
                </button>
        </div>
      </>
    )
}

export default AddTask