const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/tasks.json');

// Fonction pour lire toutes les tâches
function allTasks() {
    return parse(jsonDbPath);
}

// Fonction pour ajouter une nouvelle tâche
function createTask(description) {
    const tasks = parse(jsonDbPath);
    
    const createdTask = {
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
function deleteTask(index) {
    const tasks = parse(jsonDbPath);
    const deletedTask = tasks.splice(index, 1);

    serialize(jsonDbPath, tasks);

    return deletedTask;
}

// Fonction pour marquer une tâche comme importante
function toggleImportance(index) {
    const tasks = parse(jsonDbPath);
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
function toggleCompletion(index) {
    const tasks = parse(jsonDbPath);
    tasks[index].completed = !tasks[index].completed;

    serialize(jsonDbPath, tasks);

    return tasks[index];
}

// Fonction pour mettre à jour une tâche
function updateTask(index, newDescription) {
    const tasks = parse(jsonDbPath);
    tasks[index].description = newDescription;

    serialize(jsonDbPath, tasks);

    return tasks[index];
}

// Fonction pour trouver une tâche
function findTask(index) {
    const tasks = parse(jsonDbPath);
    
    return tasks[index];
}

// Fonction pour assigner une tâche à une liste
function assignTaskToList(index, listId) {
    const tasks = parse(jsonDbPath);
    tasks[index].listId = listId;

    serialize(jsonDbPath, tasks);

    return tasks[index];
}

module.exports = {
    createTask,
    allTasks,
    deleteTask,
    toggleImportance,
    toggleCompletion,
    updateTask,
    findTask,
    assignTaskToList,
};