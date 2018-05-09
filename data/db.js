const mongoose = require('mongoose')

module.exports = {
  connectTo: function(database = 'sandbox', host = 'localhost') {
    return mongoose.connect(
      `${process.env.MONGO_URI ? '' : 'mongodb://'}${host}/${database}`
    )
  }
}
