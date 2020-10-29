import React from "react";
import "../css/App.scss";
import "../css/Profile.scss";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { api, API_URL } from "../config/api";

class Profile extends Component {
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
        if (res.data) {
          this.props.history.push("/success");
        } else {
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
      <div className="profile">
        <h1 className="profile__pageTitle">Profile</h1>
        <div className="profile__section">
          <div className="profile__subSection">
            <h2 className="profile__subSectionTitle">My Account</h2>
            <i className="profile__searchIcon material-icons">search</i>
            <a  classname="profile__link" href="/profile/edit">
              <h3 className="profile__subSectionContent">Friends</h3>
            </a>
            <a classname="profile__link" href="/profile/edit">
              <h3 className="profile__subSectionContent">Edit Account</h3>
            </a>
            <a classname="profile__link" href="/profile/delete">
              <h3 className="profile__subSectionContent">Delete Account</h3>
            </a>
          </div>
          <div className="profile__subSection profileInfo">
          <form>
            <label className="profile__formLabel" htmlFor="firstname">
              First Name
            </label>
            <input
              className="profile__input"
              type="text"
              placeholder="First Name"
              required
              onChange={this.firstNameUpdated}
            ></input>
            <label className="profile__formLabel" htmlFor="lastname">
              Last Name
            </label>
            <input
              className="profile__input"
              type="text"
              placeholder="Last Name"
              required
              onChange={this.lastNameUpdated}
            ></input>
            <label className="profile__formLabel" htmlFor="username">
              Username
            </label>
            <input
              className="profile__input"
              type="text"
              placeholder="Username"
              required
              onChange={this.usernameUpdated}
            ></input>
            <label className="profile__formLabel" htmlFor="password">
              Password
            </label>
            <input
              className="profile__input"
              type="text"
              placeholder="Password"
              required
              onChange={this.passwordUpdated}
            ></input>
            <label className="profile__formLabel" htmlFor="email">
              Email 
            </label>
            <input
              className="profile__input"
              type="text"
              placeholder="Email"
              required
              onChange={this.emailUpdated}
            ></input>
            <div
              className="profile__profileButton"
              onClick={this.handleSubmit}
            >
              <h2 className="profile__buttonLabel">Save</h2>
            </div>
          </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Profile);
