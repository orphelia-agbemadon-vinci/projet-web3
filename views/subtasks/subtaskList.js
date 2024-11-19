import createASubtask from './subtask.js';


const createSubtaskList = (subtasks, task) => /*html*/ `
    
    <h3>${task.description}</h3>
    <form hx-post="/tasks/add/subtasks/${task.id}" hx-target="#subtask-list" hx-swap="innerHTML">
        <input type="text" name="subtask" placeholder="Nouvelle sous-tâche..." required>
        <button type="submit">Ajouter</button>
    </form>

    <table id="subtasks" class="todolist">
        ${subtasks.map(subtask => createASubtask(subtask,task.id)).join('')}
    </table>

`;

export default createSubtaskList;