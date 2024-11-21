import express from 'express';
import { findTask, allTasks } from '../models/Task.js';

import {
  toggleSubTaskCompletion,
  addSubTask,
  deleteSubTask,
  getTaskDetailsWithSubtasks,
  deleteAllSubTasks,
} from '../models/Subtask.js';
import createSubtaskList from '../views/subtasks/subtaskList.js';
import createASubtask from '../views/subtasks/subtask.js';
import layout from '../views/layout.js';

const router = express.Router();

// Liste des listes en mémoire
let tasks = allTasks();

// Route pour afficher détails d'une tâche
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const taskDetails = getTaskDetailsWithSubtasks(id);
    const { task, subTasks } = taskDetails;
    res.send(layout(createSubtaskList(subTasks, task)));
  } catch {
    res.status(404).send('Task not found');
  }
});

// Route pour ajouter une sous-tâche
router.post('/add/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { subtask } = req.body;

  try {
    const subTask = addSubTask(taskId, subtask);
    const task = findTask(taskId);
    res.send(createSubtaskList(task.subtasks, task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Route pour cocher une sous-tâche
router.post('/toggle-subtask/:taskId/:subId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const subId = parseInt(req.params.subId);

  try {
    const subTask = toggleSubTaskCompletion(taskId, subId);
    const task = findTask(taskId);
    res.send(createASubtask(subTask, task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

// Route pour supprimer une sous-tâche
router.delete('/delete/:taskId/:subId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const subId = parseInt(req.params.subId);

  if (taskId !== -1) {
    const deletedSubTask = deleteSubTask(taskId, subId);
    if (deletedSubTask) {
      const task = findTask(taskId);
      res.send();
    } else {
      res.status(404).send('Sous-tâche non trouvée');
    }
  } else {
    res.status(404).send('Tâche non trouvée');
  }
});

// Route pour supprimer toutes les sous-tâches d'une tâche
router.delete('/delete-all/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  try {
    const task = deleteAllSubTasks(taskId);
    res.send(createSubtaskList(task.subtasks, task));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

export default router;
