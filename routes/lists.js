const express = require("express");
const router = express.Router();
const { allTasks } = require("../models/Task");
const { allLists, createList, findList } = require("../models/List");

let lists = allLists();
let tasks = allTasks();

//Route pour ajouter une nouvelle liste
router.get('/new-list-form', (req, res) => {
    lists = allLists(); // Mise à jour de la liste des listes
    res.render('lists/new-list-form', { tasks, lists });
});

// Route pour créer une nouvelle liste
router.post('/create-list', (req, res) => {
    const listName = req.body['list-name'];
    const list = createList(listName);

    lists = allLists(); // Mise à jour de la liste des listes
    res.redirect(`/lists/${list.id}`);
});

// Route pour afficher une liste
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const list = findList(id);
    const tasks = allTasks().filter(task => task.listId === id);

    res.render('lists/list', { tasks, lists, list });
});

module.exports = router;