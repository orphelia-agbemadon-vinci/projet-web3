// models/subtasks.js

const { findTask, updateTask, allTasks } = require('./tasks');

function addSubTask(taskIndex, subTaskDescription) {
    const tasks = allTasks();
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const subTask = {
            description: subTaskDescription,
            completed: false,
        };
        tasks[taskIndex].details = tasks[taskIndex].details || [];
        tasks[taskIndex].details.push(subTask);
        updateTask(taskIndex, tasks[taskIndex].description); // Utiliser updateTask pour mettre à jour la tâche
        return subTask;
    }
    return null;
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