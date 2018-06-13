const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const TestSchema = new mongoose.Schema({
  // write schema here
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 10
  },
  age: {
      type:Number,
      required:true
  },
  _id: {
    type: ObjectId,
    unique: true,
  },
  created_at:{
    type: Date,
    default: Date.now()
  },
  active: {
      type: Boolean
  },
  address: AddressSchema,
  
  friends: {
      friend: [{
          type: ObjectId,
          ref: SomeModel
      }]
  }

});

const AddressSchema = new mongoose.Schema({
    street: {
        type: String,
    },
    zip: {
        type: String,
    },
    building: {
        type: String
    }
})



