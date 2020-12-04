import React from "react";
import "../css/App.scss";
import "../css/Search.scss";
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { api, API_URL } from "../config/api";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      submittedSearch: false,
      loggedInUser: 0,
      friends: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.createChat = this.createChat.bind(this);
  }
  componentDidMount() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));
    if (isLoggedIn === "false" || isLoggedIn == null) {
      this.props.history.push("/login");
    }

    if (user != null) {
      this.setState({ loggedInUser: user._id });
      this.setState({ friends: user.friends });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    let searchTerm = document.getElementById("searchInput").value;
    api
      .get(`${API_URL}/api/users/search/${searchTerm}`)
      .then((res) => {
        let resultArray = [];
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i]._id !== this.state.loggedInUser) {
            let obj = {
              friend: {},
              friendIcon: "add",
            };
            obj.friend = res.data[i];
            this.state.friends.find((f) => {
              if (f === res.data[i]._id) {
                obj.friendIcon = "Friends";
              }
            });
            resultArray.push(obj);
          }
        }
        this.setState({ results: resultArray });
        this.setState({ submittedSearch: true });
      })
      .catch((err) => {
        if (err) {
          alert(err);
        }
      });
  }

  addFriend(id) {
    let to = id;
    let from = this.state.loggedInUser;
    api
      .post(`${API_URL}/api/friend/to/${to}/from/${from}`)
      .then((res) => {
        if (res.data.error != null) {
          alert(res.data.error);
        } else {
          alert("Friend Request sent!");
        }
      })
      .catch((err) => {
        if (err) {
          alert(err);
        }
      });
  }

  createChat(event) {
    const thisUser = JSON.parse(localStorage.getItem("user")).username;
    var resultsCard = event.target.parentNode.id;
    var selectedUser = document
      .getElementById(resultsCard)
      .getAttribute("username");
    var roomName = thisUser + "-" + selectedUser;

    let payload = {
      owner: thisUser,
      roomName: roomName,
      private: true,
      participants: 0,
      id: Date.now(),
      privateUsers: [thisUser, selectedUser],
      sockets: [],
    };

    api.post(`${API_URL}/api/rooms/add`, payload).catch((err) => {
      console.error(err);
      alert(err);
    });
    alert(`${payload.roomName} Created!`);
    this.props.history.push(`/chat/${payload.id}`);
  }

  render() {
    let results = [];
    let resultsTitle;
    for (let i = 0; i < this.state.results.length; i++) {
      let friendStatus;
      if (this.state.results[i].friendIcon === "Friends") {
        friendStatus = (
          <div>
            <button className="search__viewProfileButton">View Profile</button>
          </div>
        );
      } else {
        friendStatus = (
          <i
            className="search__addIcon material-icons"
            onClick={() => this.addFriend(this.state.results[i].friend._id)}
          >
            add
          </i>
        );
      }
      results.push(
        <div
          className="search__resultsCard"
          key={i}
          id={"userCard" + i}
          username={this.state.results[i].username}
        >
          <i className="search__resultsIcon material-icons">person</i>
          <p className="search__resultsName">
            {this.state.results[i].friend.fname}{" "}
            {this.state.results[i].friend.lname}
          </p>
          <p className="search__resultsContent">
            Username: {this.state.results[i].friend.username}
            <br></br>
            Email: {this.state.results[i].friend.email}
            <br></br>
          </p>
          {friendStatus}
          <i
              className="search__chatIcon material-icons"
              onClick={this.createChat}
            >
              chat
            </i>
        </div>
      );
    }

    if (this.state.submittedSearch) {
      resultsTitle = (
        <h2 className="search__resultsTitle">Results({results.length}):</h2>
      );
    } else {
      resultsTitle = "";
    }

    return (
      <div className="search">
        <h1 className="search__pageTitle">Search</h1>
        <div className="search__searchBar">
          <form action="/search" onSubmit={this.handleSubmit}>
            <input
              id="searchInput"
              className="search__input"
              type="text"
              placeholder="Search for people by username or email"
              name="search"
            ></input>
            <button className="search__button" type="submit">
              <i className="search__icon material-icons">search</i>
            </button>
          </form>
        </div>
        <div className="search__results">
          {resultsTitle}
          {results}
        </div>
      </div>
    );
  }
}
export default withRouter(Search);
