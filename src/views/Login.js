import React from "react";
import "../css/App.scss";
import "../css/Login.scss";
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
    api
      .post(`${API_URL}/api/users/login`, payload)
      .then((res) => {
        if (res) {
          alert("Login Successful!");
          this.props.setUser(res.data);
            this.props.history.push("/home");
        }
      })
      .catch((err) => {
        if(err){
          alert(err);
        }
      });
  }

  render() {
    return (
      <div className="login">
        <div className="login__sectionContainer">
          <div className="login__section">
            <div className="login__subSection">
              <h2 className="login__subSectionTitle">Login</h2>
              <img
                className="login__logo"
                src={coffeeMug_logo}
                alt="logo"
              ></img>
              <form className="login__form" onSubmit={this.handleSubmit}>
                <i className="login__icon material-icons">person</i>
                <input
                  className="login__input"
                  type="text"
                  placeholder="Username"
                  onChange={this.usernameUpdated}
                  required
                ></input>
                <i className="login__icon material-icons">lock</i>
                <input
                  className="login__input"
                  type="text"
                  placeholder="Password"
                  onChange={this.passwordUpdated}
                  required
                ></input>
                <button type="submit" className="login__loginButton">
                  <p className="login__buttonLabel">Sign In</p>
                </button>
                <a href="/register">Not a Member?</a>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
