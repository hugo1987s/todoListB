import React, { Component } from 'react';
import axios from 'axios';

const apiUrlGetInfo = 'http://localhost:5000/todos/';
const apiUrlUpdateInfo = 'http://localhost:5000/todos/update/';

export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_completed: false
        }
    }

    componentDidMount() {
        axios.get(apiUrlGetInfo + this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }
    
    onChangeTodoCompleted(e) {
        this.setState({
            todo_completed: !this.state.todo_completed
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        };

        console.log(obj);
        axios.post(apiUrlUpdateInfo +this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3 align="center">Editar Tarea</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Descripción</label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completada
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Guardar cambios" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}