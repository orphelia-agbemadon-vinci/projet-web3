import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from '../utils/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDbPath = path.join(__dirname, '/../data/tasks.js');

//import allTasks() from '../data/tasks.js';

// Fonction pour lire toutes les tâches
export function allTasks() {
    return parse(jsonDbPath);
}

// Fonction pour ajouter une nouvelle tâche
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

// Fonction pour supprimer une tâche
export function deleteTask(index) {
    const tasks = allTasks();
    const deletedTask = tasks.splice(index, 1);

    serialize(jsonDbPath, tasks);

    return deletedTask;
}

export function deleteTaskById(id) {
    const tasks = allTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        console.error(`Task with id ${id} not found.`);
        return null;
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);

    serialize(jsonDbPath, tasks);

    return deletedTask;
}

// Fonction pour marquer une tâche comme importante
export function toggleImportance(id) {
    const tasks = allTasks();

    console.log('All tasks:', tasks);

    // Trouver l'indice de la tâche avec l'id donné
    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex === -1) {
        console.error(`Task with id ${id} not found.`);
        return null;
    }

    console.log('Found task index:', taskIndex);
    console.log('Task before update:', tasks[taskIndex]);

    // Basculer la propriété 'important'
    tasks[taskIndex].important = !tasks[taskIndex].important;

    // Extraire la tâche pour réorganisation
    const [task] = tasks.splice(taskIndex, 1);

    // Réorganiser selon l'importance
    if (task.important) {
        tasks.unshift(task); // Ajouter au début si important
    } else {
        tasks.push(task); // Ajouter à la fin si non important
    }

    console.log('Tasks after reordering:', tasks);

    // Sauvegarder dans le fichier JSON
    serialize(jsonDbPath, tasks);

    // Retourner la tâche mise à jour
    return task;
}

// Fonction pour marquer une tâche comme complétée
export function toggleCompletion(index) {
    const tasks = allTasks();
    tasks[index].completed = !tasks[index].completed;

    serialize(jsonDbPath, tasks);

    return tasks[index];
}

// Fonction pour mettre à jour une tâche
export function updateTask(index, newDescription) {
    const tasks = allTasks();
    tasks[index].description = newDescription;

    serialize(jsonDbPath, tasks);

    return tasks[index];
}

// Fonction pour trouver une tâche
export function findTask(index) {
    const tasks = allTasks();
    return tasks[index];
}

// Fonction pour assigner une tâche à une liste
export function assignTaskToList(index, listId) {
    const tasks = allTasks();
    tasks[index].listId = listId;

    serialize(jsonDbPath, tasks);

    return tasks[index];
}