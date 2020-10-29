import React from "react";
import io from "socket.io-client";
import { API_URL } from "../config/api";
import Messages from "../components/Messages";
import ChatInput from "../components/ChatInput";
import "../css/App.scss";
import "../css/Chat.scss";
import { withRouter } from "react-router-dom";

// setup connection to the server
const socket = io(API_URL);

class Chat extends React.Component {
  constructor(props) {
    super();
    this.state = { username: props.username, messages: [] };
    this.sendHandler = this.sendHandler.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);

    // Connect to the server --> still not sure how to make this happen
    // this.socket = io(api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    socket.on("server:message", (message) => {
      this.addMessage(message);
    });
  }

  messageSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message,
    };

    // Emit the message to the server
    socket.emit("client:message", messageObject);

    messageObject.fromMe = true;
    //this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div className="chat">
        <h1 className="chat__pageTitle">Welcome to Chat!</h1>
        <div className="chat__sectionContainer">
          <div className="chat__formSection">
            <Messages messages={this.state.messages} />
          </div>
        </div>
        <ChatInput onSend={this.sendHandler} />
        <div className="chat__submitButton">
          <p className="chat__buttonLabel" onClick={this.messageSubmit}>
            Submit
          </p>
        </div>
      </div>
    );
  }
}
export default withRouter(Chat);
