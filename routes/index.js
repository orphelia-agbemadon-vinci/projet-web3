const express = require("express");
const router = express.Router();
const { allTasks } = require("../models/tasks");

// Liste des tâches en mémoire
let tasks = allTasks();
let tasksCompleted = allTasks().filter(task => task.completed)
let tasksImportant = allTasks().filter(task => task.important)

// Affiche la page principale avec la liste des tâches
router.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Affiche la page avec toutes les tâches encodées par l'utilisateur
router.get('/history', (req, res) => {
    res.render('tasks/task_list', { tasks: tasksCompleted });
});

// Affiche la page avec les tâches marquées comme importantes
router.get('/important', (req, res) => {
    res.render('tasks/task_list', { tasks: tasksImportant });
});

module.exports = router;