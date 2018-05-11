const mongoose = require("mongoose");
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
  // add homeworld field that links the character to it's planet
    films: [{type: ObjectId, ref: 'Film'}],
    homeworld: [{type: ObjectId, ref: 'Planet'}],
    vehicles: [{type: ObjectId, ref: 'Vehicle'}]
});

const options = {
  strict: false
};

module.exports = mongoose.model("Character", Character);
