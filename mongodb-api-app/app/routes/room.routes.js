module.exports = app => {
  const rooms = require("../controllers/room.controller.js");

  var router = require("express").Router();

  // Create a new room
  router.post("/add", rooms.create);

  // Retrieve all rooms
  router.get("/", rooms.findAll);

  // Retrieve all private rooms
  router.get("/private:user", rooms.findAllPrivate);

  // Retrieve all rooms the user is in and has a matching/similar search term
  router.get("/search:term/:user", rooms.findAllWithTerm);

  // Retrieve a single room with id
  router.get("/:id", rooms.findOne);

  // Delete a room with id
  router.delete("/remove:id", rooms.delete);

  app.use('/api/rooms', router);
};