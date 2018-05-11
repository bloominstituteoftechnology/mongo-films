const mongoose = require('mongoose');

module.exports = {
  connectTo: function(database = 'MongoFilms', host = 'localhost') {
    return mongoose.connect(`mongodb://${host}/${database}`);
  },
};
