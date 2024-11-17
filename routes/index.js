const express = require("express");
const router = express.Router();
const { allTasks } = require("../models/Task");
const { allLists } = require("../models/List");

// Liste des tâches et de listes en mémoire
let tasks = allTasks();
let lists = allLists();


// Affiche la page principale avec la liste des tâches
router.get('/', (req, res) => {
    res.render('index', { tasks, lists, isHistory: false, isImportant: false });
});

module.exports = router;