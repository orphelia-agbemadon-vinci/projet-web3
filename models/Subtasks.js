const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/subtasks.json');
const { findTask, updateTask, allTasks, updateSubTask } = require('./tasks');
const tasks = allTasks();


function addSubTask(taskIndex, subTaskDescription) {
    const task = findTask(taskIndex);
    if (!task) {
        return null;
    }

    let subTasks = task.subtasks || [];
    const subTask = {
        description: subTaskDescription,
        completed: false,
    };
    subTasks.push(subTask);
    task.subtasks = subTasks;

    // Mettre à jour la tâche dans la base de données
    updateSubTask(taskIndex, task);

    return subTask;
}

function deleteSubTask(taskIndex, subTaskIndex) {
    const tasks = allTasks();
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const subTasks = tasks[taskIndex].details || [];
        if (subTaskIndex >= 0 && subTaskIndex < subTasks.length) {
            const deletedSubTask = subTasks.splice(subTaskIndex, 1);
            updateTask(taskIndex, tasks[taskIndex].description); // Utiliser updateTask pour mettre à jour la tâche
            return deletedSubTask;
        }
    }
    return null;
}

function toggleSubTaskCompletion(taskIndex, subTaskIndex) {
    const tasks = allTasks();
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const subTasks = tasks[taskIndex].details || [];
        if (subTaskIndex >= 0 && subTaskIndex < subTasks.length) {
            subTasks[subTaskIndex].completed = !subTasks[subTaskIndex].completed;
            updateTask(taskIndex, tasks[taskIndex].description); // Utiliser updateTask pour mettre à jour la tâche
            return subTasks[subTaskIndex];
        }
    }
    return null;
}

function getAllSubTasks(taskIndex) {
    const tasks = allTasks();
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        return tasks[taskIndex].details || [];
    }
    return [];
}

module.exports = {
    addSubTask,
    deleteSubTask,
    toggleSubTaskCompletion,
    getAllSubTasks,
};