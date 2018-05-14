const mongoose = require("mongoose");

module.exports = {
	connectTo: function(database = "sandbox", host = "localhost") {
		console.log(host, database);
		return mongoose.connect(`mongodb://${host}/${database}`);
	}
};
