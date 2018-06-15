const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Starship = new mongoose.Schema({
  pilot_keys: {                   
    type: [Number]
  },
  mglt: {
    type: String
  },
  starship_class: {
    type: String
  },
  hyperdrive_rating: {
    type: String
  },
  key: { 
    type: Number, 
    unique: true
  },
  // add pilots field to link the ship to the characters model
  pilots: [{
    type: ObjectId,
    ref: "Character"
  }]
});

module.exports = mongoose.model('Starship', Starship);
