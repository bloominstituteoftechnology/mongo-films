const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const options = {
	strict: false,
	timestamp: true
};

const Vehicle = new mongoose.Schema(
	{
		vehicle_class: String,
		pilot_keys: [Number],
		key: { type: Number, unique: true },
		// add pilots field to link it to the Character model
		pilots: [
			{
				type: ObjectId,
				ref: "Character"
			}
		]
	},
	options
);

module.exports = mongoose.model("Vehicle", Vehicle);
