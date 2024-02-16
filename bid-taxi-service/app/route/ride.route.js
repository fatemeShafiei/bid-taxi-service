module.exports = app => {
  const ride = require("../controller/ride.controller.js");

  var router = require("express").Router();

  router.get("/api/rides", ride.findAll);

  router.post("/api/clients/:id/rides", ride.create);

  app.use("/", router);

};
