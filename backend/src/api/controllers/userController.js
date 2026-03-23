const userService = require('../../services/userService');

const addUser = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) { next(error); }
};

const retrieveAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) { next(error); }
};

const modifyUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, data: user });
  } catch (error) { next(error); }
};

const disableUser = async (req, res, next) => {
  try {
    const user = await userService.deactivateUser(req.params.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) { next(error); }
};

module.exports = { addUser, retrieveAllUsers, modifyUser, disableUser };
