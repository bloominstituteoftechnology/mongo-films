const mongoose = require('mongoose');

module.exports = {
    connectTo: function (database = 'starwars', host = 'germancin:secure123@167.99.10.46') {
        return mongoose.connect(`mongodb://${host}/${database}`)
                .then(conn => console.log(`Connected to MongoDB - Server:167.99.10.46 DB:${database}`))
                .catch(err => console.log('error :::: ' + err));
    },
};


