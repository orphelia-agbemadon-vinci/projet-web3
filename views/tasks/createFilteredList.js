import createATask from './createATask.js';

const createFilteredList = (tasks, filter) => /*html*/ `
    <table class="todolist">
        ${tasks.map((task) => createATask(task)).join('')}
    </table>
    <div>
        ${
          filter === 'none' && tasks.length > 0
            ? `
        <hr class="separator">

        <div class="delete-all-container">
        <!-- Bouton Tout supprimer -->
        <button 
                id="delete-all-button" 
                hx-delete="/tasks/delete-all" 
                hx-target="#task-list" 
                hx-swap="innerHTML" 
                hx-confirm="Êtes-vous sûr(e) de vouloir supprimer toutes les tâches ?\nCette action est irréversible.">
            Supprimer toutes les tâches
        </button>
        </div>
    `
            : ''
        }
    </div>
    
`;

export default createFilteredList;
