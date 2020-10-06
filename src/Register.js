import React from "react";
import "./css/App.css";
import "./css/Register.css";
import { logo3 } from "./assets/images";

function Register() {
  return (
    <div className="register">
      <div className="register__section">
        <h1 className="register__pageTitle">Register</h1>
        <img className="register__logo" src={logo3} alt="logo"></img>
        <div className="register__form">
          <label className="register__formLabel" for="firstname">
            First Name
          </label>
          <input
            className="register__input"
            type="text"
            placeholder="First Name"
            required
          ></input>
          <label className="register__formLabel" for="lastname">
            Last Name
          </label>
          <input
            className="register__input"
            type="text"
            placeholder="Last Name"
            required
          ></input>
          <label className="register__formLabel" for="username">
            Username
          </label>
          <input
            className="register__input"
            type="text"
            placeholder="Username"
            required
          ></input>
          <label className="register__formLabel" for="password">
            Password
          </label>
          <input
            className="register__input"
            type="text"
            placeholder="Password"
            required
          ></input>
          <label className="register__formLabel" for="email">
            Email
          </label>
          <input
            className="register__input"
            type="text"
            placeholder="Email"
            required
          ></input>
          <div className="register__registerButton">Sign Up</div>
        </div>
      </div>
    </div>
  );
}

export default Register;
