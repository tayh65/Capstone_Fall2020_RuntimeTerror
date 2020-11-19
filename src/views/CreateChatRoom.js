import React from "react";
import "../css/App.scss";
import { coffeeBag_logo } from "../assets/images";
import "../css/CreateChatRoom.scss"
import { Component } from "react";
import { withRouter } from "react-router-dom";
import { api, API_URL } from "../config/api";

class CreateChatRoom extends Component {
  constructor() {
    super();
    this.state = {
      roomName: "",
      password: "",
      private: false,
      participants: 0,
      id: 0,
      sockets: [],
    };
  
      this.setRoomName = this.setRoomName.bind(this);
      this.setPassword = this.setPassword.bind(this);
      this.setIsPrivate = this.setIsPrivate.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
  
    setRoomName(event) {
      this.setState({ roomName: event.target.value });
    }

    setPassword(event) {
      this.setState({ password: event.target.value });
    }

    setIsPrivate(event){
      this.setState({private: event.target.value});
    }

    async handleSubmit(event) {
      event.preventDefault();
      this.state.id = Date.now();
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

  render() {
    return (
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
                onChange={this.setIsPrivate}
                />
                <label className="createChatRoom_radioButtonLabel">

                  Public
                </label>

                <label className="createChatRoom_formLabel" htmlFor="roomname">
                  Room Password
            </label>

                <input
                  className="createChatRoom_input"
                  type="text"
                  placeholder="Password"
                  required
                  disabled= {this.state.private === "false"}
                onChange={this.setPassword}
                ></input>


                <div
                  className="createChatRoom_Button"
                  onClick={this.handleSubmit}
                >
                  <h2 className="createChatRoom_buttonLabel">Create Room</h2>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(CreateChatRoom);
