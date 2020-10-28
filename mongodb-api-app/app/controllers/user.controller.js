const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
let {
  validateRegisterInput,
  validateLoginInput,
} = require("../../validateInput");
const { useReducer } = require("react");

// Create and Save a new User
exports.create = async (req, res) => {

  // Validate request
  validateRegisterInput(res, req.body);

  // Search for an existing user in the database
  // If found send error message, if not found hash password and create new user
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(404).send("User already exists");
      } else {
        const user = {
          fname: req.body.fname,
          lname: req.body.lname,
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
        };

        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                user.password = hash;
                User.create(user)
                  .then((data) => {
                    res.json(data);
                  })
                  .catch((err) => {
                    res.status(500).send({
                      message:
                        err.message ||
                        "Some error occurred while creating the User.",
                    });
                  });
              }
            });
          }
        });
      }
    });
};

// Login a user
exports.login = async (req, res) => {

  // Validate request
  validateLoginInput(res, req.body);

  // Search for an existing user in the database
  // If not found send error message
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      res.status(404).json("User not found");
    }
    bcrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          fname: user.fname,
          lname: user.lname,
          username: user.username,
          password: user.password,
          email: user.email
        };
        jwt.sign(
          payload,
          "secret",
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) console.error("There is some error in token", err);
            else {
              res.json({
                success: true,
                token: `${token}`,
              });
            }
          }
        );
      } else {
        res.status(400).json("Incorrect Password");
      }
    });
  });
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
  await User.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while getting all Users.",
      });
    });
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  await User.findOne(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User data.",
      });
    });
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  await User.findById(req.params.id)
    .then(user => {
      let newUser = {_id: req.params.id};
      if (req.body.fname) newUser.fname = req.body.fname;
      if (req.body.lname) newUser.lname = req.body.lname;
      if (req.body.email) {
        User.findOne({ email: req.body.email })
          .then((data) => {
            if (data) {
              res.status(400).json("Invalid User email.");
            }
          });
        newUser.email = req.body.email;
      }
      if (req.body.password) {
        let newPassword = bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("There was an error", err);
          else {
            return bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) console.error("There was an error", err);
              else {
                return hash;
              }
            });
          }
        });
        if(newPassword) newUser.password = newPassword;
        else newUser.password = req.body.password;
      };
      if(req.body.username) {
        User.findOne( {username: req.body.username}, (err, data) => {
          if(err) res.status(500).json(err);
          if(data) res.status(400).json("Username already exists.");
        } );
        newUser.username = req.body.username;
      }
      console.log(newUser);
      User.updateOne(user, newUser)
        .then(newUserData => {
          res.status(200).json(newUserData);
        })
        .catch(err => {
          res.status(500).json(err);
        });
  })
  .catch(err => {
    res.status(500).json("Could not find specified user.");
  });
}

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(data => {
      res.json({
        deleteUser: true,
        data: data
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
};
