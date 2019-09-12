const express = require('express');
const contactRoutes = express.Router();

// Require Contact model in our routes module
let Contact = require('../models/contact');

// Defined store route
function getAllUsers(req, res){
    Contact.find(function(err, contacts){ 
        if(err){
          console.log(err);
        }
        return res.status(200).send({
          ok: "true",
          message: "users retrieved successfully",
          result: contacts,
        }); 
      });
}

function editUser(req, res){
    let id = req.params.id;
    Contact.findById(id, function (err, contact){
        res.json(contact)
    });
}

function createUser(req, res){
  if (!req.body.firstName || !req.body.lastName) {
    return res.status(400).send({
      ok: "false",
      error: [
        {
          field: "firstName and lastName",
          message: "firstName and lastName are mandatory"
        }
      ]
    });
  } else if (req.body.firstName === " " || req.body.lastName === " ") {
    return res.status(400).send({
      ok: "false",
      error: [
        {
          field: "firstName and lastName",
          message: "Must be a non-empty string"
        }
      ]
    });
  } else if (!req.body.age || (isNaN(req.body.age) || req.body.age < 0)) {
    return res.status(400).send({
      ok: "false",
      error: [
        {
          field: "age",
          message: "Must be a positive number or zero"
        }
      ]
    });
  } else {
    let contact = new Contact(req.body);
  contact.save()
    .then(contact => {
      return res.status(201).send({
        ok: "true",
        message: "user added successfully",
        result: contact
      });
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
  }
}

function updateUser(req, res){
  Contact.findById(req.params.id, function(_err, contact) {
    if (!contact){
      return res.status(204).send({
        ok: "false",
        message: "user not found"
      });
    } else {
      if (!req.body.firstName) {
        return res.status(400).send({
          ok: "false",
          message: "firstName is required"
        });
      } else if (!req.body.lastName) {
        return res.status(400).send({
          ok: "false",
          message: "lastName is required"
        });
      } else if (!req.body.age || (isNaN(req.body.age) || req.body.age < 0)) {
        return res.status(400).send({
          ok: "false",
          message: "age must be a positive number or zero"
        });
      }

        contact.firstName = req.body.firstName;
        contact.lastName = req.body.lastName;
        contact.age = req.body.age;

      contact.save().then(contact => {
        return res.status(200).send({
          ok: "true",
          message: "user added successfully",
          result: contact
        });
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
}

function deleteUser(req, res){
  Contact.findByIdAndRemove({_id: req.params.id}, function(err, contact){
    console.log(contact === undefined);
    if (!contact || (contact === undefined)){
      return res.status(204).send({
        ok: "false",
        message: "user not found"
      });
    } else {
      return res.status(200).send({
        ok: "true",
        message: "user deleted successfuly"
      });  
    }
  });
}

module.exports = {getAllUsers, createUser, editUser, updateUser, deleteUser};