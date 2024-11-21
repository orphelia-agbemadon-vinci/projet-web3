import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from '../utils/json.js';
import DATA from '../data/filterState.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDbPath = path.join(__dirname, '/../data/tasks.js');
const filterStatePath = path.join(__dirname, '/../data/filterState.js');

/**
 * Lit toutes les tâches.
 * @returns {Array} La liste des tâches.
 */
export function allTasks() {
  return parse(jsonDbPath);
}

/**
 * Ajoute une nouvelle tâche.
 * @param {string} description - La description de la tâche.
 * @returns {object} La nouvelle tâche ajoutée.
 */
export function createTask(description) {
  const tasks = allTasks();
  const createdTask = {
    id: tasks.length + 1,
    description: description,
    completed: false,
    important: false,
    listId: null,
    subtasks: [],
  };
  tasks.push(createdTask);

  serialize(jsonDbPath, tasks);

  return createdTask;
}

/**
 * Ajoute une nouvelle tâche avec des propriétés spécifiques.
 * @param {string} description - La description de la tâche.
 * @param {boolean} completed - L'état de complétion de la tâche.
 * @param {boolean} important - L'état d'importance de la tâche.
 * @returns {object} La nouvelle tâche ajoutée.
 */
export function createFilteredTask(description, completed, important) {
  const tasks = allTasks();
  const createdTask = {
    id: tasks.length + 1,
    description: description,
    completed: completed,
    important: important,
    listId: null,
    subtasks: [],
  };
  tasks.push(createdTask);

  serialize(jsonDbPath, tasks);

  return createdTask;
}

/**
 * Supprime une tâche par son ID.
 * @param {number} id - L'ID de la tâche.
 * @returns {object|null} La tâche supprimée ou null si non trouvée.
 */
export function deleteTaskById(id) {
  const tasks = allTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    console.error(`Task with id ${id} not found.`);
    return null;
  }

  const [deletedTask] = tasks.splice(taskIndex, 1);

  serialize(jsonDbPath, tasks);

  return deletedTask;
}

/**
 * Supprime toutes les tâches.
 * @returns {Array} Une liste vide.
 */
export function deleteAllTasks() {
  const tasks = [];
  serialize(jsonDbPath, tasks);
  return tasks;
}

/**
 * Bascule l'état d'importance d'une tâche.
 * @param {number} id - L'ID de la tâche.
 * @returns {object|null} La tâche mise à jour ou null si non trouvée.
 */
export function toggleImportance(id) {
    const tasks = allTasks();
    console.log('All tasks:', tasks);
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        console.error(`Task with id ${id} not found.`);
        return null;
    }
    console.log('Found task index:', taskIndex);
    console.log('Task before update:', tasks[taskIndex]);
    tasks[taskIndex].important = !tasks[taskIndex].important;
    const [task] = tasks.splice(taskIndex, 1);
    // Réorganiser selon l'importance
    if (task.important) {
        tasks.unshift(task); // Ajouter au début si important
    } else {
        tasks.push(task); // Ajouter à la fin si non important
    }
    console.log('Tasks after reordering:', tasks);
    serialize(jsonDbPath, tasks);
    return task;
}

/**
 * Bascule l'état de complétion d'une tâche.
 * @param {number} id - L'ID de la tâche.
 * @returns {object} La tâche mise à jour.
 * @throws {Error} Si la tâche avec l'ID donné n'est pas trouvée.
 */
export function toggleCompletion(id) {
  const tasks = parse(jsonDbPath);
  const task = tasks.find((task) => task.id === id);
  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }
  task.completed = !task.completed;
  serialize(jsonDbPath, tasks);

  return task;
}

/**
 * Met à jour la description d'une tâche.
 * @param {number} index - L'indice de la tâche.
 * @param {string} newDescription - La nouvelle description de la tâche.
 * @returns {object} La tâche mise à jour.
 */
export function updateTask(index, newDescription) {
  const tasks = allTasks();
  tasks[index].description = newDescription;

  serialize(jsonDbPath, tasks);

  return tasks[index];
}

/**
 * Trouve une tâche par son ID.
 * @param {number} id - L'ID de la tâche.
 * @returns {object|undefined} La tâche trouvée ou undefined si non trouvée.
 */
export function findTask(id) {
  const tasks = allTasks();
  return tasks.find((task) => task.id === id);
}

/**
 * Trouve l'indice d'une tâche par son ID.
 * @param {number} id - L'ID de la tâche.
 * @returns {number} L'indice de la tâche ou -1 si non trouvée.
 */
export function findTaskIndex(id) {
  const tasks = allTasks();
  return tasks.findIndex((task) => task.id === id);
}

/**
 * Récupère le filtre par défaut.
 * @returns {string} Le filtre par défaut.
 */
export function getDefaultFilter() {
  return 'none';
}

/**
 * Écrit l'état du filtre dans le fichier JSON.
 * @param {string} filter - L'état du filtre.
 */
export function writeFilterState(filter) {
  serialize(filterStatePath, { filterState: filter });
}

/**
 * Récupère la liste des tâches filtrées.
 * @param {string} filter - Le type de filtre à appliquer.
 * @returns {Array} La liste des tâches filtrées.
 */
export function getFilteredList(filter) {
  const tasks = allTasks();

  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  } else if (filter === 'todo') {
    return tasks.filter((task) => !task.completed);
  } else if (filter === 'important') {
    return tasks.filter((task) => task.important);
  } else {
    return tasks;
  } // Si le filtre est 'none', on retourne toutes les tâches
}

/**
 * Récupère l'état actuel du filtre.
 * @returns {string} L'état actuel du filtre.
 */
export function getFilterState() {
  return DATA.filterState;
}
