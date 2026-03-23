const genreService = require('../../services/genreService');

const addGenre = async (req, res, next) => {
  try {
    const genre = await genreService.createGenre(req.body);
    res.status(201).json({ success: true, data: genre });
  } catch (e) {
    if (e.code === 11000) return res.status(409).json({ success: false, message: 'Género duplicado' });
    next(e);
  }
};

const retrieveAllGenres = async (req, res, next) => {
  try {
    const data = await genreService.getAllGenres();
    res.status(200).json({ success: true, data });
  } catch (e) { next(e); }
};

const modifyGenre = async (req, res, next) => {
  try {
    const data = await genreService.updateGenreData(req.params.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (e) { next(e); }
};

module.exports = { addGenre, retrieveAllGenres, modifyGenre };
