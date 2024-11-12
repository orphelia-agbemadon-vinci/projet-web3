const tasks = [];

class Task {
    constructor(description) {
        this.description = description;
        this.details = [];
    }

    addSubTask(description) {
        this.details.push({ description, completed: false });
    }

    deleteSubTask(subIndex) {
        if (subIndex >= 0 && subIndex < this.details.length) {
            this.details.splice(subIndex, 1);
        }
    }

    toggleSubTask(subIndex) {
        if (subIndex >= 0 && subIndex < this.details.length) {
            this.details[subIndex].completed = !this.details[subIndex].completed;
        }
    }
}

module.exports = { Task, tasks };