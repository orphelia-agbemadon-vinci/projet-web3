import express from "express";
const app = express();
const port = 3000;

import indexRouter from "./routes/index.js";
import tasksRouter from "./routes/tasks.js";
import subtasksRouter from "./routes/subtasks.js";

// Middleware pour parser les requêtes URL-encoded
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir les fichiers statiques
app.use(express.static("public"));

//Controllers
app.use("/", indexRouter);
app.use("/tasks", tasksRouter);
app.use("/tasks/subtasks", subtasksRouter);

// Lancement du serveur
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
