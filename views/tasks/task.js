const createATask = (task) => /*html*/ `
    <tr data-id="${task.id}" hx-target = "#task-list">
        <!-- Colonne pour le texte de la tâche -->
        <td class="check-box">
            <input
                type="checkbox"
                ${task.completed ? 'checked' : ''}
                hx-post="/tasks/toggle-complete/${task.id}"
                hx-target="closest tr"
                hx-swap="outerHTML">
        </td>
        <!-- Colonne pour le texte de la tâche avec condition pour barrer le texte -->
        <td class="task-col ${task.completed ? 'completed' : ''}">
            <label>${task.description}</label>
        </td>
        <!-- Colonne pour le bouton "Modifier" -->
        <td>
            <a
                class="edit-button"
                hx-get="/tasks/edit/${task.id}"
                hx-target="closest tr" 
                hx-swap="outerHTML">
                <i class="fa fa-pencil"></i>
            </a>
        </td>
        <!-- Colonne pour le bouton "Important" -->
        <td>
            <a
                class="star-button"
                hx-post="/tasks/toggle-important/${task.id}"
                hx-target="closest td"
                hx-swap="outerHTML"
                hx-trigger="click">
                <i class="fa ${task.important ? 'fa-star' : 'fa-star-o'}"></i>
            </a>
        </td>
        <!-- Colonne pour le bouton "Supprimer" -->
        <td class="">
            <button class="delete-button"
                hx-delete="/tasks/delete/${task.id}"
                hx-target="#task-list"
                hx-swap="innerHTML">
                <i class="fa fa-trash"></i>
            </button>
        </td>
    </tr>
`;

export default createATask;