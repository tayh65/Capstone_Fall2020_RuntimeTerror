import React from "react";
import "./css/App.css";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import SuccessPage from "./views/SuccessPage";
import NavBar from "./components/NavBar.component";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
