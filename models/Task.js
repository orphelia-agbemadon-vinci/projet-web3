// import path from 'node:path';
// import { fileURLToPath } from 'node:url';
// import { parse, serialize } from '../utils/json.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// import allTasks() from '../data/data.js';
// const jsonDbPath = path.join(__dirname, '/../data/tasks.json');

// // Fonction pour lire toutes les tâches
// export function allTasks() {
//         // return parse(jsonDbPath);
//         return allTasks();
// }

// // Fonction pour ajouter une nouvelle tâche
// export function createTask(description) {
//     //const tasks = parse(jsonDbPath);
//     const tasks = allTasks();
//     const createdTask = {
//         id: tasks.length + 1,
//         description: description,
//         completed: false,
//         important: false,
//         listId: null,
//         subtasks: [],
//     };
//     tasks.push(createdTask);

//     //serialize(jsonDbPath, tasks);

//     return createdTask;
// }

// // Fonction pour supprimer une tâche
// export function deleteTask(index) {
//     const tasks = parse(jsonDbPath);
//     const deletedTask = tasks.splice(index, 1);

//     serialize(jsonDbPath, tasks);

//     return deletedTask;
// }

// // Fonction pour marquer une tâche comme importante
// export function toggleImportance(index) {
//     const tasks = parse(jsonDbPath);
//     tasks[index].important = !tasks[index].important;
//     const task = tasks.splice(index, 1)[0];

//     if (task.important) {
//         tasks.unshift(task); // Ajouter au début si important
//     } else {
//         tasks.push(task); // Ajouter à la fin si non important
//     }

//     serialize(jsonDbPath, tasks);

//     return tasks[index];
// }

// // Fonction pour marquer une tâche comme complétée
// export function toggleCompletion(index) {
//     const tasks = parse(jsonDbPath);
//     tasks[index].completed = !tasks[index].completed;

//     serialize(jsonDbPath, tasks);

//     return tasks[index];
// }

// // Fonction pour mettre à jour une tâche
// export function updateTask(index, newDescription) {
//     const tasks = parse(jsonDbPath);
//     tasks[index].description = newDescription;

//     serialize(jsonDbPath, tasks);

//     return tasks[index];
// }

// // Fonction pour trouver une tâche
// export function findTask(index) {
//     const tasks = parse(jsonDbPath);
    
//     return tasks[index];
// }

// // Fonction pour assigner une tâche à une liste
// export function assignTaskToList(index, listId) {
//     const tasks = parse(jsonDbPath);
//     tasks[index].listId = listId;

//     serialize(jsonDbPath, tasks);

//     return tasks[index];
// }

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

export function deleteTask(id) {
    const tasks = parse(jsonDbPath);
    const deletedTask = tasks.splice(id, 1);
    serialize(jsonDbPath, tasks);

    return deletedTask;
}

// export function deleteTask(index) {
//     const tasks = allTasks();
//     const deletedTask = tasks.splice(index, 1);

//     serialize(jsonDbPath, tasks);

//     return deletedTask;
// }

// Fonction pour marquer une tâche comme importante
export function toggleImportance(index) {
    const tasks = allTasks();
    tasks[index].important = !tasks[index].important;
    const task = tasks.splice(index, 1)[0];

    if (task.important) {
        tasks.unshift(task); // Ajouter au début si important
    } else {
        tasks.push(task); // Ajouter à la fin si non important
    }

    serialize(jsonDbPath, tasks);

    return tasks[index];
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


// export function toggleCompletion(index) {
//     const tasks = allTasks();
//     tasks[index].completed = !tasks[index].completed;

//     serialize(jsonDbPath, tasks);

//     return task;
// }

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