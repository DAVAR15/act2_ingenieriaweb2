const Type = require('../models/typeModel');
const createType = async (data) => await new Type(data).save();
const getAllTypes = async () => await Type.find().sort({ createdAt: -1 });
const updateTypeData = async (id, data) => await Type.findByIdAndUpdate(id, data, { new: true });
module.exports = { createType, getAllTypes, updateTypeData };
