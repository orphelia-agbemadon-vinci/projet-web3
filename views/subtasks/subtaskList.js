import createASubtask from './subtask.js';

const createSubtaskList = (subtasks, task) => /*html*/ `
    <div id="subtask-list">
        
        <table class="todolist">
            ${subtasks.map(subtask => createASubtask(subtask, task)).join('')}
        </table>
    </div>
`;

export default createSubtaskList;