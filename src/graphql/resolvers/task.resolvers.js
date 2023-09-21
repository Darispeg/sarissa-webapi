const { listTasks, findByTaskId, saveTask, updateTask, deleteTask } = require('../../service/task.services');

const taskResolver = {
    Query: {
        async getAllTasks() {
            return listTasks();
        },
        async getTask(_, {id}) {
            return findByTaskId(id);
        }
    },
    Mutation: {
        async createTask(_, arg) {
            const newTask = saveTask(arg.task);
            return newTask;
        },

        async updateTask(_, arg) {
            const taskUpdated = updateTask(arg.id, arg.task);
            return taskUpdated;
        },

        async deleteTask(_, {id}) {
            deleteTask(id)
            return 'Task deleted';
        }
    }
};

module.exports = { taskResolver };