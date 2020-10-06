import React from "react";
import "./css/App.css";

function Home() {
  return (
    <div className="login">
      <div className="login__section">
        <h1 className="login__pageTitle">Login</h1>
        <div className="login__form">
          <i class="login__icon material-icons">person</i>
          <input
            className="login__input"
            type="text"
            placeholder="Username"
          ></input>
          <i class="login__icon material-icons">lock</i>
          <input
            className="login__input"
            type="text"
            placeholder="Password"
          ></input>
          <div className="login__loginButton">Sign In</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
