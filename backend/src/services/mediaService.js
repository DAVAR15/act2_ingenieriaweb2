const Media = require('../models/mediaModel');

const createMedia = async (data) => await new Media(data).save();

const getAllMedia = async () => {
  return await Media.find()
    .populate('genre', 'name isActive')
    .populate('director', 'names isActive')
    .populate('producer', 'name isActive')
    .populate('type', 'name')
    .sort({ createdAt: -1 });
};

const updateMediaData = async (id, data) => {
  return await Media.findByIdAndUpdate(id, data, { new: true })
    .populate('genre', 'name isActive')
    .populate('director', 'names isActive')
    .populate('producer', 'name isActive')
    .populate('type', 'name');
};

module.exports = { createMedia, getAllMedia, updateMediaData };
