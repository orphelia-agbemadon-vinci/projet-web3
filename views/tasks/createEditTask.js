const createEditTask = (task) => /*html*/ `
    <tr data-id="${task.id}">
        <td colspan="5">
            <form id="edit-task-form"
                hx-patch="/tasks/edit/${task.id}" 
                hx-target="closest tr" 
                hx-swap="outerHTML">
                <input type="text" name="description" class="inputWidth" value="${task.description}">
                <button class="editTaskBtn">Enregistrer</button>
            </form>
        </td>
    </tr>
`;

export default createEditTask;
