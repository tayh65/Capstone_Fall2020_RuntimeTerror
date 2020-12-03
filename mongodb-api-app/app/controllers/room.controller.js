const Room = require("../models/room.model");

// Create and Save a new Room
exports.create = async (req, res) => {

    const room = {
        owner: req.body.owner,
        roomName: req.body.roomName,
        private: req.body.private,
        participants: 0,
        id: req.body.id,
        privateUsers: req.body.privateUsers,
        sockets: [],
    };

    Room.create(room)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Room.",
            });
        });
};

// Retrieve all Rooms from the database.
exports.findAll = async (req, res) => {
    await Room.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while getting all the chat rooms.",
            });
        });
};

// Retrieve all public Rooms and private Rooms the user is in from the database.
exports.findAllPrivate = async (req, res) => {
    var user = req.params.user;
    var userChannelsQuery = {$or:[ {privateUsers:user}, {private: "false"}]};
    await Room.find(userChannelsQuery)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while getting all the chat rooms.",
            });
        });
};

// Find a single Room with an id
exports.findOne = async (req, res) => {
    await Room.findById(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Room data.",
            });
        });
};

// Delete a single Room by id
exports.delete = async(req, res) => {
    var query = {id:req.params.id}

    await Room.deleteOne(query)
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Room data.",
        });
    });
}