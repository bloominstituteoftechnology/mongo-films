const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Species = new mongoose.Schema({
  edited: { 
    type: Date,             
    default: Date.now 
  },
  classification: {
    type:String,
  },
  name: {
    type:String,
    required: true, 
    index: true 
  },
  designation: {
    type:String,
  },
  created: { 
    type: Date, 
    default: Date.now 
  },
  eye_colors: {
    type:String,
  },
  people: [Number], // use this to populate the characters link as per readme
  skin_colors: {
    type:String,
  },
  language: {
    type:String,
  },
  hair_colors: {
    type:String,
  },
  average_lifespan: {
    type:String,
  },
  average_height: {
    type:String,
  },
  key: { 
    type: Number, 
    unique: true 
  },
  homeworld_key: {
    type:Number
  },
  // add homeworld field that links the species to it's native planet
  homeworld: [{ //one to one
    type: ObjectId,
    ref: "Planet"
  }]
});

module.exports = mongoose.model('Species', Species);
