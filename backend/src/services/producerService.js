const Producer = require('../models/producerModel');
const createProducer = async (data) => await new Producer(data).save();
const getAllProducers = async () => await Producer.find().sort({ createdAt: -1 });
const updateProducerData = async (id, data) => await Producer.findByIdAndUpdate(id, data, { new: true });
module.exports = { createProducer, getAllProducers, updateProducerData };
