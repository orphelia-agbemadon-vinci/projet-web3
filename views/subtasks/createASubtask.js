const createASubtask = (subtask, task) => /*html*/ `
    <tr data-id="${subtask.idSubtask}">
        <td class="check-box">
            <input
                type="checkbox"
                ${subtask.completed ? "checked" : ""}
                hx-post="/tasks/subtasks/toggle-subtask/${task.id}/${subtask.idSubtask}"
                hx-target="closest tr"
                hx-swap="outerHTML">
        </td>
        <td class="subtask-col ${subtask.completed ? "completed" : ""}">
            <label>${subtask.descriptionSubtask}</label>
        </td>
        <td class="actions-col">
            <button class="delete-button"
                hx-delete="/tasks/subtasks/delete/${task.id}/${subtask.idSubtask}"
                hx-target="closest tr"
                hx-swap="outerHTML"
                hx-confirm="Êtes-vous sûr(e) de vouloir supprimer cette sous-tâche ?\nCette action est irréversible.">
                <i class="fa fa-trash"></i>
            </button>
        </td>
    </tr>
`;

export default createASubtask;
