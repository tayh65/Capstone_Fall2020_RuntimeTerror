const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content [NAME] can not be empty!"
        });
        return;
    }

    if (!req.body.username) {
        res.status(400).send({
            message: "Content [USERNAME] can not be empty!"
        });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({
            message: "Content [PASSWORD] can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

};

// Find a single User with an id
exports.findOne = (req, res) => {

};

// Update a User by the id in the request
exports.update = (req, res) => {

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};