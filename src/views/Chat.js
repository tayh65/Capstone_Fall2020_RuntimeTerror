import React from "react";
import io from "socket.io-client";
import { API_URL } from "../config/api";
import Messages from "../components/Messages";
import ChatInput from "../components/ChatInput";
import ChannelList from './ChannelList';
import "../css/App.scss";
import "../css/Chat.scss";
import "../css/ChannelList.scss"
import { withRouter } from "react-router-dom";

// setup connection to the server
const socket = io(API_URL);

class Chat extends React.Component {
  componentDidMount() {
    this.loadChannels();
    this.setUpSocket();
  }

  constructor(props) {
    super();
    this.state = {
      channels: null,
      channel: null,
      username: props.username,
      messages: []
    };
    this.sendHandler = this.sendHandler.bind(this);
    this.messageSubmit = this.messageSubmit.bind(this);
  }

  setUpSocket = () => {
    //connect to a user selected chatroom
    socket.on("connected-to-server", () => {
      if (this.state.channel) {
        this.handleChannelSelect(this.state.channel.id);
      }
    });

    // connect user to new chatroom
    socket.on("channel", channel => {
      let channels = this.state.channels;
      channels.forEach(c => {
        if (c.id === channel.id) {
          c.participants = channel.participants;
        }
      });
      this.setState({ channels });
    });

    // Listen for messages from the server
    socket.on("server:message", (message) => {
      let channels = this.state.channels
      //console.log(this.state.channel.id);
      channels.forEach(c => {
        if (c.id === message.channel_id) {
          if(this.state.channel.id == message.channel_id){
            this.addMessage(message.messageObject);
          }
        }
      });
      this.setState({ channels });
    });
  }

  //get list of channels
  loadChannels = async () => {
    fetch('http://localhost:4000/getChannels').then(async response => {
      let data = await response.json();
      this.setState({ channels: data.channels });
      console.log(this.state.channels);
    })
  }

  messageSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  sendHandler(channel_id, message) {
    const messageObject = {
      username: this.props.username,
      message,
    };

    // Emit the message to the server
    socket.emit("client:message", { messageObject, channel_id });

    messageObject.fromMe = true;
    //this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  handleChannelSelect = id => {
    let channel = this.state.channels.find(c => {
      return c.id === id;
    });
    this.setState({ channel });
    socket.emit("channel-join", id, ack => {
    });
  }

  render() {
    return (
      <div className="chat">
        <h1 className="chat__pageTitle">Welcome to Chat!</h1>
        <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
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
