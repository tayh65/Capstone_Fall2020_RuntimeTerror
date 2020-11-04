import React from "react";
import "./css/App.scss";
import Home from "./views/Home";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Register from "./views/Register";
import SuccessPage from "./views/SuccessPage";
import ChatRoomsPage from "./views/ChatRoomsPage";
import Chat from "./views/Chat";
import NavBar from "./components/NavBar.component";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/success">
              <SuccessPage />
            </Route>
            <Route path= "/chat">
              <Chat/>
              {/* <ChatRoomsPage/> */}
            </Route>
          </Switch>
        </Router>
        <div className="App__divider"></div>

    </div>
  );
}

export default App;
