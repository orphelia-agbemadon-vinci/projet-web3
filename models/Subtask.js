import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from '../utils/json.js';
import { findTaskIndex } from './Task.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDbPath = path.join(__dirname, '/../data/tasks.js');

/**
 * Ajoute une nouvelle sous-tâche à une tâche existante.
 * @param {number} taskId - L'ID de la tâche.
 * @param {string} subTaskDescription - La description de la sous-tâche.
 * @returns {object} La nouvelle sous-tâche ajoutée.
 * @throws {Error} Si la tâche avec l'ID donné n'est pas trouvée.
 */
export function addSubTask(taskId, subTaskDescription) {
  const tasks = parse(jsonDbPath);
  const taskIndex = findTaskIndex(taskId);
  if (taskIndex === -1) {
    throw new Error(`Task with id ${taskId} not found`);
  }
  const newSubtask = {
    idSubtask: tasks[taskIndex].subtasks.length + 1,
    descriptionSubtask: subTaskDescription,
    completed: false,
  };
  tasks[taskIndex].subtasks.push(newSubtask);

  serialize(jsonDbPath, tasks);

  return newSubtask;
}

/**
 * Supprime une sous-tâche d'une tâche existante.
 * @param {number} taskId - L'ID de la tâche.
 * @param {number} subTaskId - L'ID de la sous-tâche.
 * @returns {object} La sous-tâche supprimée.
 * @throws {Error} Si la tâche ou la sous-tâche avec l'ID donné n'est pas trouvée.
 */
export function deleteSubTask(taskId, subTaskId) {
  const tasks = parse(jsonDbPath);
  const taskIndex = findTaskIndex(taskId);
  if (taskIndex === -1) {
    throw new Error(`Task with id ${taskId} not found`);
  }
  const subTasks = tasks[taskIndex].subtasks;
  const subTaskIndex = subTasks.findIndex(
    (subtask) => subtask.idSubtask === subTaskId
  );
  if (subTaskIndex === -1) {
    throw new Error(`Subtask with id ${subTaskId} not found`);
  }
  const [deletedSubTask] = subTasks.splice(subTaskIndex, 1);
  serialize(jsonDbPath, tasks);
  return deletedSubTask;
}

/**
 * Supprime toutes les sous-tâches d'une tâche existante.
 * @param {number} taskId - L'ID de la tâche.
 * @returns {object} La tâche mise à jour sans sous-tâches.
 * @throws {Error} Si la tâche avec l'ID donné n'est pas trouvée.
 */
export function deleteAllSubTasks(taskId) {
  const tasks = parse(jsonDbPath);
  const taskIndex = findTaskIndex(taskId);
  if (taskIndex === -1) {
    throw new Error(`Task with id ${taskId} not found`);
  }
  tasks[taskIndex].subtasks = [];
  serialize(jsonDbPath, tasks);
  return tasks[taskIndex];
}

/**
 * Bascule l'état de complétion d'une sous-tâche.
 * @param {number} taskId - L'ID de la tâche.
 * @param {number} subTaskId - L'ID de la sous-tâche.
 * @returns {object} La sous-tâche mise à jour.
 * @throws {Error} Si la tâche ou la sous-tâche avec l'ID donné n'est pas trouvée.
 */
export function toggleSubTaskCompletion(taskId, subTaskId) {
  const tasks = parse(jsonDbPath);
  const taskIndex = findTaskIndex(taskId);
  if (taskIndex === -1) {
    throw new Error(`Task with id ${taskId} not found`);
  }
  const subTasks = tasks[taskIndex].subtasks;
  const subTaskIndex = subTasks.findIndex(
    (subtask) => subtask.idSubtask === subTaskId
  );
  if (subTaskIndex === -1) {
    throw new Error(`Subtask with id ${subTaskId} not found`);
  }
  subTasks[subTaskIndex].completed = !subTasks[subTaskIndex].completed;

  serialize(jsonDbPath, tasks);

  return subTasks[subTaskIndex];
}

/**
 * Récupère toutes les sous-tâches d'une tâche existante.
 * @param {number} taskId - L'ID de la tâche.
 * @returns {Array} La liste des sous-tâches.
 * @throws {Error} Si la tâche avec l'ID donné n'est pas trouvée.
 */
export function getAllSubTasks(taskId) {
  const tasks = parse(jsonDbPath);
  const taskIndex = findTaskIndex(taskId);
  if (taskIndex === -1) {
    throw new Error(`Task with id ${taskId} not found`);
  }
  return tasks[taskIndex].subtasks;
}

/**
 * Récupère les détails d'une tâche et ses sous-tâches.
 * @param {number} id - L'ID de la tâche.
 * @returns {object} Un objet contenant la tâche et ses sous-tâches.
 * @throws {Error} Si la tâche avec l'ID donné n'est pas trouvée.
 */
export function getTaskDetailsWithSubtasks(id) {
  const tasks = parse(jsonDbPath);
  const taskIndex = findTaskIndex(id);
  if (taskIndex === -1) {
    throw new Error(`Task with id ${id} not found`);
  }
  const task = tasks[taskIndex];
  const subTasks = getAllSubTasks(id);
  return { task, subTasks };
}
