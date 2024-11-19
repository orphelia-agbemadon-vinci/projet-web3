import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from '../utils/json.js';
import { findTaskIndex } from './Task.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDbPath = path.join(__dirname, '/../data/tasks.js');

// Fonction pour ajouter une nouvelle sous-tâche
export function addSubTask(taskIndex, subTaskDescription) {
    const tasks = parse(jsonDbPath);
    const newSubtask = {
        description: subTaskDescription,
        completed: false,
    };
    tasks[taskIndex].subtasks.push(newSubtask);

    serialize(jsonDbPath, tasks);

    return newSubtask;
}

// Fonction pour supprimer une sous-tâche
export function deleteSubTask(taskIndex, subTaskIndex) {
    const tasks = parse(jsonDbPath);
    const subTasks = tasks[taskIndex].subtasks;
    const deletedSubTask = subTasks.splice(subTaskIndex, 1);

    serialize(jsonDbPath, tasks);

    return deletedSubTask;
}

// Fonction pour cocher une sous-tâche
export function toggleSubTaskCompletion(taskIndex, subTaskIndex) {
    const tasks = parse(jsonDbPath);
    const subTasks = tasks[taskIndex].subtasks;
    subTasks[subTaskIndex].completed = !subTasks[subTaskIndex].completed;

    serialize(jsonDbPath, tasks);

    return subTasks[subTaskIndex];
}

// Fonction pour afficher toutes les sous-tâche d'une tâche
export function getAllSubTasks(taskIndex) {
    const tasks = parse(jsonDbPath);
    
    return tasks[taskIndex].subtasks;
}

// Fonction pour récupérer les détails d'une tâche et ses sous-tâches
export function getTaskDetailsWithSubtasks(id) {
    const tasks = parse(jsonDbPath);
    const taskIndex = findTaskIndex(id);

    if (taskIndex !== -1) {
        const task = tasks[taskIndex];
        const subTasks = getAllSubTasks(taskIndex);
        return { task, subTasks };
    } else {
        return null;
    }
}