const db = require("../model");
const Client = db.client;
const ObjectId = require('mongoose').Types.ObjectId;
const {isEmpty} = require('../shared/commonMethods');


exports.create = (req, res) => {

  // #swagger.tags = ['Clients']

  if (!req.body.name || !req.body.email || !req.body.phone) {
    res.status(400).send({ message: "Please ensure that the name, email, and phone fields are not left empty." });
    return;
  }


  const client = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });


  client.save()
    .then(data => {
      res.status(201).send({"id": data.id});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the client."
      });
    });
};


exports.findAll = (req, res) => {

   // #swagger.tags = ['Clients']

  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Client.find(condition)  
  .populate("rides", "-_id -__v")
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clients."
      });
    });
};


exports.findById = (req, res) => {

   // #swagger.tags = ['Clients']

  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "The client with the given ID was not found."
    });
  }
  Client.findById(id)
  .populate("rides", "-__v")
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found client with id: " + id });
      else res.send(data);
    })
    .catch(err => {
      console.log(err)
      res
        .status(500)
        .send({ message: "Error retrieving client with id=" + id });
    });
};


exports.update = (req, res) => {

   // #swagger.tags = ['Clients']

  if (isEmpty(req.body)) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "The client with the given ID was not found."
    });
  }
  Client.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update client with id: ${id}. Client was not found!`
        });
      } else res.send({ message: "Client was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating client with id: " + id
      });
    });
};


exports.delete = (req, res) => {

   // #swagger.tags = ['Clients']

  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      message: "The client with the given ID was not found."
    });
  }

  Client.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete client with id: ${id}. Client was not found!`
        });
      } else {
        res.send({
          message: "Client was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete client with id: " + id
      });
    });
};
