import React from 'react';
import { Channel } from '../components/Channel';
import "../css/ChannelList.scss"
import { withRouter } from "react-router-dom";

class ChannelList extends React.Component {
    handleClick = id => {
        this.props.onSelectChannel(id);
    }

    render() {

        let list = <div className="no-content-message">No rooms to show</div>;
        if (this.props.channels && this.props.channels.map) {
            list = this.props.channels.map(c => <Channel key={c.id} id={c.id} name={c.roomName} participants={c.participants} onClick={this.handleClick} />);
        }
        return (
            <div className='channel-list'>
                {list}
            </div>);
    }
}

export default withRouter(ChannelList);
