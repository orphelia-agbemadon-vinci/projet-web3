import createTask from "./createATask.js";

const createTasksList = (tasks) => /*html*/ `
    <table class="todolist">
        ${tasks.map((task) => createTask(task)).join("")}
    </table>
`;

export default createTasksList;
