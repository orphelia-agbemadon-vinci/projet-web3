const express = require('express');
const router = express.Router();
const { addSubTask, deleteSubTask, toggleSubTaskCompletion, getAllSubTasks } = require('../models/Subtask');
const { findTask } = require('../models/Task');
const { allLists } = require('../models/List');

// Liste des listes en mémoire
let lists = allLists();

//Route affichant la liste des sous-tâches
router.get('/subtasks/:taskIndex', (req, res) => {
    const taskIndex = parseInt(req.params.taskIndex);
    const task = findTask(taskIndex);
    if (task) {
        const subTasks = getAllSubTasks(taskIndex);
        res.render('subtasks/subtask', { task, subTasks, index: taskIndex, lists });
    } else {
        res.status(404).send('Task not found');
    }
});

// Route pour ajouter une sous-tâche
router.post('/add-subtask/:taskIndex', (req, res) => {
    const taskIndex = parseInt(req.params.taskIndex);
    const subTaskDescription = req.body.task;
    const subTask = addSubTask(taskIndex, subTaskDescription);
    const task = findTask(taskIndex);
    if (subTask) {
        const subTasks = getAllSubTasks(taskIndex);
        res.render('subtasks/subtask', {task, subTasks, index: taskIndex, lists });
    } else {
        res.status(404).send('Task not found');
    }
});


// Route pour supprimer une sous-tâche
router.delete('/delete-subtask/:taskIndex/:subTaskIndex', (req, res) => {
    const taskIndex = parseInt(req.params.taskIndex);
    const subTaskIndex = parseInt(req.params.subTaskIndex);
    const deletedSubTask = deleteSubTask(taskIndex, subTaskIndex);
    const task = findTask(taskIndex);
    if (deletedSubTask) {
        const subTasks = getAllSubTasks(taskIndex);
        res.render('subtasks/subtask_list', { subTasks, index: taskIndex });
    } else {
        res.status(404).send('Subtask not found');
    }
});

// Route pour basculer l'état d'une sous-tâche
router.post('/toggle-subtask/:taskIndex/:subTaskIndex', (req, res) => {
    const taskIndex = parseInt(req.params.taskIndex);
    const subTaskIndex = parseInt(req.params.subTaskIndex);
    const subTask = toggleSubTaskCompletion(taskIndex, subTaskIndex);
    const task = findTask(taskIndex);
    if (subTask) {
        const subTasks = getAllSubTasks(taskIndex);
        res.render('subtasks/subtask_list', { subTasks, index: taskIndex });
    } else {
        res.status(404).send('Subtask not found');
    }
});

module.exports = router;