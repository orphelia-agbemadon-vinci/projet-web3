const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');


// Configuration pour utiliser le moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.use(methodOverride('_method'));

//Routes
const indexRouter = require("./routes/index.js");
const tasksRouter = require("./routes/tasks.js");
const subtasksRouter = require("./routes/subtasks.js");
const listsRouter = require("./routes/lists.js");

//Controllers
app.use("/", indexRouter);
app.use("/tasks", tasksRouter);
app.use("/tasks/subtasks", subtasksRouter);
app.use("/lists", listsRouter);

// Lancement du serveur
app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
