module.exports = (app) => {
  const friends = require("../controllers/friendRequest.controller.js");

  var router = require("express").Router();

  // Get friend requests
  router.get("/:id", friends.getFriendRequestData);

  // Get friend requests
  router.get("/to/:toId", friends.getFriendRequests);

  // Send friend request
  router.post("/to/:toId/from/:fromId", friends.sendFriendRequest);

  // Update friend request
  router.put("/edit/:id", friends.updateFriendRequest);

  app.use("/api/friend", router);
};