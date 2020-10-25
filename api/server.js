const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 5000;

let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Conexion exitosa a MongoDb");
})


todoRoutes.route('/').get(function(req, res) {
    console.log("Listando tareas");
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("sin información");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Tarea actualizada');
            })
            .catch(err => {
                res.status(400).send("Error al actualizar");
            });
    });
});

todoRoutes.route('/add').post(function(req, res) {
    console.log("agregando tarea");
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'Tarea agregada'});
        })
        .catch(err => {
            res.status(400).send('Fallo al crear la tarea');
        });
});

app.use('/todos', todoRoutes);


app.listen(PORT, function() {
    console.log("Server corriendo en el puerto: " + PORT);
});