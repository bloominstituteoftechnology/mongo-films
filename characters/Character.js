const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Character = mongoose.Schema({
  name: { type: String, required: true },
  edited: Date,
  created: Date,
  gender: String,
  height: {
    type: Number,
    validate: customHeightNumberValidator,
    msg: 'Number needs to be greater than 100',
    required: true
  },
  hair_color: String,
  skin_color: String,
  eye_color: String,
  birth_year: String,
  key: { type: Number, unique: true },
  homeworld_key: Number,
  // add homeworld field that links the character to it's planet
  homeworldId: { type: ObjectId, ref: 'Planet'},
});

function customHeightNumberValidator(height) {
  return height.number > 100;
}

module.exports = mongoose.model('Character', Character);
