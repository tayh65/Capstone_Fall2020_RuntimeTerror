import React from 'react';
import './css/App.css';
import Home from './Home'
import Login from './Login'
import Register from './Register'
import NavBar from './components/NavBar.component'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <Home/>
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
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
