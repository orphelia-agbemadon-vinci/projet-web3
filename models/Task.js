import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse, serialize } from '../utils/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDbPath = path.join(__dirname, '/../data/tasks.js');


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

// Fonction pour supprimer toutes les tâches
export function deleteAllTasks() {
    const tasks = [];
    serialize(jsonDbPath, tasks);
    return tasks;
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
export function toggleCompletion(id) {
    const tasks = parse(jsonDbPath);
    const task = tasks.find(task => task.id === id);
    if (!task) {
        throw new Error(`Task with id ${id} not found`);
    }
    task.completed = !task.completed;
    serialize(jsonDbPath, tasks);

    return task;
}

// Fonction pour mettre à jour une tâche
export function updateTask(index, newDescription) {
    const tasks = allTasks();
    tasks[index].description = newDescription;

    serialize(jsonDbPath, tasks);

    return tasks[index];
}

// Fonction pour trouver une tâche par son id
export function findTask(id) {
    const tasks = allTasks();
    return tasks.find(task => task.id === id);
}

export function findTaskIndex(id) {
    const tasks = allTasks();
    return tasks.findIndex(task => task.id === id);
}

// Pour le filtre par défaut
export function getDefaultFilter() {
    return 'none';
}
