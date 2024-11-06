const express = require("express");
const router = express.Router();
const { createTask, allTasks, deleteTask, toggleCompletion, toggleImportance } = require("../models/tasks");

// Liste des tâches en mémoire
let tasks = allTasks();

// Affiche la page principale avec la liste des tâches
router.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Route pour ajouter une tâche
router.post('/add-task', (req, res) => {
    const taskDescription = req.body.task;
    if (taskDescription) {
        const task = {
            description: taskDescription,
            completed: false,
            important: false,
            originalIndex: tasks.length
        };
        tasks.push(task);
    }
    createTask(taskDescription, false, false);
    res.render('task_list', { tasks });
});

// Route pour supprimer une tâche
router.delete('/delete-task/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    deleteTask(index);
    res.render('task_list', { tasks });
});

// Route pour afficher détails d'une tâche
router.get('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        const task = tasks[index];
        res.render('task_details', { task, index });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route pour cocher une tâche
router.post('/toggle-task/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = !tasks[index].completed;
    }
    toggleCompletion(index);
    res.render('task_list', { tasks });
});

// Route pour marquer une tâche comme importante
router.post('/toggle-important/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].important = !tasks[index].important;
    }
    toggleImportance(index);
    res.render('task_list', { tasks });
});


module.exports = router;