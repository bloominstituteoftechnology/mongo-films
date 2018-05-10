const mongoose = require('mongoose');
// mongoose.set('debug', true);

module.exports = {
  connectTo: function(database = 'sandbox', host = 'localhost') {
    return mongoose.connect(`mongodb://${host}/${database}`);
  },
};
