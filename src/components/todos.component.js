import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/todos/';


const Todo = props => (
    <tr>
        <td>{props.todo.todo_description}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Editar Tarea</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get(apiUrl)
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        return (
            <div>
            <h3>Listado de tareas</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    { this.todoList() }
                </tbody>
            </table>
        </div>
        )
    }
}