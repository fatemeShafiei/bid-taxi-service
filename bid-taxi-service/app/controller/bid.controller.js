const db = require("../model");
const Ride = db.ride;
const ObjectId = require('mongoose').Types.ObjectId;

exports.create = async (req, res) => {

  // #swagger.tags = ['Bids']

  try {

    if (!req.body.bidAmount) {
      return res.status(400).send({ message: "Please ensure that the bidAmount is not left empty." });
    }

    const fleetId = req.params.fleetId;
    const rideId =  req.params.rideId;

    let ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).send({ message: "Not found ride with id: " + rideId });
    }

    if (ride.state === 'closed') {
      return res.status(400).send({ message: `The bidding process for this ride has ended. Clients are no longer able to accept bids for this ${rideId} ride.` });
    }

    ride.bids.push({ bidAmount: req.body.bidAmount, fleetId: fleetId });
    ride = await ride.save();

    res.send(ride);

  } catch (err) {

    console.log("error: ", err);
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the ride."
    });
  }


};

exports.approve = async (req, res) => {

    // #swagger.tags = ['Bids']


  try {
    const rideId = req.params.rideId;
    const bidId = req.params.bidId;

    if (!ObjectId.isValid(rideId) || !ObjectId.isValid(bidId)) {
      return res.status(404).send({ message: "Not found ride with id: " + rideId });
    }
    let ride = await Ride.findById(rideId);

    if (!ride) {
      return res.status(404).send({ message: "Not found ride with id: " + rideId });
    }

    if (ride.state === 'closed') {
      return res.status(400).send({ message: `The bid for this ride has already been approved. You are no longer able to approve bids for this ${rideId} ride.` });
    }

    ride.bids.forEach(bid => bid.state = 'declined');

    const approvedBid = ride.bids.find(bid => bid._id.toString() == bidId);

    approvedBid.state = 'approved';

    ride.state = 'closed';

    ride = await ride.save();

    res.send(ride);

  } catch (err) {

    console.log("error: ", err);
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the ride."
    });
  }


};


