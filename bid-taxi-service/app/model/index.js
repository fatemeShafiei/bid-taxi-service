const config = require('config');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.get('db');
db.client = require("./client.model.js")(mongoose);
db.fleet = require("./fleet.model.js")(mongoose);
db.ride = require("./ride.model.js")(mongoose);
db.bid = require("./bid.model.js")(mongoose);

module.exports = db;
