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
        idSubtask: tasks[taskIndex].subtasks.length + 1,
        descriptionSubtask: subTaskDescription,
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
    const subTaskIdx = subTasks.findIndex(subtask => subtask.idSubtask === subTaskIndex);
    const deletedSubTask = subTasks.splice(subTaskIdx, 1);
    serialize(jsonDbPath, tasks);
    return deletedSubTask;
    
}

// Fonction pour cocher une sous-tâche
export function toggleSubTaskCompletion(taskIndex, subTaskIndex) {
    const tasks = parse(jsonDbPath);
    const subTasks = tasks[taskIndex].subtasks;
    const subTask = subTasks.find(subtask => subtask.idSubtask === subTaskIndex);

    if (!subTask) {
        throw new Error(`Subtask with id ${subTaskIndex} not found`);
    }

    subTask.completed = !subTask.completed;

    serialize(jsonDbPath, tasks);

    return subTask;
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