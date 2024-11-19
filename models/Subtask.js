import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from '../utils/json.js';
import { findTaskIndex, findTask } from './Task.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDbPath = path.join(__dirname, '/../data/tasks.js');

// Fonction pour ajouter une nouvelle sous-tâche
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

// Fonction pour supprimer une sous-tâche
export function deleteSubTask(taskId, subTaskId) {
    const tasks = parse(jsonDbPath);
    const taskIndex = findTaskIndex(taskId);
    if (taskIndex === -1) {
        throw new Error(`Task with id ${taskId} not found`);
    }
    const subTasks = tasks[taskIndex].subtasks;
    const subTaskIndex = subTasks.findIndex(subtask => subtask.idSubtask === subTaskId);
    if (subTaskIndex === -1) {
        throw new Error(`Subtask with id ${subTaskId} not found`);
    }
    const [deletedSubTask] = subTasks.splice(subTaskIndex, 1);
    serialize(jsonDbPath, tasks);
    return deletedSubTask;
}

// Fonction pour cocher une sous-tâche
export function toggleSubTaskCompletion(taskId, subTaskId) {
    const tasks = parse(jsonDbPath);
    const taskIndex = findTaskIndex(taskId);
    if (taskIndex === -1) {
        throw new Error(`Task with id ${taskId} not found`);
    }
    const subTasks = tasks[taskIndex].subtasks;
    const subTaskIndex = subTasks.findIndex(subtask => subtask.idSubtask === subTaskId);
    if (subTaskIndex === -1) {
        throw new Error(`Subtask with id ${subTaskId} not found`);
    }
    subTasks[subTaskIndex].completed = !subTasks[subTaskIndex].completed;

    serialize(jsonDbPath, tasks);

    return subTasks[subTaskIndex];
}

// Fonction pour afficher toutes les sous-tâches d'une tâche
export function getAllSubTasks(taskId) {
    const tasks = parse(jsonDbPath);
    const taskIndex = findTaskIndex(taskId);
    if (taskIndex === -1) {
        throw new Error(`Task with id ${taskId} not found`);
    }
    return tasks[taskIndex].subtasks;
}

// Fonction pour récupérer les détails d'une tâche et ses sous-tâches
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