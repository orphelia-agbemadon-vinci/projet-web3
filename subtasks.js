const express = require('express');
const path = require('path');
const { Task, tasks } = require('./models/Task');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));



// Route pour ajouter une sous-tâche
app.post('/add-subtask/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.addSubTask(req.body.task);
        res.render('subtask', { task });
    } else {
        res.status(404).send('Task not found');
    }
    /*if (index >= 0 && index < tasks.length) {
        tasks[index].addSubTask(req.body.task);
    }
    res.render('subtask', { task: tasks[index], index });*/
});

// Route pour supprimer une sous-tâche
app.delete('/delete-subtask/:index/:subIndex', (req, res) => {
    const index = parseInt(req.params.index);
    const subIndex = parseInt(req.params.subIndex);
    if (index >= 0 && index < tasks.length) {
        tasks[index].deleteSubTask(subIndex);
    }
    res.render('subtask', { task: tasks[index], index });
});

// Route pour basculer l'état d'une sous-tâche
app.post('/toggle-subtask/:index/:subIndex', (req, res) => {
    const index = parseInt(req.params.index);
    const subIndex = parseInt(req.params.subIndex);
    if (index >= 0 && index < tasks.length) {
        tasks[index].toggleSubTask(subIndex);
    }
    res.render('subtask', { task: tasks[index], index });
});

