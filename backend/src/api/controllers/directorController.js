const directorService = require('../../services/directorService');

const addDirector = async (req, res, next) => {
  try {
    const director = await directorService.createDirector(req.body);
    res.status(201).json({ success: true, data: director });
  } catch (e) { next(e); }
};

const retrieveAllDirectors = async (req, res, next) => {
  try {
    const data = await directorService.getAllDirectors();
    res.status(200).json({ success: true, data });
  } catch (e) { next(e); }
};

const modifyDirector = async (req, res, next) => {
  try {
    const data = await directorService.updateDirectorData(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (e) { next(e); }
};

module.exports = { addDirector, retrieveAllDirectors, modifyDirector };
