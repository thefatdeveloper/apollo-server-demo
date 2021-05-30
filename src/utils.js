module.exports = {
    stringfyTask: (operation, task, tasks) => {
        // removing nulls if any
        const updatedTasks = tasks.filter((el) => el !== null);
        if (operation === 'update') {
            updatedTasks.filter((el) => el.id === task.id)[0].completed = task.completed;
        } else if (operation === 'create') {
            updatedTasks.push(task);
        } else {
            updatedTasks.splice(tasks.indexOf(task), 1);
        }
        return JSON.stringify(updatedTasks);
    },
};
