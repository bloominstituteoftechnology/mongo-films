const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Resume = new mongoose.Schema({
  planet: {
    type: ObjectId,
    ref: "Planet",
    required: true
  },
  name: {
    item: { type: ObjectId, ref: this.planet },
    display: { type: Boolean, default: false }
  },

  // planets: [
  //   {
  //     id: Number,
  //     item: {
  //       type: ObjectId,
  //       ref: "Planet"
  //     },
  //     display: Boolean
  //     // value: { type: Boolean, default: false },
  //     // display: {
  //     //   type: Boolean,
  //     //   default: false
  //     // }
  //   }
  // ],
  created: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", Resume);
