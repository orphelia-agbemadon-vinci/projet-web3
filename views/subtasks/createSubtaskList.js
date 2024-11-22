import createASubtask from "./createASubtask.js";

const createSubtaskList = (subtasks, task) => /*html*/ `
    <div id="subtask-list">
        <div>
            <h2 class="${task.completed ? "completed" : ""}">${task.description}</h2>
        </div>
        <form id="add-task-form" 
            hx-post="/tasks/subtasks/add/${task.id}" 
            hx-target="#subtask-list" 
            hx-swap="outerHTML">
            <input type="text" name="subtask" placeholder="Nouvelle sous-tâche..." required>
            <button>Ajouter</button>
        </form>
        <div id="subtask-title">
            <table class="todolist">
                ${subtasks.map((subtask) => createASubtask(subtask, task)).join("")}
            </table>
        </div>
        ${
          subtasks.length > 0
            ? `
            <!-- Bouton Tout supprimer -->
            <div class="delete-all-container">
                <button id="delete-all-button" class="delete-all-button" hx-delete="/tasks/subtasks/delete-all/${task.id}" hx-target="#subtask-list" hx-swap="innerHTML" hx-confirm="Êtes-vous sûr(e) de vouloir supprimer toutes les sous-tâches ?\nCette action est irréversible.">Supprimer toutes les sous-tâches</button>
            </div>
        `
            : ""
        }
    </div>
`;

export default createSubtaskList;
