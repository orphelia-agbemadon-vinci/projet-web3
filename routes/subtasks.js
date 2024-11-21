import express from "express";

import Task from "../models/Task.js";
import Subtask from "../models/Subtask.js";

import createSubtaskList from "../views/subtasks/createSubtaskList.js";
import createASubtask from "../views/subtasks/createASubtask.js";
import layout from "../views/layout.js";

const router = express.Router();
let taskListId;

// Route pour afficher les détails d'une tâche avec ses sous-tâches.
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const taskDetails = Subtask.getTaskDetailsWithSubtasks(id);
    const { task, subTasks } = taskDetails;
    taskListId = task.id;
    res.send(layout(createSubtaskList(subTasks, task)));
  } catch {
    res.status(404).send("Task not found");
  }
});

// Route pour ajouter une sous-tâche à une tâche existante.
router.post("/add/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { subtask } = req.body;

  try {
    Subtask.addSubTask(taskId, subtask);
    const task = Task.findTask(taskId);
    res.send(createSubtaskList(task.subtasks, task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Route pour cocher une sous-tâche
router.post("/toggle-subtask/:taskId/:subId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const subId = parseInt(req.params.subId);

  try {
    const subTask = Subtask.toggleSubTaskCompletion(taskId, subId);
    const task = Task.findTask(taskId);
    res.send(createASubtask(subTask, task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/search", (req, res) => {
  const search = req.body.subtaskSearch;
  const text = search ? search.toLowerCase() : "";

  try {
    if (taskListId) {
      // Recherche de sous-tâches
      const task = Task.findTask(taskListId);
      let foundSubtasks = task.subtasks;

      if (text) {
        foundSubtasks = foundSubtasks.filter((subtask) =>
          subtask.descriptionSubtask.toLowerCase().includes(text)
        );
      }

      res.send(createSubtaskList(foundSubtasks, task));
    } else {
      res.status(400).send("Task ID not found");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Route pour supprimer une sous-tâche d'une tâche existante.
router.delete("/delete/:taskId/:subId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const subId = parseInt(req.params.subId);

  try {
    const deletedSubTask = Subtask.deleteSubTask(taskId, subId);
    if (deletedSubTask) {
      res.send();
    } else {
      res.status(404).send("Sous-tâche non trouvée");
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Route pour supprimer toutes les sous-tâches d'une tâche existante.
router.delete("/delete-all/:taskId", (req, res) => {
  const taskId = parseInt(req.params.taskId);
  try {
    const task = Subtask.deleteAllSubTasks(taskId);
    res.send(createSubtaskList(task.subtasks, task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
