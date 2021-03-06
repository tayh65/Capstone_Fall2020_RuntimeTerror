const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const passport = require("passport");
let {
  validateRegisterInput,
  validateLoginInput,
} = require("../../validateInput");
const { AiOutlineConsoleSql } = require("react-icons/ai");
// const { useReducer } = require("react");

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
          _id: user.id,
          fname: user.fname,
          lname: user.lname,
          username: user.username,
          password: user.password,
          email: user.email,
          friends: user.friends
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
              payload.token = token;
              res.json(payload);
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
  await User.findById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User data.",
      });
    });
};

// Find users which search term matches username or email
// Does adhere to partial matches
exports.searchUsers = async (req, res) => {
  let searchTerm = req.params.searchTerm.toString();
  let regex = new RegExp(searchTerm,'i');

  await User.find({ $and: [ { $or: [{username: regex },{email: regex}] }] } 
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User data.",
      });
    });
};

// update password independently for hashing
async function updatePassword(body, id) {
  let password = body.password;
  let userId = id;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error("There was an error", err);
    else {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) console.error("There was an error", err);
        else {
          password = hash;
          User.findByIdAndUpdate( userId,  
            {password: password}, () => { console.log("Updated user password") } )
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  })
}
// Update a User by the id in the request
exports.update = async (req, res) => {
  let newUserData = {_id: req.params.id};
  if (req.body.fname) newUserData.fname = req.body.fname;
  if (req.body.lname) newUserData.lname = req.body.lname;
  if (req.body.email) {
    User.findOne({ email: req.body.email })
      .then(data => {
        if (data != null && data._id != newUserData._id) {
          res.json({error: "There is a different user with that email already in the system."});
        }
      })
      .catch(err => {
        res.json({error:"Error validating email"});
      });
    newUserData.email = req.body.email;
  }
  if (req.body.password){
    updatePassword(req.body, newUserData._id);
  } 
    User.findOne( {username: req.body.username}, (err, data) => {
      if(err)  res.json({error:err});
      if(data != null && data._id != newUserData._id)  res.json({error:"Username already exists."});
    } );
    newUserData.username = req.body.username;
  if(req.body.friends) newUserData.friends = req.body.friends;

  // update user with newUserData
  await User.findByIdAndUpdate( newUserData._id,  
    newUserData)
    .then( updatedUser => {
      updatedUser.fname = newUserData.fname;
      updatedUser.lname = newUserData.lname;
      updatedUser.email = newUserData.email;
      updatedUser.username = newUserData.username;
      updatedUser.password = newUserData.password;
      updatedUser.friends = newUserData.friends;
       res.json(updatedUser);
    })
    .catch(err => {
      res.status(500).json(err);
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