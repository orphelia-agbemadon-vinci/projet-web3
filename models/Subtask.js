const path = require('node:path');
const { parse, serialize } = require('../utils/json.js');

const jsonDbPath = path.join(__dirname, '/../data/tasks.json');

// Fonction pour ajouter une nouvelle sous-tâche
function addSubTask(taskIndex, subTaskDescription) {
    const tasks = parse(jsonDbPath);
    const newSubtask = {
        description: subTaskDescription,
        completed: false,
    };
    tasks[taskIndex].subtasks.push(newSubtask);

    serialize(jsonDbPath, tasks);

    return newSubtask;
}

// Fonction pour supprimer une sous-tâche
function deleteSubTask(taskIndex, subTaskIndex) {
    const tasks = parse(jsonDbPath);
    const subTasks = tasks[taskIndex].subtasks;
    const deletedSubTask = subTasks.splice(subTaskIndex, 1);

    serialize(jsonDbPath, tasks);

    return deletedSubTask;
}

// Fonction pour cocher une sous-tâche
function toggleSubTaskCompletion(taskIndex, subTaskIndex) {
    const tasks = parse(jsonDbPath);
    const subTasks = tasks[taskIndex].subtasks;
    subTasks[subTaskIndex].completed = !subTasks[subTaskIndex].completed;

    serialize(jsonDbPath, tasks);

    return subTasks[subTaskIndex];
}

// Fonction pour afficher toutes les sous-tâche d'une tâche
function getAllSubTasks(taskIndex) {
    const tasks = parse(jsonDbPath);
    
    return tasks[taskIndex].subtasks;
}

module.exports = {
    addSubTask,
    deleteSubTask,
    toggleSubTaskCompletion,
    getAllSubTasks,
};