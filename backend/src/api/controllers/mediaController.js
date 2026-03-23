const mediaService = require('../../services/mediaService');

const addMedia = async (req, res, next) => {
  try { res.status(201).json({ success: true, data: await mediaService.createMedia(req.body) }); }
  catch (e) { if(e.code === 11000) return res.status(409).json({ success: false, message: 'Serial o URL duplicado' }); next(e); }
};

const retrieveAllMedia = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await mediaService.getAllMedia() }); } catch (e) { next(e); }
};

const modifyMedia = async (req, res, next) => {
  try { res.status(200).json({ success: true, data: await mediaService.updateMediaData(req.params.id, req.body) }); } catch (e) { next(e); }
};

module.exports = { addMedia, retrieveAllMedia, modifyMedia };
