const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};


app.use(cors(corsOptions));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));

const db = require("./app/model");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./app/doc/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    user: "admin",
    pass: "admin"
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


require("./app/route/client.route")(app);
require("./app/route/ride.route")(app);
require("./app/route/fleet.route")(app);
require("./app/route/bid.route")(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


module.exports = server;

