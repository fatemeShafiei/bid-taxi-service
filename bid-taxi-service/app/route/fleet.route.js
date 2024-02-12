module.exports = app => {
  const fleet = require("../controller/fleet.controller.js");

  var router = require("express").Router();

  router.get("/api/fleets", fleet.findAll);

  router.get("/api/fleets/:id", fleet.findById);

  router.post("/api/fleets", fleet.create);

  router.put("/api/fleets/:id", fleet.update);

  router.delete("/api/fleets/:id", fleet.delete);

   app.use("/", router);
};
