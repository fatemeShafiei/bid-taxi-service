const db = require("../model");
const Ride = db.ride;
const Bid = db.bid;

exports.create = async (req, res) => {

  // #swagger.tags = ['Bids']

  try {

    if (!req.body.bidAmount) {
      res.status(400).send({ message: "Please ensure that the bidAmount is not left empty." });
      return;
    }

    const fleetId = req.query.fleetId;
    const rideId = req.query.rideId;

    let ride = await Ride.findById(rideId);

    if (!ride) {
      res.status(404).send({ message: "Not found ride with id: " + rideId });
      return;
    }

    if (ride.state === 'closed') {
      res.status(400).send({ message: `The bidding process for this ride has ended. Clients are no longer able to accept bids for this ${rideId} ride.` });
      return;
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

    const numbers = [1, 2];


    const rideId = req.query.rideId;
    const bidId = req.query.bidId;

    let ride = await Ride.findById(rideId);

    if (!ride) {
      res.status(404).send({ message: "Not found ride with id: " + rideId });
      return;
    }

    if (ride.state === 'closed') {
      res.status(400).send({ message: `The bid for this ride has already been approved. You are no longer able to approve bids for this ${rideId} ride.` });
      return;
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


