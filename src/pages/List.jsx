import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const List = () => {
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [completed, setCompleted] = useState(false)
    const [id, setId] = useState('')

    const [libelle, setLibelle] = useState('Create')
    const [theme, setTheme] = useState('btn btn-primary')

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:3500/todos')
        const data = response.data
        setTodos(data)
    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {title, body, completed}

        if(id) {
            axios
                .put(`http://localhost:3500/todos/${id}`, data )
                .then((response) => {
                    setTodos(todos.map((todo) => {
                        if (todo.id === id) {
                            console.log(todo);
                          return {
                            ...todo,
                            title: response.data.title,
                            body: response.data.body,
                            completed: response.data.completed,
                          };
                        } else {
                          return todo;
                        }
                      }));
                      setTheme('btn btn-primary')
                      setLibelle('Create')
                      setTitle('')
                      setBody('')
                      setCompleted(false)
                })
                .catch((err) => console.log(err))
        }else{
            axios
                .post('http://localhost:3500/todos', data )
                .then((response) => {
                    setTitle('')
                    setBody('')
                    setCompleted(false)
                    setTodos([...todos, response.data]);
                })
                .catch((err) => console.log(err))
        }

    }

    const handleDelete = (id) => {
        console.log(id);
        axios
            .delete('http://localhost:3500/todos/' + id)
            .then((response) => {
                setTodos(todos.filter((todo) => todo.id !== id))
            })
            .catch((err) => console.log(err))
    }
    
    const handleUdpate = (id) => {
        axios
        .get('http://localhost:3500/todos/' + id)
            .then((response) => {
                setId(id)
                setTitle(response.data.title)
                setBody(response.data.body)
                setCompleted(response.data.completed)
                setTheme('btn btn-warning')
                setLibelle('Update')
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <>
            <div className="container">
            <h2>Liste</h2>

            <form onSubmit={handleSubmit} className='mb-3'>
                <div className="mb-3">
                    <label htmlFor="">Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Body</label>
                    <input type="text" className="form-control" value={body} onChange={(e) => setBody(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <input type="checkbox" className="" checked={completed} onChange={(e) => setCompleted(e.target.checked)}/>
                    <label htmlFor="">Completed</label>
                </div>
                <button type="submit" className={theme}>{libelle}</button>
            </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Body</th>
                            <th>Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos?.map((todo) => (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.title}</td>
                                    <td>{todo.body}</td>
                                    <td>{todo.completed ? "on" : "off"}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => handleUdpate(todo.id)}>edit</button>
                                        <button className="btn btn-danger ms-2" onClick={() => handleDelete(todo.id)}>delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </>
    )
}
export default List