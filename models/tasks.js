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
        important: important
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

module.exports = {
    createTask,
    allTasks,
    deleteTask,
    toggleImportance,
    toggleCompletion
};