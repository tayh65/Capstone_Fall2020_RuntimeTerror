const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// link to db
const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "MySql API" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});