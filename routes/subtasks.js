import express from 'express';
import { findTask, allTasks, findTaskIndex } from '../models/Task.js';
import { allLists } from '../models/List.js';
import { toggleSubTaskCompletion, addSubTask, deleteSubTask, getAllSubTasks, getTaskDetailsWithSubtasks } from '../models/Subtask.js';
import createSubtaskList from '../views/subtasks/subtaskList.js';

const router = express.Router();

// Liste des listes en mémoire
let tasks = allTasks();
let lists = allLists();

// Route pour afficher détails d'une tâche
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const taskDetails = getTaskDetailsWithSubtasks(id);

    if (taskDetails) {
        const { task, subTasks } = taskDetails;

        res.send(createSubtaskList(subTasks, task));
    } else {
        res.status(404).send('Task not found');
    }
});

// Route pour ajouter une sous-tâche
router.post('/add/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const { subtask } = req.body;
    const taskIndex = findTaskIndex(taskId);

    if (taskIndex !== -1) {
        const subTask = addSubTask(taskIndex, subtask);
        const task = findTask(taskId);
        res.send(createSubtaskList(task.subtasks, task));
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route pour cocher une sous-tâche
router.post('/toggle-complete/:taskId/:subId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const subId = parseInt(req.params.subId);
    const taskIndex = findTaskIndex(taskId);

    if (taskIndex !== -1) {
        try {
            const subTask = toggleSubTaskCompletion(taskIndex, subId);
            const task = findTask(taskId);
            res.send(getAllSubTasks());
        } catch (error) {
            res.status(404).send(error.message);
        }
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route pour supprimer une sous-tâche
router.delete('/delete/:taskId/:subId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const subId = parseInt(req.params.subId);
    const taskIndex = findTaskIndex(taskId);

    if (taskIndex !== -1) {
        const deletedSubTask = deleteSubTask(taskIndex, subId);
        if (deletedSubTask) {
            const task = findTask(taskId);
            res.send();
        } else {
            res.status(404).send('Sous-tâche non trouvée');
        }
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});



export default router;