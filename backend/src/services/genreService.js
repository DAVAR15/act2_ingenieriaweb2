const Genre = require('../models/genreModel');
const createGenre = async (data) => await new Genre(data).save();
const getAllGenres = async () => await Genre.find().sort({ createdAt: -1 });
const updateGenreData = async (id, data) => await Genre.findByIdAndUpdate(id, data, { new: true });
module.exports = { createGenre, getAllGenres, updateGenreData };
