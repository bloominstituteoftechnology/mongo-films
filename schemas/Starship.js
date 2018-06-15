const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Starship = new mongoose.Schema({
  pilot_keys: [Number],
  mglt: String,
  starship_class: String,
  hyperdrive_rating: String,
  key: { type: Number, unique: true },
  pilots: [{type: ObjectId, ref: 'Character'}],
});

module.exports = mongoose.model('Starship', Starship);
