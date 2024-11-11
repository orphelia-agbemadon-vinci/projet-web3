document.getElementById('add-task-form').addEventListener('htmx:afterRequest', function () {
    document.getElementById('task-input').value = '';
});