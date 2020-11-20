const Room = require("../models/room.model");

// Create and Save a new Room
exports.create = async (req, res) => {

    const room = {
        owner: req.body.owner,
        roomName: req.body.roomName,
        private: req.body.private,
        participants: 0,
        id: req.body.id,
        privateUsers: [],
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

// Retrieve all Rooms from the database.
exports.findAllPrivate = async (req, res) => {
    console.log(req.params);
    await Room.find({"private":"true"})
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
