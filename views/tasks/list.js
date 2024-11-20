import createTask from "./task.js";

const createList = (tasks, filter) => /*html*/ `
<!-- Formulaire pour ajouter une tâche -->
<!-- <form id="add-task-form" hx-on::after-request="document.querySelector('form').reset()" hx-post="/tasks/add" hx-target="#task-list" hx-swap="innerHTML">
                        <input type="text" id="task-input" name="description" placeholder="Nouvelle tâche..." required>
                        <button type="submit">Ajouter</button>
                    </form> -->
    <table class="todolist">
            ${tasks.map(task => createTask(task)).join('')}
    </table>
    ${filter === 'none' && tasks.length > 0 ? `
        <!-- Ligne de séparation -->
        <hr class="separator">

        <div class="delete-all-container">
        <!-- Bouton Tout supprimer -->
        <button id="delete-all-button" hx-delete="/tasks/delete-all" hx-target="#task-list" hx-swap="innerHTML">Supprimer toutes les tâches</button>
        </div>
    ` : ''}
    
`;

export default createList;