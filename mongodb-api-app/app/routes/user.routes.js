module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/add", users.create);

    // Login a user
    router.post("/login", users.login);

    // Retrieve all users
    router.get("/", users.findAll);
  
    // Retrieve a single user with id
    router.get("/:id", users.findOne);
  
    // Update a user with id
    router.put("/edit/:id", users.update);
  
    // Delete a user with id
    router.delete("/remove/:id", users.delete);
  
    app.use('/api/users', router);
  };