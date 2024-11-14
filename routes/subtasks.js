const express = require('express');
const router = express.Router();
const { findTask } = require('../models/Task');
const { allLists } = require('../models/List');
const { toggleSubTaskCompletion, addSubTask, deleteSubTask, getAllSubTasks } = require('../models/SubTask');

// Liste des listes en mémoire
let lists = allLists();

// Route pour afficher détails d'une tâche
router.get('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const task = findTask(index);
    if (task) {
        const subTasks = getAllSubTasks(index);
        res.render('subtasks/subtask', { task, index, subTasks, lists });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route pour supprimer une sous-tâche
router.delete('/delete/:index/:subIndex', (req, res) => {
    const index = parseInt(req.params.index);
    const subIndex = parseInt(req.params.subIndex);
    const deletedSubTask = deleteSubTask(index, subIndex);
    if (deletedSubTask) {
        const task = findTask(index);
        res.render('subtasks/subtask_list', { subTasks: task.subtasks, index, lists });
    } else {
        res.status(404).send('Sous-tâche non trouvée');
    }
});

// Route pour cocher une sous-tâche
router.post('/toggle-subtask/:index/:subIndex', (req, res) => {
    const index = parseInt(req.params.index);
    const subIndex = parseInt(req.params.subIndex);
    const subTask = toggleSubTaskCompletion(index, subIndex);
    if (subTask) {
        const task = findTask(index);
        res.render('subtasks/subtask_list', { subTasks: task.subtasks, index, lists });
    } else {
        res.status(404).send('Sous-tâche non trouvée');
    }
});

// Route pour ajouter une sous-tâche
router.post('/add/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const subtaskDescription = req.body.subtask;
    const subTask = addSubTask(index, subtaskDescription);
    if (subTask) {
        const task = findTask(index);
        res.render('subtasks/subtask_list', { subTasks: task.subtasks, index, lists });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

module.exports = router;