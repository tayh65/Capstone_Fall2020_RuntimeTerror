import React from "react";
import io from "socket.io-client";
import { api, API_URL } from "../config/api";
import Messages from "../components/Messages";
import ChatInput from "../components/ChatInput";
import "../css/App.scss";
import "../css/Chat.scss";
import { withRouter } from "react-router-dom";

var socket;
var channel;
var channels;

class Chat extends React.Component {

  componentDidMount() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "false" || isLoggedIn == null) {
      this.props.history.push("/login");
    }

    //user loads from "Chatrooms" page
    if (this.props.match.params.id === undefined) {
      this.setUpSocket();
    }

    //user loads from "Search" page
    else {
      const user = JSON.parse(localStorage.getItem("user"));
      socket = io(API_URL);
      this.setChatRoom();
      this.setState({
        channels: channels,
        channel: channel,
        socket: socket,
        username: user.username,
        messages: []
      })

    }
  }

  constructor(props) {
    super();
    this.state = {
      channels: props.location.channels,
      channel: props.location.channel,
      socket: props.location.socket,
      username: props.location.username,
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
  }

  sendHandler(channel_id, message) {
    const socket = this.state.socket;
    const messageObject = {
      username: this.state.username,
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

  //get list of all the channels
  loadChannels = async () => {
    await api
      .get(`${API_URL}/api/rooms/`)
      .then((res) => {
        channels = res.data;
      })
  }

  /*
   * this is used for when a user loads a chat room using
   * a chat room id as a param (such as when starting a chat from "Search" page)
   * instead of loading from the "Chatrooms" page
   */
  setChatRoom = async () => {
    const id = this.props.match.params.id;
    await this.loadChannels();
    channel = channels.find(c => {
      if (parseInt(c.id, 10) === parseInt(id, 10)) {
        return c;
      }
      return null;
    });

    // if param is invalid, go to the "Chatrooms" page
    if(channel === null || channel === undefined){
      this.props.history.push("/chatrooms");
    }

    this.setState({ channels: channels });
    this.setState({ channel: channel });
    this.setState({ socket: socket })
    this.setUpSocket();
  }

  render() {
    //const { data } = this.props.location
    return (
      <div className="chat">
        <h1 className="chat__pageTitle">Welcome to Chat!</h1>
        {/* <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} /> */}
        <div className="chat__sectionContainer">
          <div className="chat__formSection">
            =            <Messages messages={this.state.messages} />
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
