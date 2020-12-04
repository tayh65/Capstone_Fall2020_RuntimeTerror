import React from "react";
import "../css/App.scss";

class FriendList extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: [],
    };
  }

  componentDidMount() {
    this.setState({ friends: this.props.friends });
  }
  
  render() {
    let friends = this.state.friends;
    let FriendDisplay = [];
    if (friends != null) {
      for (let i = 0; i < friends.length; i++) {
        FriendDisplay.push(
          <div className="profile__resultsCard"  key={i}>
            <i className="profile__resultsIcon material-icons">person</i>
            <p className="profile__resultsName">
              {friends[i].fname} {friends[i].lname}
            </p>
            <p className="profile__resultsContent">
              Username: {friends[i].username}
              <br></br>
              Email: {friends[i].email}
              <br></br>
            </p>
          </div>
        );
      }
    }
    return <div>{FriendDisplay}</div>;
  }
}
export default FriendList;
