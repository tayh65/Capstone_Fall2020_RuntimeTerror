module.exports = (app) => {
  const friendRequests = require("../controllers/friendRequest.controller.js");

  var router = require("express").Router();

  // Get friend requests
  router.get("/:id", friendRequests.getFriendRequestData);

  // Get friend requests
  router.get("/to/:toId", friendRequests.getFriendRequests);

  // Send friend request
  router.post("/to/:toId/from/:fromId", friendRequests.sendFriendRequest);

  // Update friend request
  router.put("/edit/:id", friendRequests.updateFriendRequest);

  // Deny friend request
  router.delete("/deny/:id", friendRequests.denyFriendRequest);

  app.use("/api/friend", router);
};
