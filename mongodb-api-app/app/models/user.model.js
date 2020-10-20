const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  fname: {
    required: true,
    trim: true,
    type: String
  },
  lname: {
    required: true,
    trim: true,
    type: String
  },
  username: {
    required: true,
    trim: true,
    type: String
  },
  password: {
    required: true,
    trim: true,
    type: String
  },
  email: {
    required: true,
    trim: true,
    type: String
  }
});

const User = model("User", UserSchema);

module.exports = User;