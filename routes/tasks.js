const express = require("express");
const router = express.Router();
const { createTask, allTasks, deleteTask, toggleCompletion, toggleImportance, updateTask, findTask, assignTaskToList } = require("../models/tasks");
const { allLists } = require("../models/lists");

// Liste des tâches en mémoire
let tasks = allTasks();
let lists = allLists();
let isHistory = false;
let isImportant = false;

router.get('/', (req, res) => {
    isHistory = false;
    isImportant = false;
    res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
});

// Route pour afficher détails d'une tâche
router.get('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const task = findTask(index);
    if (task) {
        res.render('tasks/task_details', { task, index, lists, isHistory, isImportant });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route pour afficher le formulaire de modification pour une tâche
router.get('/edit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const task = findTask(index);
    if (task) {
        res.render('tasks/edit_task_form', { task, index, lists, isHistory, isImportant });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

router.get('/filter/:type', (req, res) => {
    const type = req.params.type;
    let filteredTasks;
    if (type === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (type === 'important') {
        filteredTasks = tasks.filter(task => task.important);
    }
    res.render('tasks/task_list', { tasks: filteredTasks, lists, isHistory, isImportant });
});

// Route pour ajouter une tâche
router.post('/add', (req, res) => {
    const taskDescription = req.body.task;
    if (taskDescription) {
        createTask(taskDescription);
    }
    tasks = allTasks(); // Mise à jour de la liste des tâches

    res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
});

// Route pour supprimer une tâche
router.delete('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    deleteTask(index);
    tasks = allTasks(); // Mise à jour de la liste des tâches

    res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
});

// Route pour cocher une tâche
router.post('/toggle-complete/:index', (req, res) => {
    const index = parseInt(req.params.index);
    toggleCompletion(index);
    tasks = allTasks(); // Mise à jour de la liste des tâches

    res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
});

// Route pour marquer une tâche comme importante
router.post('/toggle-important/:index', (req, res) => {
    const index = parseInt(req.params.index);

    toggleImportance(index);
    tasks = allTasks(); // Mise à jour de la liste des tâches

    res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
});

// Route pour assigner une tâche à une liste
router.post('/assign-list/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const listId = parseInt(req.body.listId);
    const task = findTask(index);

    if (task) {
        assignTaskToList(index, listId);
        tasks = allTasks(); // Mise à jour de la liste des tâches

        res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route pour éditer une tâche
router.patch('/edit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const description = req.body.description;
    const task = findTask(index);
    if (task) {
        updateTask(index, description);
        tasks = allTasks(); // Mise à jour de la liste des tâches

        res.render('tasks/task_list', { tasks, lists });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});


module.exports = router;