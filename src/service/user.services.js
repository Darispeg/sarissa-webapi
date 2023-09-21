const User = require('../models/user.model');

async function listUsers() {
    const users = await User.find();
    return users;
}

async function findByUserId(id) {
    return User.findById(id);
}

async function saveUser(user) {
    const { name, last_name, ci, email, password, phone, position, role, status, birthday } = user;
    const newUser = new User({ name, last_name, ci, email, password, phone, position, role, status, birthday });

    const nowDate = new Date();
    newUser.created = nowDate.toISOString().slice(0, 10);
    newUser.modified = nowDate.toISOString().slice(0, 10);
    
    await newUser.save();
    return newUser;
}

async function updateUser(id, user) {
    user.modified = new Date().toISOString().slice(0, 10);

    const userUpdated = await User.findByIdAndUpdate(id, {
        $set: user
    }, { new : true });

    return userUpdated;
}

async function deleteUser(id) {
    return await User.findByIdAndDelete(id)
}

module.exports = { listUsers, findByUserId, saveUser, updateUser, deleteUser };