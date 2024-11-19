import createASubtask from './subtask.js';

const createSubtaskList = (subtasks, task) => /*html*/ `
    <div id="subtask-list">
        <div>
            <h2>Sous-tâches de la tâche : ${task.description}</h2>
        </div>
        <form hx-post="/tasks/subtasks/add/${task.id}" hx-target="#subtask-list" hx-swap="innerHTML">
            <input type="text" name="subtask" placeholder="Nouvelle sous-tâche..." required>
            <button type="submit">Ajouter</button>
        </form>

    <div id="subtask-title">
        <table class="todolist">
            ${subtasks.map(subtask => createASubtask(subtask, task)).join('')}
        </table>
    </div>
`;

export default createSubtaskList;