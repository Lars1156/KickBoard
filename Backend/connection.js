const mongoose = require('mongoose');

async function connection (uri){
    mongoose.connect(uri);
}

module.exports = connection;