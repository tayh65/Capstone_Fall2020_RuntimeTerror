import React from 'react';
import logo from './logo.svg';
import './css/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Login'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <Switch>
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
