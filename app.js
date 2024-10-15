const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));


// Liste des tâches en mémoire (pour ce projet simple)
let tasks = [];

// Middleware pour servir les fichiers statiques (comme les fichiers CSS)
app.use(express.static('public'));

// Affiche la page principale avec la liste des tâches
app.get('/', (req, res) => {
    res.render('index', { tasks });
});

// Route pour ajouter une tâche
app.post('/add-task', (req, res) => {
    const task = req.body.task;
    /*if (task) {
        tasks.push(task);
    }*/
   tasks.push(task);
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

// Configuration pour utiliser le moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Lancement du serveur
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
