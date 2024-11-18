import express from 'express';
import { createTask, allTasks, deleteTask, toggleCompletion, toggleImportance, updateTask, findTask, assignTaskToList } from '../models/Task.js';
import { allLists } from '../models/List.js';
//import tasks from '../data/tasks.js';
import createList from '../views/tasks/list.js';
import createEditTask from '../views/tasks/edit.js';
import createATask from '../views/tasks/task.js';


const router = express.Router();

// Liste des tâches et des listes en mémoire
let tasks = allTasks();
let lists = allLists();


router.get('/', (req, res) => {
    res.send(createList(tasks));
});

// Ajoute une nouvelle tâche
router.post('/add', (req, res) => {
    const taskDescription = req.body.task;
    const newTask = createTask(taskDescription);
    //tasks.push(newTask);  
    res.send(createList(tasks));
    // res.send(createATask(newTask));
});

// Route pour éditer une tâche
router.patch('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const description = req.body.description;
    const task = TASKS_DATA.find((t) => t.id === taskId);
    if (task) {
        task.description = description;
        res.send(createATask(task));
    } else {
        res.status(404).send('Task not found');
    }
});

// Route pour éditer une tâche
router.get('/edit/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = TASKS_DATA.find((t) => t.id === taskId);
    if (task) {
        res.send(createEditTask(task));
    } else {
        res.status(404).send('Task not found');
    }
});

// // Route pour filtrer les tâches selon leur type
// router.get('/filter/:type', (req, res) => {
//     const type = req.params.type;
//     let filteredTasks;
//     if (type === 'completed') {
//         filteredTasks = tasks.filter(task => task.completed);
//     } else if (type === 'important') {
//         filteredTasks = tasks.filter(task => task.important);
//     }
//     res.render('tasks/task_list', { tasks: filteredTasks, lists, isHistory, isImportant });
// });


// // Route pour cocher une tâche
// router.post('/toggle-complete/:index', (req, res) => {
//     const index = parseInt(req.params.index);
//     toggleCompletion(index);
//     tasks = allTasks(); // Mise à jour de la liste des tâches

//     res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
// });

// // Route pour marquer une tâche comme importante
// router.post('/toggle-important/:index', (req, res) => {
//     const index = parseInt(req.params.index);

//     toggleImportance(index);
//     tasks = allTasks(); // Mise à jour de la liste des tâches

//     res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
// });

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

// // Route pour supprimer une tâche
// router.delete('/delete/:index', (req, res) => {
//     const index = parseInt(req.params.index);
//     deleteTask(index);
//     tasks = allTasks(); // Mise à jour de la liste des tâches

//     res.render('tasks/task_list', { tasks, lists, isHistory, isImportant });
// });

export default router;