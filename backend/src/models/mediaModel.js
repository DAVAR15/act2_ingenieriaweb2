const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  serial: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  synopsis: { type: String, required: true, trim: true },
  url: { type: String, required: true, unique: true, trim: true },
  coverImage: { type: String, required: true, trim: true },
  releaseYear: { type: Number, required: true },
  genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
  director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director', required: true },
  producer: { type: mongoose.Schema.Types.ObjectId, ref: 'Producer', required: true },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', mediaSchema);
