const db = require("../model");
const Client = db.client;
const Ride = db.ride;

exports.create = (req, res) => {

    // #swagger.tags = ['Rides']
    // #swagger.summary = 'Some summary...'
    // #swagger.description = 'Some description...'

  if (!req.body.pickupLocation || !req.body.dropoffLocation || !req.body.proposedPrice) {
    res.status(400).send({ message: "Please ensure that the pickupLocation, dropoffLocation and proposedPrice fields are not left empty." });
    return;
  }

  const clientId = req.query.clientId;

  const ride = new Ride({
    pickupLocation: req.body.pickupLocation,
    dropoffLocation: req.body.dropoffLocation,
    proposedPrice: req.body.proposedPrice,
    clientId: clientId
  });

  ride.save(ride)
    .then(data => {

      return Client.findByIdAndUpdate(clientId, {
        $push: {
          rides: {
            _id: data.id,
            pickupLocation: data.pickupLocation,
            dropoffLocation: data.dropoffLocation,
            proposedPrice: data.proposedPrice,
            clientId: clientId
          }
        }
      },
        { new: true, useFindAndModify: false })
    })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update client with id: ${id}. Client was not found!`
        });
      } else res.send(data);
    }).catch(err => {
      console.log("error: " + err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ride."
      });
    })

};


exports.findAll = (req, res) => {

   // #swagger.tags = ['Rides']

  Ride.find()
  .populate("bids", "-_id -__v")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log("error: " + err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rides."
      });
    });
};


