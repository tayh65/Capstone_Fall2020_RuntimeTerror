import React from 'react';
import Friend from './Friend';
import "../css/App.scss";
// import "../css/FriendList.scss";
// import { withRouter } from "react-router-dom";

class FriendList extends React.Component {

    constructor(props) {
        super();
        // console.log(this.props);
        this.state = {friends: []};//{ friends: this.props.friendList };
        console.log('FriendList Constructor', this.state.friends);
    }

    render() {
        // Loop through all the friends in props and add to view
        const friends = this.props.friendList.map((friend, i) => {
            return (
                <Friend
                    key={i}
                    username={friend.username}
                    fname={friend.fname}
                    lname={friend.lname}
                    email={friend.email} />
            );
        });
        return (
            <div className='friends' id='friendList'>
                { friends }
            </div>
        );
    }
}

export default FriendList;//withRouter(FriendList);
