import createTask from "./task.js";

const createList = (tasks) => /*html*/ `
<!-- Formulaire pour ajouter une tâche -->
<!-- <form id="add-task-form" hx-on::after-request="document.querySelector('form').reset()" hx-post="/tasks/add" hx-target="#task-list" hx-swap="innerHTML">
                        <input type="text" id="task-input" name="description" placeholder="Nouvelle tâche..." required>
                        <button type="submit">Ajouter</button>
                    </form> -->
    <table class="todolist">
            ${tasks.map(task => createTask(task)).join('')}
    </table>
`;

export default createList;