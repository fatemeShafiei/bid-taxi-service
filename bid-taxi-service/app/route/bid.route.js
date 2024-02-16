module.exports = app => {
  const bid = require("../controller/bid.controller.js");

  var router = require("express").Router();

  router.post("/api/fleets/:fleetId/rides/:rideId/bids", bid.create);

  router.put("/api/rides/:rideId/bids/:bidId/approve", bid.approve);

   app.use("/", router);

};
