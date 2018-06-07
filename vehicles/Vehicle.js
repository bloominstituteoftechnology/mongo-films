const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Vehicle = new mongoose.Schema({
  vehicle_class: String,
  pilot_keys: [Number],
  key: { type: String, unique: true },
  pilots: [{ type: ObjectId, ref: "Character"}]
});

module.exports = mongoose.model('Vehicle', Vehicle);
