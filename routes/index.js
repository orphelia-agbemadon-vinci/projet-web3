import express from 'express';
import { allTasks } from '../models/Task.js';
import { allLists } from '../models/List.js';
import homePage from '../views/index.js';

const router = express.Router();

// Liste des tâches et de listes en mémoire
let tasks = allTasks();
let lists = allLists();


// Affiche la page principale avec la liste des tâches
router.get('/', (req, res) => {
    res.send(homePage());
});

export default router;