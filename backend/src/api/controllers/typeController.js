const typeService = require('../../services/typeService');

const addType = async (req, res, next) => {
  try { res.status(201).json({ success: true, data: await typeService.createType(req.body) }); }
  catch (e) { if(e.code === 11000) return res.status(409).json({ success: false, message: 'Tipo duplicado' }); next(e); }
};

const retrieveAllTypes = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await typeService.getAllTypes() }); } catch (e) { next(e); }
};

const modifyType = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await typeService.updateTypeData(req.params.id, req.body) }); } catch (e) { next(e); }
};

module.exports = { addType, retrieveAllTypes, modifyType };
