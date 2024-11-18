import express from 'express';
import { allTasks, createTask } from '../models/Task.js';
import { allLists } from '../models/List.js';
import homePage from '../views/index.js';
import createList from '../views/tasks/list.js';
import  createATask  from '../views/tasks/task.js';
//import TASKS_DATA from '../data/data.js';

const router = express.Router();

// Liste des tâches et de listes en mémoire
let tasks = allTasks();
let lists = allLists();


// Affiche la page principale avec la liste des tâches
router.get('/', (req, res) => {
    res.send(homePage(tasks));
});


export default router;