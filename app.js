import express from 'express';
const app = express();
const port = 3000;

import indexRouter from './routes/index.js';
import tasksRouter from './routes/tasks.js';
import subtasksRouter from './routes/subtasks.js';

// const expressLayouts = require('express-ejs-layouts');
// const methodOverride = require('method-override');

// Configuration pour utiliser le moteur de templates EJS
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.set('layout', 'layout');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// app.use(expressLayouts);
// app.use(methodOverride('_method'));

//Controllers
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/tasks/subtasks', subtasksRouter);

// Lancement du serveur
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
