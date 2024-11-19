import createASubtask from './subtask.js';

const createSubtaskList = (subtasks, task) => /*html*/ `
    <div id="subtask-list">
        <form hx-post="/tasks/subtasks/add/${task.id}" hx-target="#subtask-list" hx-swap="innerHTML">
            <input type="text" name="subtask" placeholder="Nouvelle sous-tâche..." required>
            <button type="submit">Ajouter</button>
        </form>

        <table class="todolist">
            ${subtasks.map(subtask => createASubtask(subtask, task)).join('')}
        </table>
    </div>
`;

export default createSubtaskList;