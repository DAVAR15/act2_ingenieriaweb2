const producerService = require('../../services/producerService');

const addProducer = async (req, res, next) => {
  try { res.status(201).json({ success: true, data: await producerService.createProducer(req.body) }); }
  catch (e) { if(e.code === 11000) return res.status(409).json({ success: false, message: 'Productora duplicada' }); next(e); }
};

const retrieveAllProducers = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await producerService.getAllProducers() }); } catch (e) { next(e); }
};

const modifyProducer = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await producerService.updateProducerData(req.params.id, req.body) }); } catch (e) { next(e); }
};

module.exports = { addProducer, retrieveAllProducers, modifyProducer };
