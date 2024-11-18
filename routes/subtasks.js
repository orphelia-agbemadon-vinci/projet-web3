import express from 'express';
import { findTask,allTasks } from '../models/Task.js';
import { allLists } from '../models/List.js';
import { toggleSubTaskCompletion, addSubTask, deleteSubTask, getAllSubTasks } from '../models/SubTask.js';

// import TASKS_DATA from '../data/data.js';

const router = express.Router();

// Liste des listes en mémoire
let tasks = allTasks();
let lists = allLists();

// Route pour afficher détails d'une tâche
router.get('/tasks/:id', (req, res) => {
    const TaskId = parseInt(req.params.id);
    if(tasks.findIndex(task => task.id === TaskId)) {
        res.send(createList(tasks[TaskId].subtasks));
    }
    // const task = findTask(TaskId);
    // const subTasks = getAllSubTasks(task);
    res.send("Task not found");
});

// // Route pour supprimer une sous-tâche
// router.delete('/delete/:index/:subIndex', (req, res) => {
//     const index = parseInt(req.params.index);
//     const subIndex = parseInt(req.params.subIndex);
//     const deletedSubTask = deleteSubTask(index, subIndex);
//     if (deletedSubTask) {
//         const task = findTask(index);
//         res.render('subtasks/subtask_list', { subTasks: task.subtasks, index, lists });
//     } else {
//         res.status(404).send('Sous-tâche non trouvée');
//     }
// });

// // Route pour cocher une sous-tâche
// router.post('/toggle-subtask/:index/:subIndex', (req, res) => {
//     const index = parseInt(req.params.index);
//     const subIndex = parseInt(req.params.subIndex);
//     const subTask = toggleSubTaskCompletion(index, subIndex);
//     if (subTask) {
//         const task = findTask(index);
//         res.render('subtasks/subtask_list', { subTasks: task.subtasks, index, lists });
//     } else {
//         res.status(404).send('Sous-tâche non trouvée');
//     }
// });

// // Route pour ajouter une sous-tâche
// router.post('/add/:index', (req, res) => {
//     const index = parseInt(req.params.index);
//     const subtaskDescription = req.body.subtask;
//     const subTask = addSubTask(index, subtaskDescription);
//     if (subTask) {
//         const task = findTask(index);
//         res.render('subtasks/subtask_list', { subTasks: task.subtasks, index, lists });
//     } else {
//         res.status(404).send('Tâche non trouvée');
//     }
// });

export default router;