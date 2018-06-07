const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

const Vehicle = new mongoose.Schema({
  vehicle_class: String,
  pilot_keys: [Number],
  key: { type: Number, unique: true },
  pilots: [{ type: Schema.Types.ObjectId, ref: 'Character' }],
  // add pilots field to link it to the Character model
});

module.exports = mongoose.model('Vehicle', Vehicle);
