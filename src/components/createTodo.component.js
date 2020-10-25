import React, { Component } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/todos/add';


export default class CreateTodo extends Component {
    
  
    constructor(props) {
        super(props);

        this.state = {
            todo_description: '',
            todo_completed: false
        }

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Descripcion: ${this.state.todo_description}`);
        

        const nuevaTarea = {
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        };

        axios.post(apiUrl, nuevaTarea)
        .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_completed: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Crear nueva tarea</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Descripción</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Guardar Tarea" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}