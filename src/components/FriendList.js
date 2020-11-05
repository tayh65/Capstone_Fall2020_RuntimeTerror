import React from 'react';
import Friend from './Friend';
import "../css/App.scss";
// import "../css/FriendList.scss";
import { withRouter } from "react-router-dom";

class FriendList extends React.Component {

    constructor(props) {
        super();
        this.state = { friends: [] }
        console.log('FriendList Constructor',this.state.friends)
    }

    render() {
        // Loop through all the friends in the state and add to view
        const friends = this.props.friends.map((friend, i) => {
            return (
                <Friend
                    key={i}
                    username={friend.username}
                    fname={friend.fname}
                    lname={friend.lname} />
            );
        });
        return (
            <div className='friends' id='friendList'>
                { friends }
            </div>
        );
    }
}

export default withRouter(FriendList);