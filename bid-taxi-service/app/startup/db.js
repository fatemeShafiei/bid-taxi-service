const config = require('config');
const db = require("../../app/model");
const dbURL = config.get('db');


module.exports = function () {
    db.mongoose.set('strictQuery', true);
    db.mongoose
        .connect(dbURL)
        .then(() => {
            console.log("Connected to the database!");
        })
        .catch(err => {
            console.log("Cannot connect to the database!", err);
            process.exit();
        });

}