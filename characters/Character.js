const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Character = mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  edited: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  gender: {
    type: String,
  },
  height: {
    type: Number,
  },
  hair_color: {
    type:String,
  },
  skin_color: {
    type:String,
  },
  eye_color: {
    type: String,
  },
  birth_year: {
    type: String,
  },
  key: { 
    type: Number, 
    unique: true 
  },
  homeworld_key: {
    type: Number
  },
  // add homeworld field that links the character to it's planet
  homeworld: {
    type: ObjectId,
    ref: 'Planet'
  },
  movies: {
    type: [mongoose.Schema.Types.Mixed]
  }
});

module.exports = mongoose.model('Character', Character);
