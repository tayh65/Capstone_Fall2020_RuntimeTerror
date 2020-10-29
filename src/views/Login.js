import React from "react";
import "../css/App.scss";
import "../css/Login.css";
import { coffeeMug_logo } from "../assets/images";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { api, API_URL } from "../config/api";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
    this.usernameUpdated = this.usernameUpdated.bind(this);
    this.passwordUpdated = this.passwordUpdated.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  usernameUpdated(event) {
    this.setState({ username: event.target.value });
  }

  passwordUpdated(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let payload = this.state;
    console.log(payload)

    api
      .post(`${API_URL}/api/users/login`, payload)
      .then((res) => {
        console.log(res);
        if(res){
          alert("Login Successful!");
        }
        this.props.history.push("/home");
      })
      .catch((err) => {
        alert("Wrong Credentials, please try again", err);
      });
  }

  render() {
    return (
      <div className="login">
        <div className="login__section">
          <h1 className="login__pageTitle">Login</h1>
          <img className="login__logo" src={coffeeMug_logo} alt="logo"></img>
          <div className="login__form">
            <i className="login__icon material-icons">person</i>
            <input
              className="login__input"
              type="text"
              placeholder="Username"
              onChange={this.usernameUpdated}
            ></input>
            <i className="login__icon material-icons">lock</i>
            <input
              className="login__input"
              type="text"
              placeholder="Password"
              onChange={this.passwordUpdated}
            ></input>
            <div className="login__loginButton" onClick={this.handleSubmit}>
             <p className="login__buttonLabel">Sign In</p>
            </div>
            <a href="/register">Not a Member?</a>
            <a href="/">Forgot Password?</a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
