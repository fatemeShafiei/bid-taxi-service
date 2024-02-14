const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./app/startup/db')();
require('./app/startup/swagger')(app);
require('./app/startup/routes')(app);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


module.exports = server;