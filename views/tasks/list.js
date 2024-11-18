import createTask from "./task.js";

const createList = (tasks) => /*html*/ `
    <table class="todolist">
            ${tasks.map(task => createTask(task)).join('')}
        
    </table>
`;

export default createList;