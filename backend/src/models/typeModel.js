const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  description: { type: String, required: true, trim: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Type', typeSchema);
