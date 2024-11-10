// models/Helmet.js
const mongoose = require('mongoose');

const helmetSchema = new mongoose.Schema({
  helmetId: { type: String, required: true, unique: true },
  mq2Level: { type: Number, default: 0 },
  mq7Level: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Helmet', helmetSchema);
