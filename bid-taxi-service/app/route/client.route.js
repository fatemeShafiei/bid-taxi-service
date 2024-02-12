module.exports = app => {
  const client = require("../controller/client.controller.js");

  var router = require("express").Router();

  router.get("/api/clients", client.findAll);

  router.get("/api/clients/:id", client.findById);

  router.post("/api/clients", client.create);

  router.put("/api/clients/:id", client.update);

  router.delete("/api/clients/:id", client.delete);

  app.use("/", router);

};
