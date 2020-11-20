const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const mongoose = require("mongoose");
const passport = require('passport');
const socketIo = require("socket.io");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:4000"
// };

//app.use(cors(corsOptions));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// Initialize passport authentication
app.use(passport.initialize());
require('./passport')(passport);

// parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// link to db
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://root:runTimeT3rror@cluster0.ibhzj.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("MongoDb connected.");
}).catch(error => console.log(error));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "MongoDB API" });
});

// route to get the current list of channels
app.get("/getChannels", (req, res) => {
  res.json({
    channels: STATIC_CHANNELS
  })
});

// routes
require("./app/routes/user.routes")(app);
require("./app/routes/room.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//create socket on server for receiving messages/requests
const io = socketIo(server);

// array to keep track of users online
var usersOnServer = [];

//create connection between clients and server and handle events
io.on("connection", (socket) => {
  console.log("New client connected");
  usersOnServer.push(socket);

  // notify client of successful connection
  socket.emit("connected-to-server", null);

  // adds client to a chatroom they specify by id
  socket.on("channel-join", obj => {
    let id = obj.id;
    let channels = obj.channels;
    console.log("user joined channel id", obj.id);

    channels.forEach(c => {
      // adds user if the id they used matches the list of rooms on the server
      if (c.id === id) {
        if (c.sockets.indexOf(socket.id) == (-1)) {
          c.sockets.push(socket.id);
          c.participants++;
          io.emit("channel", c);
        }
      }

      // removes user if the id they used doesn't match any rooms on the server
      else {
        let index = c.sockets.indexOf(socket.id);
        if (index != (-1)) {
          c.sockets.splice(index, 1);
          c.participants--;
          io.emit("channel", c);
        }
      }
    });

    return id;
  });

  //get message from 1 client and send to other clients
  socket.on('client:message', message => {
    console.log(message);
    io.emit('server:message', message);
  });

  // a client disconnected
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    // if user was in a chatroom, notify clients to them from the room they were in
      let index = usersOnServer.indexOf(socket);
      if (index != (-1)) {
        io.emit("user-disconnected", socket.id);
      }
  });

});
