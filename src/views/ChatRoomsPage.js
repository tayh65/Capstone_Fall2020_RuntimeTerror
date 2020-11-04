import React from "react";
import io from "socket.io-client";
import { API_URL } from "../config/api";
import ChannelList from './ChannelList';
import "../css/App.scss";
import "../css/ChatRooms.scss";
import { Link, withRouter } from "react-router-dom";

const socket = io(API_URL);


class ChatRoomsPage extends React.Component {
    componentDidMount() {
        this.loadChannels();
        this.setUpSocket();
    }

    state = {
        channels: null,
        socket: null,
        channel: null,
        channelConnected: false
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
    }

    //get list of channels
    loadChannels = async () => {
        fetch("http://localhost:4000/getChannels").then(async response => {
            let data = await response.json();
            this.setState({ channels: data.channels });
            console.log(this.state.channels);
        })
    }

    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        });
        this.setState({ channel });
        this.state.channelConnected = true;
        // console.log(channel);
        socket.emit("channel-join", id, ack => {
        });
    }

    render() {
        if (this.state.channelConnected) {
            return (
                <div className="chatrooms">
                    <Link to={{
                        pathname: "/chat",
                        channel: this.state.channel
                    }}>
                        <button className="join_button" type="button">
                            Join {this.state.channel.name}
                        </button>
                    </Link>
                    <div className="chat_list">
                        <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
                    </div>
                </div>

            );
        }
        else {
            return (
                <div className="chatrooms">
                    <div className="chat_list">
                        <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
                    </div>
                </div>

            );
        }
    }
}

export default withRouter(ChatRoomsPage);