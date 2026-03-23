const User = require('../models/userModel');

const createUser = async (data) => await new User(data).save();
const getAllUsers = async () => await User.find().sort({ createdAt: -1 });
const updateUser = async (id, data) => await User.findByIdAndUpdate(id, data, { new: true });
const deactivateUser = async (id) => await User.findByIdAndUpdate(id, { isActive: false }, { new: true });

module.exports = { createUser, getAllUsers, updateUser, deactivateUser };
