import createASubtask from './subtask.js';


const createSubtaskList = (subtasks,task) => /*html*/ `
   <h3>${task.description}</h3>
    <table class="subtask-list">
        ${subtasks.map(subtask => createASubtask(subtask,task.id)).join('')}
    </table>

`;

export default createSubtaskList;