import createASubtask from './subtask.js';

const createSubtaskList = (subtasks, task) => /*html*/ `
    <form hx-post="/tasks/subtasks/add/${task.id}" hx-target=".todolist" hx-swap="delete">
        <input type="text" name="subtask" placeholder="Nouvelle sous-tâche..." required>
        <button type="submit">Ajouter</button>
    </form>

    <table class="todolist">
        ${subtasks.map(subtask => createASubtask(subtask, task)).join('')}
    </table>
`;

export default createSubtaskList;