import React from "react";
import "../css/App.scss";
import "../css/Register.css";
import { coffeeBag_logo } from "../assets/images";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

let API_URL = "http://localhost:4000";

const api = axios.create({
  baseURL: API_URL,
});


class Register extends Component {
  constructor() {
    super();
    this.state = {
      fname: "",
      lname: "",
      username: "",
      password: "",
      email: "",
    };
    this.firstNameUpdated = this.firstNameUpdated.bind(this);
    this.lastNameUpdated = this.lastNameUpdated.bind(this);
    this.usernameUpdated = this.usernameUpdated.bind(this);
    this.passwordUpdated = this.passwordUpdated.bind(this);
    this.emailUpdated = this.emailUpdated.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  firstNameUpdated(event) {
    this.setState({ fname: event.target.value });
  }

  lastNameUpdated(event) {
    this.setState({ lname: event.target.value });
  }

  usernameUpdated(event) {
    this.setState({ username: event.target.value });
  }

  passwordUpdated(event) {
    this.setState({ password: event.target.value });
  }

  emailUpdated(event) {
    this.setState({ email: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let payload = this.state;

    api
      .post(`${API_URL}/api/users/add`, payload)
      .then((res) => {
        if(res.data){
          this.props.history.push("/success");
        }
        else{
          alert("Oops, make sure the information you entered is correct!");
        }
      })
      .catch((err) => {
        console.error(err);
        console.log(err);
        alert(err);
      });

  }

  render() {
    return (
      <div className="register">
        <div className="register__section">
          <h1 className="register__pageTitle">Register</h1>
          <img className="register__logo" src={coffeeBag_logo} alt="logo"></img>
          <form>
            <label className="register__formLabel" htmlFor="firstname">
              First Name
            </label>
            <input
              className="register__input"
              type="text"
              placeholder="First Name"
              required
              onChange={this.firstNameUpdated}
            ></input>
            <label className="register__formLabel" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="register__input"
              type="text"
              placeholder="Last Name"
              required
              onChange={this.lastNameUpdated}
            ></input>
            <label className="register__formLabel" htmlFor="username">
              Username
            </label>
            <input
              className="register__input"
              type="text"
              placeholder="Username"
              required
              onChange={this.usernameUpdated}
            ></input>
            <label className="register__formLabel" htmlFor="password">
              Password
            </label>
            <input
              className="register__input"
              type="text"
              placeholder="Password"
              required
              onChange={this.passwordUpdated}
            ></input>
            <label className="register__formLabel" htmlFor="email">
              Email 
            </label>
            <input
              className="register__input"
              type="text"
              placeholder="Email"
              required
              onChange={this.emailUpdated}
            ></input>
            <div
              className="register__registerButton"
              onClick={this.handleSubmit}
            >
              <h2 className="register__buttonLabel">Sign Up</h2>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Register);
