const Director = require('../models/directorModel');
const createDirector = async (data) => await new Director(data).save();
const getAllDirectors = async () => await Director.find().sort({ createdAt: -1 });
const updateDirectorData = async (id, data) => await Director.findByIdAndUpdate(id, data, { new: true });
module.exports = { createDirector, getAllDirectors, updateDirectorData };
