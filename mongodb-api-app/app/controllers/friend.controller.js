const Friend = require("../models/friend.model");

// Send a friend request to a user
exports.sendFriendRequest = async (req, res) => {
  Friend.findOne({ user_from: req.params.fromId }).then((response) => {
    if (
      response != null &&
      response.user_from == req.params.fromId &&
      response.user_to == req.params.toId
    ) {
      res.status(404).send("Friend request already sent");
    } else {
      let friendRequest = {
        user_from: req.params.fromId,
        user_to: req.params.toId,
        is_accepted: false,
      };
      Friend.create(friendRequest).then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while adding Friend Request data.",
        });
      });
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Friend request data.",
    });
  });
};

// Get friend requests
exports.getFriendRequests = async (req, res) => {
    Friend.find({ user_to: req.params.toId }).then((response) => {
        let friendRequests = []
        for(let i = 0; i < response.length; i++){
            friendRequests.push(response[i].user_from);
        }
      console.log(friendRequests);
      res.json(friendRequests);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Friend request data.",
      });
    });
  };

// Update friend requests
exports.updateFriendRequest = async (req, res) => {
  let requestId = req.params.id;
  let is_accepted = req.body.is_accepted;
  await Friend.findByIdAndUpdate(requestId, { is_accepted: is_accepted }).then((response) => {
    console.log(response.is_accepted);

    res.json(response);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while updating Friend request data.",
    });
  });
};
