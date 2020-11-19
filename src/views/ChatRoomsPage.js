import React from "react";
import io from "socket.io-client";
import { api, API_URL } from "../config/api";
import ChannelList from '../components/ChannelList';
import "../css/App.scss";
import "../css/ChatRooms.scss";
import { Link, withRouter } from "react-router-dom";

//connect to server
const socket = io(API_URL);

class ChatRoomsPage extends React.Component {
    componentDidMount() {
        this.loadChannels();
        this.setUpSocket();
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        if (isLoggedIn === "false" || isLoggedIn == null) {
            this.props.history.push("/login");
        }
    }

    state = {
        channels: null,
        socket: socket,
        channel: null,
        channelConnected: false
    }

    // functions/requests to be sent to the server go here
    setUpSocket = () => {
        // user successfully connected to chatroom through server
        socket.on("connected-to-server", () => {
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });

        // updates all of the channels after user connects to one
        socket.on("channel", channel => {
            let channels = this.state.channels;
            channels.forEach(c => {
                if (c.id === channel.id) {
                    c.participants = channel.participants;
                    c.sockets = channel.sockets;
                }
            });
            this.setState({ channels });
        });
    }

    //get list of channels
    loadChannels = async () => {
        api
        .get(`${API_URL}/api/rooms/`)
        .then((res) => {
          this.setState({ channels: res.data });
        })
        // fetch("http://localhost:4000/getChannels").then(async response => {
        //     let data = await response.json();
        //     this.setState({ channels: data.channels });
        //     // console.log(this.state.channels);
        // })
    }

    // updates the clients current chatroom based on the room they selected from the list
    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        });

        let channels = this.state.channels;

        this.setState({ channel });
        this.setState({ channelConnected: true });
        socket.emit("channel-join", {id, channels}, ack => {
        });
    }

    render() {
        // render page if user selected a chatroom
        // adds "Join" button after selection
        if (this.state.channelConnected) {
            return (
                <div className="chatrooms">
                    <Link role="button" className="join_button" to={{
                        pathname: "/chat",
                        channel: this.state.channel,
                        channels: this.state.channels,
                        socket: this.state.socket
                    }}>
                        Join {this.state.channel.name}
                    </Link>
                    <Link className="create_button" role="button" to={{ pathname: "/create_room" }}>
                        Create ChatRoom
                        </Link>
                    <div className="chat_list">
                        <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
                    </div>
                </div>

            );
        }

        // user did not select a chatroom yet
        else {
            return (
                <div className="chatrooms">
                    <Link className="create_button" role="button" to={{ pathname: "/create_room" }}>
                        Create ChatRoom
                        </Link>
                    <div className="chat_list">
                        <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
                    </div>
                </div>

            );
        }
    }
}

export default withRouter(ChatRoomsPage);