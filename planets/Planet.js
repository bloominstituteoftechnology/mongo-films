const mongoose = require('mongoose');

const Planet = new mongoose.Schema({
  edited: { 
    type: Date,
    default: Date.now 
  },                
  climate: {
    type:String
  },
  surface_water: {
    type:String
  },
  name: { 
    type: String, 
    required: true, 
    index: true 
  },
  diameter: {
    type:String
  },
  rotation_period: {
    type: String
  },
  created: { 
    type: Date, 
    default: Date.now 
  },
  terrain: {
    type:String
  },
  gravity: {
    type:String
  },
  orbital_period: {
    type:String
  },
  key: { 
    type: Number, 
    unique: true 
  },
});

module.exports = mongoose.model('Planet', Planet);
