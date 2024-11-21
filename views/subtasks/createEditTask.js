const createEditTask = (task) => /*html*/ `
    <tr data-id="${task.id}">
        <td colspan="4">
            <form 
                hx-patch="/tasks/edit/${task.id}" 
                hx-target="closest tr" 
                hx-swap="outerHTML">
                <input type="text" name="description" value="${task.description}">
                <button>Save</button>
            </form>
        </td>
    </tr>
`;

export default createEditTask;
