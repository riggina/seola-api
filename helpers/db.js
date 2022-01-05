const mongoose = require("mongoose");

async function openDBConnection(uri) {
    return mongoose.connect(uri);
}

module.exports = openDBConnection;