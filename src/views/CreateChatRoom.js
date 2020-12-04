import React from "react";
import "../css/App.scss";
import { coffeeBag_logo } from "../assets/images";
import "../css/CreateChatRoom.scss"
import "../css/Search.scss"
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { api, API_URL } from "../config/api";

class CreateChatRoom extends Component {

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || isLoggedIn == null) {
      this.props.history.push("/login");
    }
  }

  constructor() {
    const user = JSON.parse(localStorage.getItem("user"));
    super();
    this.state = {
      owner: user.username,
      roomName: "",
      private: false,
      participants: 0,
      id: 0,
      privateUsers: [],
      sockets: [],
      results: [],
    };

    this.searchResults = [];
    this.submittedSearch = true;

    this.setRoomName = this.setRoomName.bind(this);
    this.setIsPrivate = this.setIsPrivate.bind(this);
    this.searchUsers = this.searchUsers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addToPrivateRoom = this.addToPrivateRoom.bind(this);
  }


  setRoomName(event) {
    this.setState({ roomName: event.target.value });
  }

  setIsPrivate(event) {
    this.setState({ private: event.target.value });
  }

  async searchUsers(event) {
    event.preventDefault();
    let searchTerm = document.getElementById("searchInput").value;
    api
      .get(`${API_URL}/api/users/search/${searchTerm}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ results: res.data });
      })
      .catch((err) => {
        if (err) {
          alert(err);
        }
      });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.state.id = Date.now();

    //add room creator to list of private users
    if (this.state.private === "true") {
      this.state.privateUsers.push(this.state.owner);
      console.log(this.state.privateUsers);
    }

    let payload = this.state;

    api
      .post(`${API_URL}/api/rooms/add`, payload)
      .catch((err) => {
        console.error(err);
        alert(err);
      });
    alert(`${payload.roomName} Created!`)
    this.props.history.push('/chatrooms');
  }

  addToPrivateRoom(event) {
    var resultsCard = event.target.parentNode.id;
    var username = document.getElementById(resultsCard).getAttribute('username');

    //select user for invite
    if ((document.getElementById(resultsCard).className === 'search__resultsCard')) {
      document.getElementById(resultsCard).className = "createChat_userToogled"
      this.state.privateUsers.push(username);
    }

    // deselect user
    else {
      document.getElementById(resultsCard).className = 'search__resultsCard';
      let index = this.state.privateUsers.indexOf(username);
      if (index !== (-1)) {
        this.state.privateUsers.splice(index, 1);
      }
    }
  }

  render() {
    let results = [];
    let resultsTitle;
    var i;
    for (i = 0; i < this.state.results.length; ++i) {

      // dont add this user to list of invites
      if (this.state.results[i].username === this.state.owner) {
        continue;
      }

      results.push(
        <div className="search__resultsCard" key={i} id={"userCard" + i} username={this.state.results[i].username}>
          <i className="search__resultsIcon material-icons">person</i>
          <p className="search__resultsName">
            {this.state.results[i].fname} {this.state.results[i].lname}
          </p>
          <p className="search__resultsContent">
            Username: {this.state.results[i].username}
            <br></br>
            Email: {this.state.results[i].email}
            <br></br>
          </p>
          <i className="search__addIcon material-icons" onClick={this.addToPrivateRoom}>add</i>
        </div>
      );
    }

    if (this.submittedSearch) {
      resultsTitle = (
        <h2 className="search__resultsTitle">Results({results.length}):</h2>
      );
    } else {
      resultsTitle = "";
    }

    return (
      <div>
        <div className="createChatRoom">
          <div className="createChatRoom_container">
            <div className="createChatRoom_section">
              <div className="createChatRoom_subSection">
                <h2 className="createChatRoom_subSectionTitle">Create New Chat Room</h2>
                <img
                  className="register__logo"
                  src={coffeeBag_logo}
                  alt="logo"
                ></img>
                <form>
                  <label className="createChatRoom_formLabel" htmlFor="roomname">
                    Room Name
                </label>
                  <input
                    className="createChatRoom_input"
                    type="text"
                    placeholder="Room Name"
                    required
                    onChange={this.setRoomName}
                  ></input>

                  <div>

                    <label className="createChatRoom_formLabel" htmlFor="privateButton">
                      Public or Private:
                   </label>

                    <input
                      className="createChatRoom_radioButton"
                      name="radioButton"
                      type="radio"
                      value="true"
                      onChange={this.setIsPrivate}
                    />
                    <label className="createChatRoom_radioButtonLabel">
                      Private
                  </label>

                    <input
                      className="createChatRoom_radioButton"
                      name="radioButton"
                      type="radio"
                      value="false"
                      checked= {!this.state.private || this.state.private === "false"}
                      onChange={this.setIsPrivate}
                    />
                    <label className="createChatRoom_radioButtonLabel">
                      Public
                    </label>
                  </div>

                </form>
                <div>
                  <form action="/search" onSubmit={this.searchUsers}>
                    <label className="createChatRoom_formLabel">
                      Invite
                </label>
                    <input
                      id="searchInput"
                      className="createChatRoom_search"
                      type="text"
                      placeholder="Search for users by username or email"
                      disabled={this.state.private === "false"}
                    ></input>
                    <button className="search__button" type="submit">
                      <i className="search__icon material-icons">search</i>
                    </button>
                  </form>
                </div>
                <div
                  className="createChatRoom_Button"
                  onClick={this.handleSubmit}
                >
                  <h2 className="createChatRoom_buttonLabel">Create Room</h2>
                </div>

              </div>
            </div>
          </div>
          <div className="search__results">
            {resultsTitle}
            {results}
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(CreateChatRoom);
