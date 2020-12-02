const { Schema, model } = require("mongoose");

const FriendRequestSchema = new Schema({
  user_from: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  user_to: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  is_accepted: {
    type: Boolean,
    default: false
  }
});

const FriendRequest = model("FriendRequest", FriendRequestSchema);

module.exports = FriendRequest;