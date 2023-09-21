const { listUsers, findByUserId, saveUser, updateUser, deleteUser } = require('../../service/user.services');

const userResolver = {
    Query: {
        async getAllUsers() {
            return listUsers();
        },
        async getUser(_, {id}) {
            return findByUserId(id);
        }
    },
    Mutation: {
        async createUser(_, arg) {
            const newUser = saveUser(arg.user)
            return newUser;
        },

        async updateUser(_, arg) {
            const userUpdated = updateUser(arg.id, arg.user);
            return userUpdated;
        },

        async deleteUser(_, {id}) {
            deleteUser(id)
            return 'User deleted';
        }
    }
};

module.exports = { userResolver };