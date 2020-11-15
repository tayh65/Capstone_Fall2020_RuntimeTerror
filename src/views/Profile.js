import React from "react";
import "../css/App.scss";
import "../css/Profile.scss";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { api, API_URL } from "../config/api";
// import { Alert } from "reactstrap";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      _id: "",
      fname: "",
      lname: "",
      username: "",
      email: "",
      friends: [],
      friendRequests: [],
      view: "",
    };
    this.firstNameUpdated = this.firstNameUpdated.bind(this);
    this.lastNameUpdated = this.lastNameUpdated.bind(this);
    this.usernameUpdated = this.usernameUpdated.bind(this);
    this.passwordUpdated = this.passwordUpdated.bind(this);
    this.emailUpdated = this.emailUpdated.bind(this);
    this.showFriends = this.showFriends.bind(this);
    this.showFriendRequests = this.showFriendRequests.bind(this);
    this.acceptFriendRequest = this.acceptFriendRequest.bind(this);
    this.editAccount = this.editAccount.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("user"));
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || isLoggedIn == null) {
      this.props.history.push("/login");
    }

    if (user != null) {
      this.setState({
        _id: user.id,
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        friends: user.friends,
      });
      this.getFriendRequests(user._id);
    }

  }

  getFriendRequests(userId){
    let friendRequests = [];
    api
      .get(`${API_URL}/api/friend/${userId}`)
      .then((res) => {
        for(let i = 0; i < res.data.length; i++){
          api
          .get(`${API_URL}/api/users/${res.data[i]}`)
          .then((res) => {
            friendRequests.push(res.data);
            this.setState({ friendRequests: friendRequests });
          });
        }
      })
      .catch((err) => {
        if (err) {
          alert(err);
        }
      });
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

  friendsUpdated(event) {
    this.setState({ friends: event.target.value });
  }

  showFriends(event) {
    event.preventDefault();
    this.setState({ view: "friends" });
  }

  showFriendRequests(event) {
    event.preventDefault();
    this.setState({ view: "friendRequests" });
  }

  async editAccount(event) {
    if(event != null){
      event.preventDefault();
    }
    let payload = {
      fname: this.state.fname,
      lname: this.state.lname,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      friends: this.state.friends,
    };
    const user = JSON.parse(localStorage.getItem("user"));
    let id = user._id;
    api
      .put(`${API_URL}/api/users/edit/${id}`, payload)
      .then((res) => {
        if (res.data) {
          alert("Account updated!");
          this.props.setUser(res.data);
          this.setState({ _id: res.data._id });
          this.setState({ view: "" });
        } else {
          alert("Oops, make sure the information you entered is correct!");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  }

   acceptFriendRequest(friends){
    let friendArray = [];
    friendArray.push(friends);
    for(let i = 0; i < this.state.friends.length; i++){
      friendArray.push(this.state.friends[i]);
    }
    this.setState({ friends: friendArray });
    this.editAccount();
  }

  confirmDelete(event) {
    event.preventDefault();
    this.setState({ view: "delete" });
  }

  async deleteAccount(event) {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    let id = user._id;
    api
      .delete(`${API_URL}/api/users/remove/${id}`)
      .then(() => {
        alert("Account Deleted");
        this.props.clickLogout();
        this.props.history.push("/login");
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  }

  render() {
    let display = this.state.view;
    let View;
    let title;
    if (display === "edit") {
      View = (
        <form onSubmit={this.editAccount}>
          <label className="profile__formLabel" htmlFor="firstname">
            First Name
          </label>
          <input
            id="fname"
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
          <button type="submit" className="profile__profileButton">
            <h2 className="profile__buttonLabel">Save</h2>
          </button>
        </form>
      );
    } else if (display === "delete") {
      View = (
        <div className="profile__sectionButtons">
          <h2 className="profile__sectionTitle"> Are you sure you want to delete your account?</h2>
          <button
            className="profile__confirmButton yes"
            onClick={this.deleteAccount}
          >
            Yes
          </button>
          <button
            className="profile__confirmButton no"
            onClick={() => this.setState({ view: "" })}
          >
            No
          </button>
        </div>
      );
    } else if (display === "friends") {
      View = (
        <div className="profile__sectionTitle">
          Friend List:
          <h3 className="profile__subSetionLabel">Username:</h3>
          <pre className="profile__subSetionLabel">Name:</pre>
        </div>
      );
    }
    else if (display === "friendRequests") {
      title = (
        <div className="profile__sectionTitle">
          Friend Requests:
          </div>
      );
      View = [];
      for (let i = 0; i < this.state.friendRequests.length; i++) {
        View.push(
          <div className="profile__resultsCard" key={i}>
            <i className="profile__resultsIcon material-icons">person</i>
            <p className="profile__resultsName">
              {this.state.friendRequests[i].fname} {this.state.friendRequests[i].lname}
            </p>
            <p className="profile__resultsContent">
              Username: {this.state.friendRequests[i].username}
              <br></br>
              Email: {this.state.friendRequests[i].email}
              <br></br>
            </p>
              <button className="profile__acceptButton" onClick={() => this.acceptFriendRequest(this.state.friendRequests[i]._id)}>Accept</button>
              <button className="profile__declineButton" onClick={() => this.acceptFriendRequest}>Decline</button>
          </div>
        );
      }
    } else {
      View = (
        <div>
          <pre className="profile__subSetionLabel">
            First Name: {this.state.fname}
          </pre>
          <pre className="profile__subSetionLabel">
            Last Name: {this.state.lname}
          </pre>
          <pre className="profile__subSetionLabel">
            User Name: {this.state.username}
          </pre>
          <pre className="profile__subSetionLabel">
            Email Address: {this.state.email}
          </pre>
        </div>
      );
    }
    return (
      <div className="profile">
        <h1 className="profile__pageTitle">Profile</h1>
        <div className="profile__section">
          <div className="profile__subSection">
            <h2
              className="profile__subSectionTitle"
              onClick={() => this.setState({ view: "" })}
            >
              My Account
            </h2>
            <i className="profile__profileIcon material-icons">profile</i>
            <a className="profile__link" href="/profile">
              <h3
                className="profile__subSectionContent"
                onClick={this.showFriends}
              >
                Friends
              </h3>
            </a>
            <a className="profile__link" href="/profile">
              <h3
                className="profile__subSectionContent"
                onClick={this.showFriendRequests}
              >
                Friend Requests
              </h3>
            </a>
            <a className="profile__link" href="/profile">
              <h3
                className="profile__subSectionContent"
                onClick={(event) => {
                  event.preventDefault();
                  this.setState({ view: "edit" });
                }}
              >
                Edit Account
              </h3>
            </a>
            <a className="profile__link" href="/profile">
              <h3
                className="profile__subSectionContent"
                onClick={this.confirmDelete}
              >
                Delete Account
              </h3>
            </a>
          </div>
          <div className="profile__subSection profileInfo">{title}{View}</div>
        </div>
      </div>
    );
  }
}
export default withRouter(Profile);
