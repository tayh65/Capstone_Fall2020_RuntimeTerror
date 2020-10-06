import React from "react";
import "./css/App.css";
import "./css/Login.css";
import { logo } from "./assets/images";

function Login() {
  return (
    <div className="login">
      <div className="login__section">
        <h1 className="login__pageTitle">Login</h1>
        <img className="login__logo" src={logo} alt="logo"></img>
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

export default Login;
