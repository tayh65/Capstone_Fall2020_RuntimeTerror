const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
  roomName: {
    required: true,
    trim: true,
    type: String
  },
  password: {
    trim: true,
    type: String
  },
  private: {
    required: true,
    type: Boolean,
  },
  participants: {
    type: Number
  },
  id: {
    required: true,
    type: Number,
    unique: true
  },
  sockets: [{type:String}]
});

const Room = model("Room", RoomSchema);

module.exports = Room;