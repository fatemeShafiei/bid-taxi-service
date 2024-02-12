const db = require("../model");
const Fleet = db.fleet;


exports.create = (req, res) => {

   // #swagger.tags = ['Fleets']

  if (!req.body.name || !req.body.email || !req.body.phone) {
    res.status(400).send({ message: "Please ensure that the name, email, and phone fields are not left empty." });
    return;
  }


  const fleet = new Fleet({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });


  fleet.save(fleet)
    .then(data => {
      res.status(201).send({"id": data.id});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the fleet."
      });
    });
};


exports.findAll = (req, res) => {

   // #swagger.tags = ['Fleets']

  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Fleet.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fleets."
      });
    });
};


exports.findById = (req, res) => {

   // #swagger.tags = ['Fleets']

  const id = req.params.id;

  Fleet.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found fleet with id: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving fleet with id=" + id });
    });
};


exports.update = (req, res) => {

   // #swagger.tags = ['Fleets']

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Fleet.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update fleet with id: ${id}. Fleet was not found!`
        });
      } else res.send({ message: "Fleet was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating fleet with id: " + id
      });
    });
};


exports.delete = (req, res) => {

   // #swagger.tags = ['Fleets']

  const id = req.params.id;

  Fleet.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete fleet with id: ${id}. Fleet was not found!`
        });
      } else {
        res.send({
          message: "CliFleetent was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete fleet with id: " + id
      });
    });
};
