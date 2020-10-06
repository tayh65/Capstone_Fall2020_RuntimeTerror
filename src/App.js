import React from 'react';
import './css/App.css';
import Login from './Login'
import Register from './Register'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <Switch>
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
