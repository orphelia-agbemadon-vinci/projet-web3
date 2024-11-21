import express from "express";

import Task from "../models/Task.js";

import createTasksList from "../views/tasks/createTasksList.js";
import createFilteredList from "../views/tasks/createFilteredList.js";
import createEditTask from "../views/tasks/createEditTask.js";
import createATask from "../views/tasks/createATask.js";

const router = express.Router();

// Initialisation des tâches et de l'état du filtre
let tasks = Task.allTasks();
let filterState = "none";

// Route pour afficher la liste des tâches.
router.get("/", (req, res) => {
  if (tasks.length === 0) {
    res.send("Aucune tâche à afficher");
    return;
  }
  const tasks = Task.allTasks();
  res.send(createTasksList(tasks));
});

// Route pour récupérer toutes les tâches
router.get("/all", (req, res) => {
  const tasks = Task.allTasks();
  res.send(createTasksList(tasks));
});

// Route pour filtrer les tâches selon leur type
router.get("/filter/:type", (req, res) => {
  const { type } = req.params;

  let filteredTasks;
  if (type === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
    if (filteredTasks.length === 0) {
      res.send("Aucune tâche complétée");
      filterState = type;
      return;
    }
  } else if (type === "todo") {
    filteredTasks = tasks.filter((task) => !task.completed);
    if (filteredTasks.length === 0) {
      res.send("Aucune tâche à faire");
      filterState = type;
      return;
    }
  } else if (type === "important") {
    filteredTasks = tasks.filter((task) => task.important);
    if (filteredTasks.length === 0) {
      res.send("Aucune tâche importante");
      filterState = type;
      return;
    }
  } else if (type === "none") {
    filteredTasks = tasks;
    if (filteredTasks.length === 0) {
      res.send("Aucune tâche");
      filterState = type;
      return;
    }
  }
  filterState = type;
  console.log("Filter state:", filterState);
  res.send(createFilteredList(filteredTasks, type));
});

// Route pour afficher le formulaire de modification pour une tâche
router.get("/edit/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    res.send(createEditTask(task));
  } else {
    res.status(404).send("Task not found");
  }
});

// Route pour ajouter une nouvelle tâche.
router.post("/add", (req, res) => {
  const { description } = req.body;

  if (filterState === "none" || filterState === "todo") {
    Task.createTask(description);
  } else if (filterState === "completed") {
    Task.createFilteredTask(description, true, false);
  } else if (filterState === "important") {
    Task.createFilteredTask(description, false, true);
  }

  let filteredTasks = Task.getFilteredList(filterState);

  Task.writeFilterState(filterState);
  res.send(createFilteredList(filteredTasks, filterState));
});

// Route pour marquer une tâche comme importante
router.post("/toggle-important/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Task.toggleImportance(id);
  let filteredTasks = Task.getFilteredList(filterState);

  Task.writeFilterState(filterState);
  res.send(createFilteredList(filteredTasks, filterState));
});

// Route pour cocher une tâche
router.post("/toggle-complete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Task.toggleCompletion(id);
  let filteredTasks = Task.getFilteredList(filterState);

  Task.writeFilterState(filterState);
  res.send(createFilteredList(filteredTasks, filterState)); // Renvoyer la tâche mise à jour
});

// Route pour rechercher des tâches.
router.post("/search", (req, res) => {
  const { search, completed } = req.body;
  const text = search ? search.toLowerCase() : "";

  let foundTasks = tasks;

  if (text) {
    foundTasks = foundTasks.filter((t) =>
      t.description.toLowerCase().includes(text)
    );
  }

  if (completed !== undefined && completed !== "") {
    if (completed === "important") {
      foundTasks = foundTasks.filter((t) => t.important);
    } else {
      const isCompleted = completed === "true";
      foundTasks = foundTasks.filter((t) => t.completed === isCompleted);
    }
  }

  res.send(createTasksList(foundTasks));
});

// Route pour éditer une tâche
router.patch("/edit/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const description = req.body.description;
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    Task.updateTask(taskIndex, description);
    tasks = Task.allTasks(); // Mise à jour de la liste des tâches
    res.send(createATask(tasks[taskIndex]));
  } else {
    res.status(404).send("Task not found");
  }
});

// Route pour supprimer une tâche
router.delete("/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const idx = tasks.findIndex((t) => t.id === id);
  tasks.splice(idx, 1);
  const deletedTask = Task.deleteTaskById(id);
  let filteredTasks = Task.getFilteredList(filterState);

  if (deletedTask) {
    res.send(createFilteredList(filteredTasks, filterState));
  } else {
    res.status(404).send("Task not found");
  }
});

// Route pour supprimer toutes les tâches
router.delete("/delete-all", (req, res) => {
  tasks = Task.deleteAllTasks();
  res.send(createFilteredList(tasks, filterState));
});

export default router;
