const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body.fname) {
        res.status(400).send({
            message: "Content [FIRST NAME] can not be empty!"
        });
        return;
    }

    if (!req.body.lname) {
        res.status(400).send({
            message: "Content [LAST NAME] can not be empty!"
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

    if (!req.body.email) {
        res.status(400).send({
            message: "Content [EMAIL] can not be empty!"
        });
        return;
    }

    // Create a User
    const user = {
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.json(data);
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
    User.findAll()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    User.findByPk(req.params.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Update a User by the id in the request
exports.update = (req, res) => {
    res.json("update user with id " + req.params.id);
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    res.json("delete user with id " + req.params.id);
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    res.json("delete all users.");
};
