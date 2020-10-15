const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

var corsOptions = {
  origin: "http://localhost:4000"
};

app.use(cors(corsOptions));

// parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// link to db
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://root:runTimeT3rror@cluster0.ibhzj.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
  console.log("MongoDb connected.");
}).catch(error => console.log(error));

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