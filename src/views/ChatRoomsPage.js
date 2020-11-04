import React from "react";
import io from "socket.io-client";
import { API_URL } from "../config/api";
import ChannelList from './ChannelList';
import "../css/App.scss";
import "../css/Chat.scss";
import { withRouter } from "react-router-dom";

class ChatRoomsPage extends React.Component {
    state = {
        channels: null,
        socket: null,
        channel: null
    }

    render() {
        return (
            <div>
                <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
            </div>
        );
    }
}

export default withRouter(ChatRoomsPage);