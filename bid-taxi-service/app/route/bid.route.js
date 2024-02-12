module.exports = app => {
  const bid = require("../controller/bid.controller.js");

  var router = require("express").Router();

  router.post("/api/bids", bid.create);

  router.post("/api/bids/approve", bid.approve);

   app.use("/", router);

};
