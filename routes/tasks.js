import express from 'express';
import { createTask, allTasks, toggleCompletion, toggleImportance, updateTask, deleteTaskById, deleteAllTasks } from '../models/Task.js';
import createList from '../views/tasks/list.js';
import createEditTask from '../views/tasks/edit.js';
import createATask from '../views/tasks/task.js';

const router = express.Router();

// Liste des tâches et des listes en mémoire
let tasks = allTasks();

router.get('/', (req, res) => {
    if (tasks.length === 0) {
        res.send('Aucune tâche à afficher');
        return;
    }
    const tasks = allTasks();
    res.send(createList(tasks));
});

// Route pour récupérer toutes les tâches
router.get('/all', (req, res) => {
    const tasks = allTasks();
    res.send(createList(tasks));
});

// Route pour filtrer les tâches selon leur type
router.get('/filter/:type', (req, res) => {
    const { type } = req.params;
    let filteredTasks;
    if (type === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
        if (filteredTasks.length === 0) {
            res.send('Aucune tâche complétée');
            return;
        }
    } else if (type === 'important') {
        filteredTasks = tasks.filter(task => task.important);
        if (filteredTasks.length === 0) {
            res.send('Aucune tâche importante');
            return;
        }
    } else if (type === 'none') {
        filteredTasks = tasks;
        if (filteredTasks.length === 0) {
            res.send('Aucune tâche');
            return;
        }
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

// Route pour supprimer toutes les tâches
router.delete('/delete-all', (req, res) => {
    tasks = deleteAllTasks(); // Utiliser la fonction du modèle pour supprimer toutes les tâches
    res.send(createList(tasks)); // Renvoyer la liste vide
});

export default router;