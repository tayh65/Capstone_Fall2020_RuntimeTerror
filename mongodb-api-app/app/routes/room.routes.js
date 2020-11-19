module.exports = app => {
    const rooms = require("../controllers/room.controller.js");
  
    var router = require("express").Router();
  
    // Create a new room
    router.post("/add", rooms.create);


    // Retrieve all rooms
    router.get("/", rooms.findAll);
  
    // Retrieve a single room with id
    router.get("/:id", rooms.findOne);
  
    app.use('/api/rooms', router);
  };