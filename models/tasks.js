const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/tasks.json');

function allTasks() { 
    return parse(jsonDbPath);
}

function createTask(description, completed, important) {
    const tasks = parse(jsonDbPath);
    
    const createdTask = {
        description: description,
        completed: completed,
        important: important,
        originalIndex: tasks.length
    };

    tasks.push(createdTask);
    serialize(jsonDbPath, tasks);

    return createdTask;
}

function deleteTask(index) {
    const tasks = parse(jsonDbPath);
    if (index >= 0 && index < tasks.length) {
        const deletedTask = tasks.splice(index, 1);
        serialize(jsonDbPath, tasks);
        return deletedTask;
    }
    return null;
}

function toggleImportance(index) {
    const tasks = parse(jsonDbPath);
    if (index >= 0 && index < tasks.length) {
        tasks[index].important = !tasks[index].important;
        const task = tasks.splice(index, 1)[0];
        if (task.important) {
            tasks.unshift(task); // Ajouter au début si important
        } else {
            tasks.splice(task.originalIndex, 0, task); // Remettre à l'index d'origine si non important
        }
        serialize(jsonDbPath, tasks);
        return tasks[index];
    }
    return null;
}

function toggleCompletion(index) {
    const tasks = parse(jsonDbPath);
    if (index >= 0 && index < tasks.length) {
        tasks[index].completed = !tasks[index].completed;
        serialize(jsonDbPath, tasks);
        return tasks[index];
    }
    return null;
}

function updateTask(index, newDescription) {
    const tasks = parse(jsonDbPath);
    if (index >= 0 && index < tasks.length) {
        tasks[index].description = newDescription;
        serialize(jsonDbPath, tasks);
        return tasks[index];
    }
    return null;
}

module.exports = {
    createTask,
    allTasks,
    deleteTask,
    toggleImportance,
    toggleCompletion,
    updateTask
};