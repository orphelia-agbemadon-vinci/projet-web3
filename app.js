const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Configuration pour utiliser le moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(express.json()); // Ajout pour htmx POST requests


// Liste des tâches en mémoire
let tasks = [];
let lists = [];

/*ordre! Middleware puis route */
// Middleware pour ajouter `lists` à toutes les vues
app.use((req, res, next) => {
    res.locals.lists = lists;
    next();
});

// Affiche la page principale avec la liste des tâches
app.get('/', (req, res) => {
    res.render('index', { tasks });
});


/*PARTIE LISTES*/
//form pour ajouter une nouvelle liste
app.get('/new-list-form', (req, res) => {
    res.render('new-list-form', {tasks});
});
// Route pour créer une nouvelle liste
app.post('/create-list', (req, res) => {
    const listName = req.body['list-name'];
    lists.push(listName);
    res.redirect(`/list/${listName}`);
});
// Route pour afficher une liste
app.get('/list/:name', (req, res) => {
    const listName = req.params.name;
    res.render('list', { listName, lists });
});



/*PARTIE TACHES*/
// Route pour ajouter une tâche
app.post('/add-task', (req, res) => {
    const taskDescription = req.body.task;
    if (taskDescription) {
        const task = {
            description: taskDescription,
            completed: false,
            important: false
        };
        tasks.push(task);
    }
    res.render('task_list', { tasks });
});

// Route pour supprimer une tâche
app.delete('/delete-task/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.render('task_list', { tasks });
});

// Route pour afficher détails d'une tâche
app.get('/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        const task = tasks[index];
        res.render('task_details', { task, index });
    } else {
        res.status(404).send('Tâche non trouvée');
    }
});

// Route pour cocher une tâche
app.post('/toggle-task/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = !tasks[index].completed;
    }
    res.render('task_list', { tasks });
});

// Route pour marquer une tâche comme importante
app.post('/toggle-important/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].important = !tasks[index].important;
    }
    res.render('task_list', { tasks });
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
