const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4000"
};

app.use(cors(corsOptions));

// parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// link to db
const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Database synced.");
    db.sequelize.authenticate()
      .then( () => {
        console.log("Database connected.");
      })
      .catch( (error) => {
        console.log("Error: " +error.message);
      });
  })
  .catch((error) => {
    console.log("Error: " + error.message)
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "MySql API" });
});

// user routes
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});