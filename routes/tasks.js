const express = require("express");
const router = express.Router();
const { createTask, allTasks } = require("../models/tasks");

// Liste des tâches en mémoire
let tasks = allTasks();

// Affiche la page avec toutes les tâches encodées par l'utilisateur
router.get('/history', (req, res) => {
    res.render('task_list', { tasks: tasks.filter(task => task.completed) });
});

// Affiche la page avec les tâches marquées comme importantes
router.get('/important', (req, res) => {
    res.render('task_list', { tasks: tasks.filter(task => task.important) });
});

module.exports = router;