const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Character = mongoose.Schema({
  name: { type: String, required: true },
  edited: Date,
  created: Date,
  gender: String,
  height: Number,
  hair_color: String,
  skin_color: String,
  eye_color: String,
  birth_year: String,
  key: { type: Number, unique: true },
  homeworld_key: Number,
  homeworld: {
    type: ObjectId,
    ref: 'Planet'
  }
});

module.exports = mongoose.model('Character', Character);
