const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/tasks.json');

const { updateTask, allTasks } = require('./tasks');

function addSubTask(taskIndex, subTaskDescription) {
    const tasks = parse(jsonDbPath);
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const subTask = {
            description: subTaskDescription,
            completed: false,
        };
        tasks[taskIndex].subtasks = tasks[taskIndex].subtasks || [];
        tasks[taskIndex].subtasks.push(subTask);
        serialize(jsonDbPath, tasks);
        return subTask;
    }
    return null;
}

function deleteSubTask(taskIndex, subTaskIndex) {
    const tasks = allTasks();
    if (taskIndex >= 0 && taskIndex < tasks.length) {
        const subTasks = tasks[taskIndex].subtasks || [];
        if (subTaskIndex >= 0 && subTaskIndex < subTasks.length) {
            const deletedSubTask = subTasks.splice(subTaskIndex, 1);
            serialize(jsonDbPath, tasks);

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
            serialize(jsonDbPath, tasks);
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