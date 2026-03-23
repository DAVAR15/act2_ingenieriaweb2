const mongoose = require('mongoose');

const producerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  slogan: { type: String, trim: true },
  description: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Producer', producerSchema);
