const FriendRequest = require("../models/friendRequest.model");
const User = require("../models/user.model");

// Send a friend request to a user
exports.sendFriendRequest = async (req, res) => {
  FriendRequest.findOne({ user_from: req.params.fromId })
    .then((response) => {
      if (
        response != null &&
        response.user_from == req.params.fromId &&
        response.user_to == req.params.toId
      ) {
        res.json({error: "Friend request already sent"});
      } else {
        let friendRequest = {
          user_from: req.params.fromId,
          user_to: req.params.toId,
          is_accepted: null,
        };
        FriendRequest.create(friendRequest)
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while adding Friend Request data.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Friend request data.",
      });
    });
};

// Get friend requests by user id
exports.getFriendRequests = async (req, res) => {
  FriendRequest.find({ user_to: req.params.toId })
    .then((response) => {
      let friendRequests = [];
      for (let i = 0; i < response.length; i++) {
        let payload = {
          _id: response[i]._id,
          user_from: response[i].user_from,
        };
        friendRequests.push(payload);
      }
      res.json(friendRequests);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Friend request data.",
      });
    });
};

// Get friend request by object id
exports.getFriendRequestData = async (req, res) => {
  FriendRequest.findById(req.params.id)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Friend request data.",
      });
    });
};

// Update friend requests
exports.updateFriendRequest = async (req, res) => {
  let requestId = req.params.id;
  let is_accepted = req.body.is_accepted;
  if (is_accepted) {
    //find request, update friends to and from, delete request
    await FriendRequest.findById(requestId)
      .then((response) => {
        if (response != null) {
          User.findById(response.user_from)
            .then((res) => {
              if (res != null) {
                let friends = [];
                friends = res.friends;
                friends.push(response.user_to);
                User.findByIdAndUpdate(response.user_from, {
                  friends: friends,
                }).catch((err) => {
                  res.status(500).json(err);
                });
              }
            })
            .catch((err) => {
              res.status(500).json(err);
            });

          User.findById(response.user_to)
            .then((res) => {
              if (res != null) {
                let friends = [];
                friends = res.friends;
                friends.push(response.user_from);
                User.findByIdAndUpdate(response.user_to, {
                  friends: friends,
                }).catch((err) => {
                  res.status(500).json(err);
                });
              }
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      })
      .then(() => {
        FriendRequest.deleteOne({ _id: requestId })
          .then(() => {
            res.json("Friend Request accepted");
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while updating Friend request data.",
        });
      });
  }
};
// Delete a User with the specified id in the request
exports.denyFriendRequest = (req, res) => {
  FriendRequest.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json("Friend Request denied");
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
