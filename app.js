const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Configuration pour utiliser le moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Liste des tâches en mémoire
let tasks = [];

// Affiche la page principale avec la liste des tâches
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Route pour ajouter une tâche
app.post('/add-task', (req, res) => {
    const taskDescription = req.body.task;
    if (taskDescription) {
        const task = { description: taskDescription, completed: false, details: [] };
        tasks.push(task);
    }
    res.render('task_list', { tasks });
});

// Route pour ajouter une sous-tâche depuis la page des détails
app.post('/add-task-details/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const taskDescription = req.body.task;
    if (index >= 0 && index < tasks.length && taskDescription) {
        const subTask = { description: taskDescription, completed: false };
        tasks[index].details.push(subTask);

    }
    res.render('task_details', { task: tasks[index], tasks, index });
});


// Route pour supprimer une tâche
app.delete('/delete-task/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
    }
    res.render('task_list', { tasks });
});
// Route pour afficher les détails d'une tâche
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

// Lancement du serveur
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
