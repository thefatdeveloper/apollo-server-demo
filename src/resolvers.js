const fs = require('fs');
const utils = require('./utils');

module.exports = {
    Query: {
        tasks: (_, __, { dataSources }) => {
            return dataSources.getTasks().filter((el) => el !== null);
        },
    },
    Mutation: {
        createTask: async (_, { task: { title, completed } }, { dataSources }) => {
            const tasks = dataSources.getTasks();
            let nextId = tasks[tasks.length - 1].id;
            if (!tasks.some((el) => el.title === title)) {
                const newTask = {
                    id: ++nextId,
                    title,
                    completed,
                };
                const jsonData = utils.stringfyTask('create', newTask, tasks);
                fs.writeFile('./src/tasks.json', jsonData, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                return newTask;
            } else {
                throw new Error('Task with same title exist!!');
            }
        },
        updateTask: async (_, { task: { id, completed } }, { dataSources }) => {
            const tasks = dataSources.getTasks();
            const task = tasks.filter((el) => el.id === Number(id))[0];
            if (typeof task !== 'undefined') {
                task.completed = completed;
                console.log(task.completed, ' task.completed');
                const jsonData = utils.stringfyTask('update', task, tasks);
                fs.writeFile('./src/tasks.json', jsonData, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                return task;
            } else {
                throw new Error('Id not present!!');
            }
        },
        deleteTask: async (_, { id }, { dataSources }) => {
            const tasks = dataSources.getTasks();
            const task = tasks.filter((el) => el.id === Number(id))[0];
            if (typeof task !== 'undefined') {
                const jsonData = utils.stringfyTask('delete', task, tasks);
                fs.writeFile('./src/tasks.json', jsonData, (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                const allTasks = JSON.parse(jsonData);
                return allTasks;
            } else {
                throw new Error('Id not present!!');
            }
        },
    },
};
