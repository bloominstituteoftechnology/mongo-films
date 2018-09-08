const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const Resume = new mongoose.Schema({
  film: {
    type: ObjectId,
    ref: "Film",
    required: true
  },
  title: {
    item: { type: ObjectId, ref: "Film" },
    display: { type: Boolean, default: false }
  },
  // characters: [{ type: ObjectId, ref: "Character" }],
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
