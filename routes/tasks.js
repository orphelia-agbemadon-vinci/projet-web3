import express from 'express';
import { createTask, allTasks, deleteTask, toggleCompletion, toggleImportance, updateTask, findTask, assignTaskToList, deleteTaskById } from '../models/Task.js';


import createEditTask from '../views/tasks/edit.js';
import createATask from '../views/tasks/task.js';


const router = express.Router();


// Liste des tâches et des listes en mémoire
let tasks = allTasks();



router.get('/', (req, res) => {
    res.send(createList(tasks));
});

// Route pour filtrer les tâches selon leur type
router.get('/filter/:type', (req, res) => {
    const { type } = req.params;
    let filteredTasks;
    if (type === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (type === 'important') {
        filteredTasks = tasks.filter(task => task.important);
    }
    res.send(createList(filteredTasks));
});

// Route pour afficher le formulaire de modification pour une tâche
router.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        res.send(createEditTask(task));
    } else {
        res.status(404).send('Task not found');
    }
});

// Ajoute une nouvelle tâche
router.post('/add', (req, res) => {
    const { description } = req.body;
    createTask(description);

    tasks = allTasks(); // Mise à jour de la liste des tâches
    res.send(createList(tasks));
});

// // Route pour marquer une tâche comme importante
router.post("/toggle-important/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTask = toggleImportance(id);

    tasks = allTasks(); // Mise à jour de la liste des tâches

    res.send(createList(tasks));
});


// Route pour cocher une tâche
router.post('/toggle-complete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const updatedTask = toggleCompletion(id);
        tasks = allTasks(); // Mise à jour de la liste des tâches
        res.send(createATask(updatedTask)); // Renvoyer la tâche mise à jour
    } catch (error) {
        res.status(404).send(error.message);
    }
});

// Route pour éditer une tâche
router.patch('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const description = req.body.description;
    const taskIndex = tasks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
        updateTask(taskIndex, description);
        tasks = allTasks(); // Mise à jour de la liste des tâches
        res.send(createATask(tasks[taskIndex]));
    } else {
        res.status(404).send('Task not found');
    }
});

// Route pour supprimer une tâche
router.delete('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = tasks.findIndex(t => t.id === id);
    tasks.splice(idx, 1);

    const deletedTask = deleteTaskById(id);
    
    if (deletedTask) {
        tasks = allTasks(); // Mise à jour de la liste des tâches
        res.send();
    } else {
        res.status(404).send('Task not found');
    }
});

// // Route pour assigner une tâche à une liste
// router.post('/assign-list/:index', (req, res) => {
//     const index = parseInt(req.params.index);
//     const listId = parseInt(req.body.listId);
//     const task = findTask(index);

//     if (task) {
//         assignTaskToList(index, listId);
//         tasks = allTasks(); // Mise à jour de la liste des tâches

//         res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
//     } else {
//         res.status(404).send('Tâche non trouvée');
//     }
// });

export default router;