const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
  owner:{
    required: true,
    trim: true,
    type: String,
  },
  roomName: {
    required: true,
    trim: true,
    type: String,
  },
  private: {
    required: true,
    type: Boolean,
  },
  participants: {
    type: Number,
  },
  id: {
    required: true,
    type: Number,
    unique: true,
  },
  privateUsers:[{type:String}],
  sockets: [{type:String}],
});

const Room = model("Room", RoomSchema);

module.exports = Room;