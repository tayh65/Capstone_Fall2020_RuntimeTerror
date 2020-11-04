import React from "react";
import Messages from "../components/Messages";
import ChatInput from "../components/ChatInput";
import "../css/App.scss";
import "../css/Chat.scss";
import { withRouter } from "react-router-dom";

class Chat extends React.Component {

  componentDidMount() {
    this.setUpSocket();
  }

  constructor(props) {
    super();
    this.state = {
      channels: props.location.channels,
      channel: props.location.channel,
      socket: props.location.socket,
      username: props.username,
      messages: []
    };
    this.sendHandler = this.sendHandler.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);
  }

  // functions/requests to be sent to the server go here
  setUpSocket = () => {
    const socket = this.state.socket;

    // Listen for messages from the server
    socket.on("server:message", (message) => {
      let channels = this.state.channels
      channels.forEach(c => {
        if (c.id === message.channel_id) {
          // if the current chat channel id matches the channel id of
          // the message being read, add it the message array for display
          if (this.state.channel.id === message.channel_id) {
            this.addMessage(message.messageObject);
          }
        }
      });
      this.setState({ channels });
    });
  }

  messageSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  sendHandler(channel_id, message) {
    const socket = this.state.socket;
    const messageObject = {
      username: this.props.username,
      message,
    };

    // Emit the message to the server
    socket.emit("client:message", { messageObject, channel_id });

    messageObject.fromMe = true;
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    const { data } = this.props.location
    return (
      <div className="chat">
        <h1 className="chat__pageTitle">Welcome to Chat!</h1>
        {/* <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} /> */}
        <div className="chat__sectionContainer">
          <div className="chat__formSection">
            <Messages messages={this.state.messages} />
          </div>
        </div>
        <ChatInput onSend={this.sendHandler} channel={this.state.channel} />
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
