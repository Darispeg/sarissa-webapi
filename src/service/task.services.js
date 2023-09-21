const Task = require('../models/task.model');

async function listTasks() {
    const tasks = await Task.find().populate('assigned_users');
    return tasks;
}

async function findByTaskId(id) {
    return Task.findById(id).populate('assigned_users');
}

async function saveTask(task) {
    const { title, description, assigned_users, task_completion, root_cause, source_action, progress, status } = task;
    const newTask = new Task({ title, description, assigned_users, task_completion, root_cause, source_action, progress, status });

    const nowDate = new Date();
    newTask.created = nowDate.toISOString().slice(0, 10);
    newTask.modified = nowDate.toISOString().slice(0, 10);

    await newTask.save().then(t => t.populate('assigned_users')).then(t => t);

    return newTask;
}

async function updateTask(id, task) {
    task.modified = new Date().toISOString().slice(0, 10);
    
    const taskUpdated = await Task.findByIdAndUpdate(id, {
        $set: task
    }, { new : true }).then(t => t.populate('assigned_users')).then(t => t);

    return taskUpdated;
}

async function deleteTask(id) {
    return await Task.findByIdAndDelete(id)
}

module.exports = { listTasks, findByTaskId, saveTask, updateTask, deleteTask };
