const express = require("express");
const router = express.Router();
const { createTask, allTasks, deleteTask, toggleCompletion, toggleImportance, updateTask, findTask } = require("../models/tasks");

// Liste des tâches en mémoire
let tasks = allTasks();

router.get('/', (req, res) => {
    res.render('tasks/task_list', { tasks });
});

// Route pour afficher détails d'une tâche
router.get('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const task = findTask(index);
    if (task) {
        res.render('tasks/task_details', { task, index });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route pour afficher le formulaire de modification pour une tâche
router.get('/edit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const task = findTask(index);

    if (task) {
        res.render('tasks/edit_task_form', { task, index });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route pour ajouter une tâche
router.post('/add', (req, res) => {
    const taskDescription = req.body.task;
    if (taskDescription) {
        createTask(taskDescription);
    }
    tasks = allTasks(); // Mise à jour de la liste des tâches

    res.render('tasks/task_list', { tasks });
});

// Route pour supprimer une tâche
router.delete('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    deleteTask(index);
    tasks = allTasks(); // Mise à jour de la liste des tâches

    res.render('tasks/task_list', { tasks });
});

// Route pour cocher une tâche
router.post('/toggle-complete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    toggleCompletion(index);
    tasks = allTasks(); // Mise à jour de la liste des tâches

    res.render('tasks/task_list', { tasks });
});

// Route pour marquer une tâche comme importante
router.post('/toggle-important/:index', (req, res) => {
    const index = parseInt(req.params.index);

    toggleImportance(index);
    tasks = allTasks(); // Mise à jour de la liste des tâches

    res.render('tasks/task_list', { tasks });
});


// Nouvelle route pour éditer une tâche
router.patch('/edit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const description = req.body.description;
    const task = findTask(index);

    if (task) {
        updateTask(index, description);
        tasks = allTasks(); // Mise à jour de la liste des tâches

        res.render('tasks/task_list', { tasks });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

module.exports = router;